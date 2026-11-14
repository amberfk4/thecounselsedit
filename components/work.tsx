import { home, work } from "@/lib/content";
import { ProjectCards } from "./project-cards";
import { SectionHeading } from "./section-heading";

export function Work() {
  return (
    <section id="work" className="border-t border-navy bg-taupe text-ink">
      <SectionHeading title={home.workHeading} link={{ href: "/work", label: "View all" }} />
      <ProjectCards projects={work.projects.slice(0, 4)} />
    </section>
  );
}
