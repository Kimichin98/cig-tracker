const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let tray;
let tracker;


function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
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
  createWindow();

  const iconPath = path.join(__dirname, 'assets', 'tray.png');
  let trayIcon = undefined;
  try {
    trayIcon = nativeImage.createFromPath(iconPath);
  } catch (e) {
    trayIcon = undefined;
  }

  tray = new Tray(trayIcon || undefined);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', click: () => { mainWindow.show(); } },
    { label: 'Quit', click: () => { app.quit(); } }
  ]);
  tray.setToolTip('Cigarette Tracker');
  tray.setContextMenu(contextMenu);


  ipcMain.handle('log-event', async (event, type) => {
    const entry = tracker.log(type);
    return entry; // returns the line that was written
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