import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client logo",
  type: "object",
  icon: TagIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "A PNG or SVG with a transparent background works best.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "width",
      title: "Width on large screens",
      type: "number",
      description:
        "In pixels, between 60 and 320. Leave empty to size it automatically. Wide wordmarks usually look right around 200, compact or stacked logos around 110.",
      validation: (rule) => rule.min(60).max(320).integer(),
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});
