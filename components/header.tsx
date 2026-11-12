import { navigation, site } from "@/content/site";
import { PanelLink } from "./panel-link";

const contactPanelId = "contact-panel";
const menuPanelId = "menu-panel";

function Chevron() {
  return (
    <svg className="chevron size-2.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 4 6 8.5 10.5 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ContactLinks() {
  return (
    <>
      <a className="stroke-link" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <a className="stroke-link" href={site.instagram.url} target="_blank" rel="noreferrer">
        {site.instagram.handle}
      </a>
    </>
  );
}

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-bar bg-navy text-white">
      <div className="relative flex h-full items-center justify-between px-gutter">
        <a href="#top" className="wordmark" aria-label={`${site.name}, home`}>
          {site.name}_
        </a>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 gap-7 lg:flex">
          {navigation.map((item) => (
            <a key={item.href} className="nav-link stroke-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          popoverTarget={contactPanelId}
          className="nav-link hidden h-full cursor-pointer items-center gap-2 lg:flex"
        >
          Get in contact
          <Chevron />
        </button>
        <div id={contactPanelId} popover="auto" className="panel min-w-72">
          <div className="flex flex-col items-start gap-2 p-5">
            <ContactLinks />
          </div>
        </div>

        <button
          type="button"
          popoverTarget={menuPanelId}
          className="nav-link flex h-full cursor-pointer items-center gap-2 lg:hidden"
        >
          Menu
          <Chevron />
        </button>
        <div id={menuPanelId} popover="auto" className="panel panel-full">
          <div className="flex flex-col items-start gap-7 px-gutter py-7">
            <nav aria-label="Mobile" className="flex flex-col items-start gap-2">
              {navigation.map((item) => (
                <PanelLink key={item.href} href={item.href} className="font-display text-title">
                  {item.label}
                </PanelLink>
              ))}
            </nav>
            <div className="flex flex-col items-start gap-1">
              <ContactLinks />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
