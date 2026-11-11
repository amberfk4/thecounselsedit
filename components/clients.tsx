import Image from "next/image";
import { brands } from "@/content/site";

export function Clients() {
  return (
    <section id="clients">
      <h2 className="bg-navy p-gutter text-taupe">Some of the brands we support</h2>
      <ul className="flex flex-wrap justify-center gap-y-[clamp(2rem,4vw,4rem)] px-gutter py-panel">
        {brands.map((brand) => (
          <li
            key={brand.file}
            className="flex min-h-20 basis-1/2 items-center justify-center px-3 md:basis-1/4"
          >
            <Image
              src={`/images/logos/${brand.file}.png`}
              alt={brand.name}
              width={brand.width}
              height={brand.height}
              unoptimized
              loading="lazy"
              style={{ width: `min(${brand.displayWidth}px, ${brand.displayWidth / 5.4}vw + 4vw)` }}
              className="h-auto max-w-full"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
