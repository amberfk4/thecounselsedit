import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "thecounselsedit",
  deployment: { appId: "vlb421iiwiznxkxb129jp4r3" },
});
