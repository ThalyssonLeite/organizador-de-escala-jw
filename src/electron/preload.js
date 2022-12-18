const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',{
  findFinalDate: () => ipcRenderer.invoke('find-final-date')
});