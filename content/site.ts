export const site = {
  name: "The Counsel’s Edit",
  url: "https://thecounselsedit.com",
  description:
    "Legal consultancy for fashion and the creative industries. Commercial legal advice with an in-house perspective.",
  email: "amber@thecounselsedit.com",
  instagram: {
    handle: "@thecounselsedit",
    url: "https://www.instagram.com/thecounselsedit/",
  },
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
];

export const headline = {
  first: "Legal consultancy for fashion",
  second: "and the creative industries",
  support:
    "Commercial legal advice with an in-house perspective, for brands that want experienced counsel without private-practice fees or permanent headcount.",
};

export type Photo = {
  slug: string;
  alt: string;
  caption: string;
};

export const heroPhoto: Photo = {
  slug: "lobby",
  alt: "A hotel lobby with a green kiosk and postbox on a checked marble floor",
  caption: "Rosewood, Kiosk Worldwide",
};

export const about = {
  statement: "We get to know your business and work as if we’re sitting next to you.",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
};

export const projects: Photo[] = [
  {
    slug: "table",
    alt: "A long winding dinner table in a dark room, lined with a miniature city skyline",
    caption: "Hermès, Williamsburg Store Opening Event",
  },
  {
    slug: "vessel",
    alt: "A pale ceramic vessel against a blue tiled grid with the JW Anderson name",
    caption: "JW Anderson, SS27 Lookbook",
  },
  {
    slug: "show",
    alt: "Models and horses crossing a sand arena during a fashion show, watched by a full crowd",
    caption: "Stella McCartney, Paris Fashion Show W26",
  },
  {
    slug: "cafe",
    alt: "A Parisian courtyard cafe with pink tablecloths and small brass lamps",
    caption: "Pandora, Paris Wonders Cafe",
  },
];

export const services = {
  intro:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  items: ["Lorem ipsum dolor", "Consectetur adipiscing", "Tempor incididunt", "Magna aliqua enim"],
  photo: {
    slug: "chest",
    alt: "A carved dark wooden chest holding raw stones, set against crashing water",
    caption: "JW Anderson, SS27 Lookbook",
  },
};

export const brands = [
  { name: "Varley", file: "varley", width: 376, height: 47, displayWidth: 190 },
  { name: "Stella McCartney", file: "stella-mccartney", width: 382, height: 20, displayWidth: 235 },
  { name: "Erdem", file: "erdem", width: 337, height: 69, displayWidth: 140 },
  { name: "Damson Madder", file: "damson-madder", width: 381, height: 31, displayWidth: 200 },
  { name: "Satisfy", file: "satisfy", width: 363, height: 67, displayWidth: 135 },
  { name: "Studio Boum", file: "studio-boum", width: 282, height: 129, displayWidth: 108 },
  { name: "Dominique Temple Consulting", file: "dominique-temple", width: 383, height: 85, displayWidth: 150 },
  { name: "Michael Stukan", file: "michael-stukan", width: 1000, height: 751, displayWidth: 120 },
  { name: "DLX", file: "dlx", width: 385, height: 94, displayWidth: 140 },
  { name: "4th & Reckless", file: "4th-and-reckless", width: 386, height: 26, displayWidth: 230 },
  { name: "Paper Mache Tiger", file: "paper-mache-tiger", width: 384, height: 44, displayWidth: 170 },
];
