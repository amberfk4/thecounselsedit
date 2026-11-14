import type { MetadataRoute } from "next";
import { navigation, site } from "@/content/site";
import { work } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPaths = work.projects.map((project) => `/work/${project.slug}`);
  return ["/", ...navigation.map((item) => item.href), ...projectPaths].map((path) => ({
    url: new URL(path, site.url).toString(),
  }));
}
