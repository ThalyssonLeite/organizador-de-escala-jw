const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI',{
  findFinalDate: () => ipcRenderer.invoke('find-final-date'),
  programationData: (date) => ipcRenderer.invoke('programation-data', date),
  downloadImage: (pdfText) => ipcRenderer.invoke('download-image', pdfText),
});