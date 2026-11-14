import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { media } from "sanity-plugin-media";
import { dataset, projectId } from "./env";
import { schemaTypes } from "./schemaTypes";
import { singletonTypes, structure } from "./structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
  name: "default",
  title: "The Counsel’s Edit",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), media()],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
    newDocumentOptions: (options) =>
      options.filter(({ templateId }) => !singletonTypes.has(templateId)),
  },
});
