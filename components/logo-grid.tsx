import Image from "next/image";
import type { ClientLogo } from "@/lib/content";

export function LogoGrid({ logos }: { logos: ClientLogo[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-y-[clamp(2rem,4vw,4rem)] px-gutter py-panel">
      {logos.map((logo) => (
        <li key={logo.src} className="flex min-h-20 basis-1/2 items-center justify-center px-3 md:basis-1/4">
          <Image
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            sizes={`${logo.displayWidth}px`}
            loading="lazy"
            style={{ width: `min(${logo.displayWidth}px, ${logo.displayWidth / 5.4}vw + 4vw)` }}
            className="h-auto max-w-full"
          />
        </li>
      ))}
    </ul>
  );
}
