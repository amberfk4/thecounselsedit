import { home, settings } from "@/lib/content";
import { SanityImage } from "./sanity-image";

export function Hero() {
  const [first, second, third] = home.headline;
  const photo = home.heroPhoto;

  return (
    <section id="top" className="flex min-h-svh flex-col pt-bar">
      <h1 className="hero-title px-gutter py-[clamp(2rem,5svh,3.5rem)]">
        <span className="block">
          <span className="block md:inline">{first}</span>{" "}
          <span className="block md:inline">{second}</span>
        </span>
        <span className="flex flex-wrap items-end">
          <span>{third}</span>
          <span aria-hidden="true" className="signing-line mb-[0.2em]" />
        </span>
      </h1>

      <div className="grid flex-1 border-t border-navy md:grid-cols-3">
        <div className="flex flex-col items-start gap-8 border-navy p-gutter md:border-r">
          <p className="max-w-[26rem]">{home.intro}</p>
          <a className="action" href={`mailto:${settings.email}`}>
            {home.contactLabel}
          </a>
          {photo.credit && (
            <p className="mt-auto hidden text-small md:block" aria-hidden="true">
              {photo.credit}
            </p>
          )}
        </div>
        <figure className="md:col-span-2 md:flex md:flex-col">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[45svh] md:flex-1">
            <SanityImage photo={photo} sizes="(min-width: 48rem) 67vw, 100vw" preload />
          </div>
          {photo.credit && (
            <figcaption className="px-gutter py-3 text-small md:hidden">{photo.credit}</figcaption>
          )}
        </figure>
      </div>
    </section>
  );
}
