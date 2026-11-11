import Image from "next/image";
import { services } from "@/content/site";

export function Services() {
  return (
    <section id="services" className="grid bg-brown text-white md:grid-cols-2">
      <div className="flex flex-col md:border-r md:border-navy">
        <h2 className="border-b border-navy p-gutter">Services</h2>
        <div className="flex flex-1 flex-col p-gutter">
          <p className="max-w-[34rem]">{services.intro}</p>
          <ul className="mt-12 flex flex-col gap-2 font-display text-headline">
            {services.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-16 hidden text-small md:mt-auto md:block" aria-hidden="true">
            {services.photo.caption}
          </p>
        </div>
      </div>
      <figure>
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[80svh]">
          <Image
            src={`/images/projects/${services.photo.slug}.webp`}
            alt={services.photo.alt}
            fill
            sizes="(min-width: 48rem) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <figcaption className="p-gutter text-small md:hidden">{services.photo.caption}</figcaption>
      </figure>
    </section>
  );
}
