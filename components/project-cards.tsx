import Link from "next/link";
import type { Project } from "@/lib/content";
import { SanityImage } from "./sanity-image";

export function ProjectCards({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4">
      {projects.map((project, index) => (
        <li
          key={project.slug}
          className="border-r border-b border-navy even:border-r-0 md:even:border-r md:nth-[4n]:border-r-0"
        >
          <Link href={`/work/${project.slug}`} className="group flex h-full flex-col p-[clamp(1rem,3vw,3rem)]">
            <span className="relative block aspect-[4/5] overflow-hidden">
              <SanityImage
                photo={project.photos[0]}
                sizes="(min-width: 48rem) 20vw, 42vw"
                preload={index === 0}
              />
            </span>
            <span className="mt-4 text-center text-small">
              <span className="stroke-link group-hover:bg-size-[100%_1px]">{project.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
