import { clients, home } from "@/lib/content";
import { LogoGrid } from "./logo-grid";
import { SectionHeading } from "./section-heading";

export function Clients() {
  return (
    <section id="clients">
      <SectionHeading
        title={home.clientsHeading}
        link={{ href: "/clients", label: "View all" }}
        className="bg-navy text-taupe"
      />
      <LogoGrid logos={clients.logos} />
    </section>
  );
}
