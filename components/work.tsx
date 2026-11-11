import Image from "next/image";
import { projects } from "@/content/site";

export function Work() {
  return (
    <section id="work" className="border-y border-navy bg-taupe text-ink">
      <h2 className="border-b border-navy p-gutter">Work</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="border-r border-b border-navy p-[clamp(1rem,3vw,3rem)] even:border-r-0 md:border-b-0 md:even:border-r md:last:border-r-0"
          >
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={`/images/projects/${project.slug}.webp`}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 48rem) 20vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-small">{project.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
