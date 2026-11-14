import { BulbOutlineIcon } from "@sanity/icons/BulbOutline";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { ImagesIcon } from "@sanity/icons/Images";
import { TagsIcon } from "@sanity/icons/Tags";
import { UserIcon } from "@sanity/icons/User";
import type { ComponentType } from "react";
import type { StructureBuilder, StructureResolver } from "sanity/structure";

export const singletonTypes = new Set([
  "homePage",
  "aboutPage",
  "workPage",
  "servicesPage",
  "clientsPage",
  "siteSettings",
]);

function singleton(S: StructureBuilder, type: string, title: string, icon: ComponentType) {
  return S.listItem()
    .title(title)
    .id(type)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      singleton(S, "homePage", "Home page", HomeIcon),
      singleton(S, "aboutPage", "About", UserIcon),
      singleton(S, "workPage", "Work", ImagesIcon),
      singleton(S, "servicesPage", "Services", BulbOutlineIcon),
      singleton(S, "clientsPage", "Clients", TagsIcon),
      S.divider(),
      singleton(S, "siteSettings", "Site settings", CogIcon),
    ]);
