import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "media/projects";
const outputRoot = "public/images/projects";
const widths = [640, 1080, 1600, 2400];

const photos = [
  ["arena", "Stella McCartney - Paris Fashion Show W26/2. STUDIO-BOUM-STELLA-CLEAN-SHOT-03-AI.jpg"],
  ["table", "Hermès - Williamsburg Store Opening Event/5. DanielSalemi-Hermes-16297.jpg"],
  ["trainers", "Satisfy x adidas/20. Satisfy Image 20 Screenshot 2026-11-07 100136.png"],
  ["bag", "Stella McCartney x Veuve Clicquot/22. IMG_3539.jpg"],
  ["shoes", "Damson Madders x Clarks/21. DM.jpg"],
  ["popup", "Rhode - New York Pop Up/8. seandavidson_rhode_3.jpg"],
];

await mkdir(outputRoot, { recursive: true });

for (const [slug, source] of photos) {
  const input = path.join(sourceRoot, source);
  await Promise.all(
    widths.map((width) =>
      sharp(input)
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 76, effort: 5 })
        .toFile(path.join(outputRoot, `${slug}-${width}.webp`)),
    ),
  );
  console.log(slug);
}
