import { ImageIcon } from "@sanity/icons/Image";
import { defineField, defineType } from "sanity";

export const photo = defineType({
  name: "photo",
  title: "Photo",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Click the crop icon to choose which part of the photo stays in view.",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
      description: "Shown under the photo, for example “Studio Boum x Rhode - NY Pop Up”.",
    }),
    defineField({
      name: "alt",
      title: "Description for screen readers",
      type: "string",
      description: "Describe what the photo shows in one sentence.",
    }),
  ],
  preview: {
    select: { title: "credit", subtitle: "alt", media: "image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "No credit", subtitle, media }),
  },
});
