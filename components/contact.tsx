import { navigation, site } from "@/content/site";
import { instagramUrl, settings } from "@/lib/content";

const year = new Date().getFullYear();

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
          <a className="stroke-link" href={`mailto:${settings.email}`}>
            {settings.email}
          </a>
          <a className="stroke-link" href={instagramUrl} target="_blank" rel="noreferrer">
            @{settings.instagram}
          </a>
        </div>
        <p className="md:ml-auto md:self-end">© {year} {settings.copyright}</p>
      </div>
    </footer>
  );
}
