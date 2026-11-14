import { CogIcon } from "@sanity/icons/Cog";
import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle",
      type: "string",
      description: "Without the @, for example thecounselsedit.",
      validation: (rule) => rule.required().regex(/^[A-Za-z0-9._]+$/, { name: "handle" }),
    }),
    defineField({
      name: "copyright",
      title: "Copyright name",
      type: "string",
      description: "Shown in the footer after © and the year.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Search and sharing description",
      type: "text",
      rows: 3,
      description: "Shown by Google and when the link is shared. Around 150 characters.",
      validation: (rule) => rule.required().max(200),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
