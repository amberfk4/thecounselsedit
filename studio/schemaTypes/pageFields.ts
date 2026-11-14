import { defineField } from "sanity";

export const pageGroups = [
  { name: "page", title: "Page", default: true },
  { name: "content", title: "Content" },
];

export const pageFields = [
  defineField({
    name: "title",
    title: "Page title",
    type: "string",
    group: "page",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "intro",
    title: "Intro text",
    type: "text",
    rows: 3,
    group: "page",
  }),
  defineField({
    name: "description",
    title: "Search and sharing description",
    type: "text",
    rows: 2,
    group: "page",
    description: "Shown by Google and when the link is shared. Leave empty to use the one in Site settings.",
    validation: (rule) => rule.max(200),
  }),
];
