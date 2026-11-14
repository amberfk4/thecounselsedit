import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import type { StructureResolver } from "sanity/structure";

export const homePageId = "homePage";
export const siteSettingsId = "siteSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home page")
        .id(homePageId)
        .icon(HomeIcon)
        .child(S.document().schemaType("homePage").documentId(homePageId).title("Home page")),
      S.divider(),
      S.listItem()
        .title("Site settings")
        .id(siteSettingsId)
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId(siteSettingsId).title("Site settings")),
    ]);
