import { TagsIcon } from "@sanity/icons/Tags";
import { defineArrayMember, defineField, defineType } from "sanity";
import { LogosBulkUploadInput } from "../components/BulkUploadInput";
import { pageFields, pageGroups } from "./pageFields";

export const clientsPage = defineType({
  name: "clientsPage",
  title: "Clients page",
  type: "document",
  icon: TagsIcon,
  groups: pageGroups,
  fields: [
    ...pageFields,
    defineField({
      name: "clients",
      title: "Client logos",
      type: "array",
      group: "content",
      description: "Drag to reorder. Shown here and on the home page. Use “Upload multiple logos” to add several at once.",
      of: [defineArrayMember({ type: "clientLogo" })],
      components: { input: LogosBulkUploadInput },
    }),
  ],
  preview: { prepare: () => ({ title: "Clients page" }) },
});
