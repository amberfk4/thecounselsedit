import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ProjectsBulkUploadInput } from "../components/BulkUploadInput";
import { pageFields, pageGroups } from "./pageFields";

export const workPage = defineType({
  name: "workPage",
  title: "Work page",
  type: "document",
  icon: ImagesIcon,
  groups: pageGroups,
  fields: [
    ...pageFields,
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      group: "content",
      description:
        "Drag to reorder. The first four appear on the home page. “Upload multiple photos” creates one project per photo.",
      of: [defineArrayMember({ type: "project" })],
      components: { input: ProjectsBulkUploadInput },
    }),
  ],
  preview: { prepare: () => ({ title: "Work page" }) },
});
