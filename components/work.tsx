import { home } from "@/lib/content";
import { SanityImage } from "./sanity-image";

export function Work() {
  return (
    <section id="work" className="border-y border-navy bg-taupe text-ink">
      <h2 className="border-b border-navy p-gutter">{home.work.heading}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4">
        {home.work.photos.map((photo) => (
          <li
            key={photo.src}
            className="border-r border-b border-navy p-[clamp(1rem,3vw,3rem)] even:border-r-0 md:border-b-0 md:even:border-r md:last:border-r-0"
          >
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden">
                <SanityImage photo={photo} sizes="(min-width: 48rem) 20vw, 42vw" />
              </div>
              {photo.credit && (
                <figcaption className="mt-4 text-center text-small">{photo.credit}</figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
