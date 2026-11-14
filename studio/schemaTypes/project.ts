import { ImagesIcon } from "@sanity/icons/Images";
import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesBulkUploadInput } from "../components/BulkUploadInput";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Credit",
      type: "string",
      description: "For example “Studio Boum x Hermès - Williamsburg Store Opening”.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      type: "slug",
      description: "The end of this project’s page address, for example thecounselsedit.com/work/hermes. Click Generate to create it from the credit.",
      options: {
        source: (_document, context) => (context.parent as { title?: string } | undefined)?.title ?? "",
        maxLength: 60,
        isUnique: () => true,
      },
      validation: (rule) =>
        rule.custom((slug, context) => {
          const current = (slug as { current?: string } | undefined)?.current;
          if (!current) return true;
          const projects = (context.document?.projects ?? []) as { _key: string; slug?: { current?: string } }[];
          const ownKey = (context.parent as { _key?: string } | undefined)?._key;
          const taken = projects.some((project) => project._key !== ownKey && project.slug?.current === current);
          return taken ? "Another project already uses this web address" : true;
        }),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description: "Drag to reorder. The first photo is the project’s cover on the home page and the Work page.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Description for screen readers",
              type: "string",
            }),
          ],
        }),
      ],
      components: { input: ImagesBulkUploadInput },
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "title", media: "images.0", images: "images" },
    prepare: ({ title, media, images }) => ({
      title,
      subtitle: `${images?.length ?? 0} photo${images?.length === 1 ? "" : "s"}`,
      media,
    }),
  },
});
