import { ContactBand } from "@/components/contact-band";
import { PageHeader } from "@/components/page-header";
import { ProjectCards } from "@/components/project-cards";
import { pageMetadata, work } from "@/lib/content";

export const metadata = pageMetadata(work, "/work");

export default function WorkPage() {
  return (
    <main>
      <PageHeader title={work.title} intro={work.intro} />
      <section aria-label={work.title} className="border-t border-navy bg-taupe text-ink">
        <ProjectCards projects={work.projects} />
      </section>
      <ContactBand />
    </main>
  );
}
