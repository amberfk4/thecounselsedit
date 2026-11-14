import { home, settings } from "@/lib/content";

export function ContactBand() {
  return (
    <section className="flex flex-col items-center gap-8 bg-taupe px-gutter py-[clamp(3.5rem,7vw,6rem)] text-center text-ink">
      <a className="stroke-link text-statement" href={`mailto:${settings.email}`}>
        {settings.email}
      </a>
      <a className="action" href={`mailto:${settings.email}`}>
        {home.contactLabel}
      </a>
    </section>
  );
}
