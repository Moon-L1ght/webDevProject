import { app, BrowserWindow, shell } from "electron";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { access } from "node:fs/promises";
const appDir = dirname(fileURLToPath(import.meta.url));
async function waitForFile(filePath, timeoutMs = 5e3) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      await access(filePath);
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error(`Preload not found: ${filePath}`);
}
async function createWindow() {
  const preloadPath = join(appDir, "../preload/index.js");
  const prodIndexHtmlPath = join(appDir, "../../dist/index.html");
  await waitForFile(preloadPath).catch((e) => {
    console.warn("[warn] preload wait failed:", e.message);
  });
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: preloadPath
    }
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith("http://localhost") && !url.startsWith("devtools://") && !url.startsWith("file://")) {
      e.preventDefault();
    }
  });
  if (process.env.ELECTRON_RENDERER_URL) {
    await win.loadURL(process.env.ELECTRON_RENDERER_URL);
    win.webContents.openDevTools();
  } else {
    await win.loadFile(prodIndexHtmlPath);
  }
}
app.whenReady().then(() => {
  createWindow().catch((e) => console.error(e));
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
