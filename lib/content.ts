import type { Metadata } from "next";
import data from "@/content/sanity-content.json";
import { site } from "@/content/site";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  position: string;
};

export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  displayWidth: number;
};

export type Page = {
  title: string;
  intro: string;
  description: string;
};

export type Project = {
  title: string;
  slug: string;
  photos: Photo[];
};

export type Service = {
  name: string;
  description: string;
};

export type SiteContent = {
  settings: {
    email: string;
    instagram: string;
    copyright: string;
    description: string;
  };
  home: {
    headline: [string, string, string];
    intro: string;
    contactLabel: string;
    heroPhoto: Photo;
    about: { statement: string; text: string };
    clientsHeading: string;
    workHeading: string;
    services: { heading: string; intro: string; photo: Photo };
  };
  about: Page & { statement: string; paragraphs: string[]; photo: Photo };
  work: Page & { projects: Project[] };
  services: Page & { items: Service[]; photo: Photo };
  clients: Page & { logos: ClientLogo[] };
};

export const content = data as SiteContent;

export const { settings, home, about, work, services, clients } = content;

export const instagramUrl = `https://www.instagram.com/${settings.instagram}/`;

export function pageMetadata(page: Page, path: string): Metadata {
  const description = page.description || settings.description;
  return {
    title: `${page.title} | ${site.name}_`,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${page.title} | ${site.name}_`, description, url: path },
  };
}
