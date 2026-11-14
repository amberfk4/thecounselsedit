import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageFields, pageGroups } from "./pageFields";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: UserIcon,
  groups: pageGroups,
  fields: [
    ...pageFields,
    defineField({
      name: "statement",
      title: "Statement",
      type: "text",
      rows: 2,
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "paragraphs",
      title: "Paragraphs",
      type: "array",
      group: "content",
      description: "Drag to reorder.",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "photo",
      group: "content",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
