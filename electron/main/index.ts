import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 640,
    minHeight: 480,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../../build/preload/index.js')
    },
  });

  // Dev vs Production
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('window:minimize', (event) => {
  const w = BrowserWindow.fromWebContents(event.sender);
  w?.minimize();
});

ipcMain.on('window:maximize', (event) => {
  const w = BrowserWindow.fromWebContents(event.sender);
  if (!w) return;

  if (w.isMaximized()) w.unmaximize();
  else w.maximize();

  event.sender.send('window-maximize-change', w.isMaximized());
});

ipcMain.on('window:close', (event) => {
  const w = BrowserWindow.fromWebContents(event.sender);
  w?.close();
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
