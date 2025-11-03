import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("electronAPI", {
  minimize: () => ipcRenderer.send("window:minimize"),
  maximize: () => ipcRenderer.send("window:maximize"),
  close: () => ipcRenderer.send("window:close"),
  onMaximizeChange: (callback) => {
    ipcRenderer.on("window:maximized", () => callback(true));
    ipcRenderer.on("window:unmaximized", () => callback(false));
  }
});
