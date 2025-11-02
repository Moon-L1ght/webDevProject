import { contextBridge } from "electron";
contextBridge.exposeInMainWorld("appApi", {
  platform: process.platform,
  versions: process.versions
});
