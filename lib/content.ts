import data from "@/content/sanity-content.json";

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
    clients: { heading: string; logos: ClientLogo[] };
    work: { heading: string; photos: Photo[] };
    services: { heading: string; intro: string; items: string[]; photo: Photo };
  };
};

export const content = data as SiteContent;

export const { settings, home } = content;

export const instagramUrl = `https://www.instagram.com/${settings.instagram}/`;
