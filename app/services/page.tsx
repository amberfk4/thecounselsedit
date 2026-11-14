import { ContactBand } from "@/components/contact-band";
import { PageHeader } from "@/components/page-header";
import { SanityImage } from "@/components/sanity-image";
import { pageMetadata, services } from "@/lib/content";

export const metadata = pageMetadata(services, "/services");

export default function ServicesPage() {
  const { photo } = services;

  return (
    <main>
      <PageHeader title={services.title} intro={services.intro} />
      <ul className="bg-brown text-white">
        {services.items.map((service) => (
          <li
            key={service.name}
            className="grid gap-4 border-t border-navy p-gutter py-[clamp(2rem,4vw,3.5rem)] md:grid-cols-2 md:gap-gutter"
          >
            <h2 className="font-display text-[length:var(--text-headline)] leading-[1.12] normal-case tracking-normal">
              {service.name}
            </h2>
            {service.description && <p className="max-w-[34rem] md:pt-3">{service.description}</p>}
          </li>
        ))}
      </ul>
      <figure className="border-t border-navy">
        <div className="relative aspect-[4/5] md:aspect-[21/9]">
          <SanityImage photo={photo} sizes="100vw" />
        </div>
        {photo.credit && <figcaption className="p-gutter text-small">{photo.credit}</figcaption>}
      </figure>
      <ContactBand />
    </main>
  );
}
