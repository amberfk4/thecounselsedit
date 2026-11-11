import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "media/projects";
const outputRoot = "public/images/projects";
const widths = [640, 1080, 1600, 2400];

const photos = [
  ["lobby", "Rosewood - Kiosk Worldwide/19. TJS_SB_RosewoodHK_Dec-14-2025-1-copy.jpg"],
  ["table", "Hermès - Williamsburg Store Opening Event/5. DanielSalemi-Hermes-16297.jpg"],
  ["vessel", "JW Anderson - SS27 Lookbook/14. JWA.jpg"],
  ["show", "Stella McCartney - Paris Fashion Show W26/1. STUDIO-BOUM-STELLA-SHOW-86.JPG"],
  ["cafe", "Pandora - Paris Wonders Cafe/13. PANDORA EVENT-34.JPG"],
  ["chest", "JW Anderson - SS27 Lookbook/16. JWA.jpg"],
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
