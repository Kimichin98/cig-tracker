const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');
const Tracker = require('./tracker');

let mainWindow;
let tray;
let tracker; // Will be initialized after app is ready

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Initialize tracker with file path in user data directory
  const logFilePath = path.join(app.getPath('userData'), 'cigarette-logs.txt');
  tracker = new Tracker(logFilePath);
  console.log('Logs saved to:', logFilePath); // console log to see where files are stored
  
  createWindow();

  const iconPath = path.join(__dirname, 'assets', 'tray.png');
  let trayIcon = undefined;
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
  } catch (e) {
    trayIcon = undefined;
  }

  tray = new Tray(trayIcon || nativeImage.createEmpty());

  const contextMenu = Menu.buildFromTemplate([
    { 
      label: 'Show', 
      click: () => { 
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show();
        } else {
          createWindow();
        }
      } 
    },
    { label: 'Quit', click: () => { app.quit(); } }
  ]);

  tray.setToolTip('Cigarette Tracker');
  tray.setContextMenu(contextMenu);

  ipcMain.handle('log-event', async (event, type) => {
    const entry = tracker.log(type);
    return entry;
  });

  ipcMain.handle('read-logs', async () => {
    return tracker.readAll();
  });

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});