import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactBand } from "@/components/contact-band";
import { PageHeader } from "@/components/page-header";
import { site } from "@/content/site";
import { settings, work } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return work.projects.map((project) => ({ slug: project.slug }));
}

function findProject(slug: string) {
  const index = work.projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();
  const count = work.projects.length;
  return {
    project: work.projects[index],
    previous: count > 1 ? work.projects[(index - 1 + count) % count] : null,
    next: count > 1 ? work.projects[(index + 1) % count] : null,
  };
}

export async function generateMetadata(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const { project } = findProject(slug);
  const title = `${project.title} | ${site.name}_`;
  return {
    title,
    description: settings.description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: settings.description, url: `/work/${project.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const { project, previous, next } = findProject(slug);

  return (
    <main>
      <PageHeader title={project.title} />
      <div className="border-t border-navy p-gutter">
        <Link className="nav-link stroke-link" href="/work">
          All work
        </Link>
      </div>
      <section
        aria-label={project.title}
        className="grid items-start gap-gutter border-t border-navy p-gutter md:grid-cols-2"
      >
        {project.photos.map((photo, index) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes="(min-width: 48rem) 50vw, 100vw"
            preload={index === 0}
            className="h-auto w-full"
          />
        ))}
      </section>
      {previous && next && (
        <nav
          aria-label="More projects"
          className="grid gap-6 border-t border-navy p-gutter sm:grid-cols-2"
        >
          <Link className="group flex flex-col items-start gap-1" href={`/work/${previous.slug}`}>
            <span className="nav-link">Previous project</span>
            <span className="stroke-link group-hover:bg-size-[100%_1px]">{previous.title}</span>
          </Link>
          <Link className="group flex flex-col items-start gap-1 sm:items-end sm:text-right" href={`/work/${next.slug}`}>
            <span className="nav-link">Next project</span>
            <span className="stroke-link group-hover:bg-size-[100%_1px]">{next.title}</span>
          </Link>
        </nav>
      )}
      <ContactBand />
    </main>
  );
}
