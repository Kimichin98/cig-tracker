const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
  logEvent: (type) => ipcRenderer.invoke('log-event', type),
  readLogs: () => ipcRenderer.invoke('read-logs')
});