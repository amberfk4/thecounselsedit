import { ContactBand } from "@/components/contact-band";
import { LogoGrid } from "@/components/logo-grid";
import { PageHeader } from "@/components/page-header";
import { clients, pageMetadata } from "@/lib/content";

export const metadata = pageMetadata(clients, "/clients");

export default function ClientsPage() {
  return (
    <main>
      <PageHeader title={clients.title} intro={clients.intro} />
      <section className="border-t border-navy">
        <LogoGrid logos={clients.logos} />
      </section>
      <ContactBand />
    </main>
  );
}
