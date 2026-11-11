import Image from "next/image";
import { headline, heroPhoto, site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="flex min-h-svh flex-col pt-bar">
      <h1 className="px-gutter py-[clamp(2rem,5svh,3.5rem)] text-headline">
        <span className="block">{headline.first}</span>
        <span className="flex flex-wrap items-end">
          <span>{headline.second}</span>
          <span aria-hidden="true" className="signing-line mb-[0.2em]" />
        </span>
      </h1>

      <div className="grid flex-1 border-t border-navy md:grid-cols-3">
        <div className="flex flex-col items-start gap-8 border-navy p-gutter md:border-r">
          <p className="max-w-[26rem]">{headline.support}</p>
          <a className="action" href={`mailto:${site.email}`}>
            Get in contact
          </a>
          <p className="mt-auto hidden text-small md:block" aria-hidden="true">
            {heroPhoto.caption}
          </p>
        </div>
        <figure className="md:col-span-2 md:flex md:flex-col">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[45svh] md:flex-1">
            <Image
              src={`/images/projects/${heroPhoto.slug}.webp`}
              alt={heroPhoto.alt}
              fill
              preload
              sizes="(min-width: 48rem) 67vw, 100vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
          <figcaption className="px-gutter py-3 text-small md:hidden">{heroPhoto.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
