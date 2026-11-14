import { home, services } from "@/lib/content";
import { SanityImage } from "./sanity-image";
import { SectionHeading } from "./section-heading";

export function Services() {
  const { heading, intro, photo } = home.services;

  return (
    <section id="services" className="grid bg-brown text-white md:grid-cols-2">
      <div className="flex flex-col md:border-r md:border-navy">
        <SectionHeading title={heading} link={{ href: "/services", label: "Find out more" }} />
        <div className="flex flex-1 flex-col p-gutter">
          {intro && <p className="max-w-[34rem]">{intro}</p>}
          <ul className="mt-12 flex flex-col gap-2 font-display text-headline">
            {services.items.map((item) => (
              <li key={item.name}>{item.name}</li>
            ))}
          </ul>
          {photo.credit && (
            <p className="mt-16 hidden text-small md:mt-auto md:block" aria-hidden="true">
              {photo.credit}
            </p>
          )}
        </div>
      </div>
      <figure>
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[80svh]">
          <SanityImage photo={photo} sizes="(min-width: 48rem) 50vw, 100vw" />
        </div>
        {photo.credit && <figcaption className="p-gutter text-small md:hidden">{photo.credit}</figcaption>}
      </figure>
    </section>
  );
}
