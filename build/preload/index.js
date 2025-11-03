"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    minimize: () => electron_1.ipcRenderer.send('window:minimize'),
    maximize: () => electron_1.ipcRenderer.send('window:maximize'),
    close: () => electron_1.ipcRenderer.send('window:close'),
    onMaximizeChange: (callback) => {
        electron_1.ipcRenderer.on('window:maximized', () => callback(true));
        electron_1.ipcRenderer.on('window:unmaximized', () => callback(false));
    },
});
//# sourceMappingURL=index.js.map