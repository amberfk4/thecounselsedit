import { createHash } from "node:crypto";
import { createWriteStream } from "node:fs";
import { cp, mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const projectId = "60obaykz";
const dataset = "production";
const apiVersion = "2025-08-15";
const widths = [640, 1080, 1600, 2400];
const batchSize = 5;

const rootDir = path.resolve(import.meta.dirname, "..");
const mediaDir = path.join(rootDir, ".sanity-media");
const exportedMediaDir = path.join(rootDir, "out", "media");
const contentFile = path.join(rootDir, "content", "sanity-content.json");
const mode = process.argv.includes("--remote") ? "remote" : process.argv.includes("--copy") ? "copy" : "local";

const assetFields = `{ _id, url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }`;
const photoFields = `{ credit, alt, "crop": image.crop, "hotspot": image.hotspot, "asset": image.asset->${assetFields} }`;

const query = `{
  "settings": *[_id == "siteSettings"][0]{ email, instagram, copyright, description },
  "home": *[_id == "homePage"][0]{
    headline,
    intro,
    contactLabel,
    "heroPhoto": heroPhoto${photoFields},
    aboutStatement,
    aboutText,
    clientsHeading,
    "clients": clients[defined(logo.asset)]{ name, width, "crop": logo.crop, "asset": logo.asset->${assetFields} },
    workHeading,
    "work": work[defined(image.asset)]${photoFields},
    servicesHeading,
    servicesIntro,
    services,
    "servicesPhoto": servicesPhoto${photoFields}
  }
}`;

async function fetchContent() {
  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", query);
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status} ${await response.text()}`);
  const { result } = await response.json();
  if (!result.settings) throw new Error("Site settings are missing in Sanity. Publish them in the studio.");
  if (!result.home) throw new Error("The home page is missing in Sanity. Publish it in the studio.");
  if (!result.home.heroPhoto?.asset) throw new Error("The home page main photo is missing in Sanity.");
  if (!result.home.servicesPhoto?.asset) throw new Error("The services photo is missing in Sanity.");
  return result;
}

function cropRect(asset, crop) {
  if (!crop) return null;
  const left = Math.round(asset.width * (crop.left ?? 0));
  const top = Math.round(asset.height * (crop.top ?? 0));
  const width = Math.round(asset.width * (1 - (crop.left ?? 0) - (crop.right ?? 0)));
  const height = Math.round(asset.height * (1 - (crop.top ?? 0) - (crop.bottom ?? 0)));
  if (left === 0 && top === 0 && width === asset.width && height === asset.height) return null;
  return { left, top, width, height };
}

function cropSuffix(rect) {
  if (!rect) return "";
  const signature = `${rect.left},${rect.top},${rect.width},${rect.height}`;
  return `-${createHash("sha1").update(signature).digest("hex").slice(0, 8)}`;
}

function sourceUrl(asset, rect) {
  return rect ? `${asset.url}?rect=${rect.left},${rect.top},${rect.width},${rect.height}` : asset.url;
}

function sizedUrl(source, width) {
  const separator = source.includes("?") ? "&" : "?";
  return `${source}${separator}w=${width}&fit=max&fm=webp&q=80`;
}

function hotspotPosition(hotspot, rect, asset) {
  if (!hotspot) return "50% 50%";
  const area = rect ?? { left: 0, top: 0, width: asset.width, height: asset.height };
  const x = (hotspot.x * asset.width - area.left) / area.width;
  const y = (hotspot.y * asset.height - area.top) / area.height;
  const percent = (value) => `${Math.round(Math.min(1, Math.max(0, value)) * 100)}%`;
  return `${percent(x)} ${percent(y)}`;
}

function automaticLogoWidth(width, height) {
  return Math.round(Math.min(235, Math.max(100, 67 * Math.sqrt(width / height))));
}

function toSiteContent({ settings, home }, isRemote) {
  const files = [];

  const image = (asset, crop) => {
    const rect = cropRect(asset, crop);
    const base = `${asset._id}${cropSuffix(rect)}`;
    const source = sourceUrl(asset, rect);
    widths.forEach((width) => files.push({ name: `${base}-${width}.webp`, url: sizedUrl(source, width) }));
    return {
      src: isRemote ? source : `/media/${base}.webp`,
      width: rect?.width ?? asset.width,
      height: rect?.height ?? asset.height,
      rect,
    };
  };

  const photo = (item) => {
    const { src, width, height, rect } = image(item.asset, item.crop);
    return {
      src,
      width,
      height,
      alt: item.alt?.trim() || item.credit?.trim() || "",
      credit: item.credit?.trim() ?? "",
      position: hotspotPosition(item.hotspot, rect, item.asset),
    };
  };

  const content = {
    settings: {
      email: settings.email,
      instagram: settings.instagram.replace(/^@/, ""),
      copyright: settings.copyright,
      description: settings.description,
    },
    home: {
      headline: [home.headline.first, home.headline.second, home.headline.third],
      intro: home.intro,
      contactLabel: home.contactLabel,
      heroPhoto: photo(home.heroPhoto),
      about: { statement: home.aboutStatement, text: home.aboutText ?? "" },
      clients: {
        heading: home.clientsHeading,
        logos: (home.clients ?? []).map((client) => {
          const { src, width, height } = image(client.asset, client.crop);
          return { name: client.name, src, width, height, displayWidth: client.width ?? automaticLogoWidth(width, height) };
        }),
      },
      work: { heading: home.workHeading, photos: (home.work ?? []).map(photo) },
      services: {
        heading: home.servicesHeading,
        intro: home.servicesIntro ?? "",
        items: home.services ?? [],
        photo: photo(home.servicesPhoto),
      },
    },
  };

  return { content, files };
}

async function exists(filePath) {
  return stat(filePath).then(() => true, () => false);
}

async function download({ name, url }) {
  const target = path.join(mediaDir, name);
  if (await exists(target)) return false;
  const response = await fetch(url, { headers: { Accept: "image/webp,*/*" } });
  if (!response.ok || !response.body) throw new Error(`Download failed (${response.status}): ${url}`);
  const partial = `${target}.part`;
  await pipeline(Readable.fromWeb(response.body), createWriteStream(partial));
  await rename(partial, target);
  return true;
}

async function downloadAll(files) {
  let downloaded = 0;
  for (let start = 0; start < files.length; start += batchSize) {
    const results = await Promise.all(files.slice(start, start + batchSize).map(download));
    downloaded += results.filter(Boolean).length;
  }
  return downloaded;
}

async function removeStale(keep) {
  const names = await readdir(mediaDir);
  const stale = names.filter((name) => !keep.has(name));
  await Promise.all(stale.map((name) => rm(path.join(mediaDir, name))));
  return stale.length;
}

async function writeContent(content) {
  await mkdir(path.dirname(contentFile), { recursive: true });
  await writeFile(contentFile, `${JSON.stringify(content, null, 2)}\n`);
}

function summary({ home }) {
  return `${home.work.photos.length} work photos, ${home.clients.logos.length} logos, ${home.services.items.length} services`;
}

async function syncRemote() {
  const { content } = toSiteContent(await fetchContent(), true);
  await writeContent(content);
  console.log(`Sanity sync (images from Sanity CDN): ${summary(content)}.`);
}

async function syncLocal() {
  const { content, files } = toSiteContent(await fetchContent(), false);
  await mkdir(mediaDir, { recursive: true });
  const downloaded = await downloadAll(files);
  const removed = await removeStale(new Set(files.map(({ name }) => name)));
  await writeContent(content);
  console.log(`Sanity sync: ${summary(content)}. Downloaded ${downloaded} new files, removed ${removed} unused.`);
}

async function copyMediaIntoExport() {
  await rm(exportedMediaDir, { recursive: true, force: true });
  await cp(mediaDir, exportedMediaDir, { recursive: true });
  console.log(`Copied ${(await readdir(exportedMediaDir)).length} media files into out/media.`);
}

const run = { remote: syncRemote, local: syncLocal, copy: copyMediaIntoExport };

await run[mode]();
