import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { defineArrayMember, defineField, defineType } from "sanity";
import { pageFields, pageGroups } from "./pageFields";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: BulbOutlineIcon,
  groups: pageGroups,
  fields: [
    ...pageFields,
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      group: "content",
      description: "Drag to reorder. The home page lists the names.",
      of: [
        defineArrayMember({
          type: "object",
          name: "service",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
          ],
          preview: { select: { title: "name", subtitle: "description" } },
        }),
      ],
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "photo",
      group: "content",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
