import { About } from "@/components/about";
import { Clients } from "@/components/clients";
import { Contact } from "@/components/contact";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Work } from "@/components/work";
import { site } from "@/content/site";

const organisation = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  sameAs: [site.instagram.url],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
      />
      <Header />
      <main>
        <Hero />
        <About />
        <Clients />
        <Work />
        <Services />
      </main>
      <Contact />
    </>
  );
}
