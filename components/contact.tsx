import { navigation, site } from "@/content/site";

export function Contact() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <p className="wordmark border-b border-white p-gutter">{site.name}_</p>
      <div className="flex flex-wrap gap-x-[clamp(3rem,8vw,8rem)] gap-y-8 p-gutter pt-[clamp(3rem,6vw,6rem)]">
        <nav aria-label="Footer" className="flex flex-col items-start gap-1">
          {navigation.map((item) => (
            <a key={item.href} className="stroke-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-start gap-1">
          <a className="stroke-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <a className="stroke-link" href={site.instagram.url} target="_blank" rel="noreferrer">
            {site.instagram.handle}
          </a>
        </div>
        <p className="md:ml-auto md:self-end">© 2026 {site.name}</p>
      </div>
    </footer>
  );
}
