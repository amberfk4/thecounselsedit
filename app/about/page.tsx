import { ContactBand } from "@/components/contact-band";
import { PageHeader } from "@/components/page-header";
import { SanityImage } from "@/components/sanity-image";
import { about, pageMetadata } from "@/lib/content";

export const metadata = pageMetadata(about, "/about");

export default function AboutPage() {
  const { photo } = about;

  return (
    <main>
      <PageHeader title={about.title} intro={about.intro} />
      <section className="grid border-t border-navy md:grid-cols-2">
        <div className="flex flex-col p-gutter md:border-r md:border-navy">
          <p className="max-w-[22em] text-statement">{about.statement}</p>
          <div className="mt-10 flex max-w-[34rem] flex-col gap-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {photo.credit && (
            <p className="mt-16 hidden text-small md:mt-auto md:block md:pt-16" aria-hidden="true">
              {photo.credit}
            </p>
          )}
        </div>
        <figure>
          <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[80svh]">
            <SanityImage photo={photo} sizes="(min-width: 48rem) 50vw, 100vw" preload />
          </div>
          {photo.credit && <figcaption className="p-gutter text-small md:hidden">{photo.credit}</figcaption>}
        </figure>
      </section>
      <ContactBand />
    </main>
  );
}
