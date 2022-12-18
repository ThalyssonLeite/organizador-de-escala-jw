// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const { powerSaveBlocker } = require('electron');
const pie = require("puppeteer-in-electron")
const puppeteer = require("puppeteer-core");
const path = require('path');

pie.initialize(app).then();

const createWindow = async (show = true) => {
  // Create the browser window.
  const window = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      accessibleTitle: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })


  if (show) {
    window.maximize();
    window.show();
  };

  window.webContents.openDevTools()

  // and load the index.html of the app.
  window.loadURL(path.resolve(__dirname, '../index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  return window;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  powerSaveBlocker.start('prevent-display-sleep');

  await createWindow(true);
  browser = await pie.connect(app, puppeteer);

  const createPage = async (url) => {
    const window = await createWindow(false);

    try {
      const page = await pie.getPage(browser, window);
      await page.goto(url);

      return page;
    } catch (e) {
      try {
        browser = await pie.connect(app, puppeteer);
        const page = await pie.getPage(browser, window);
        await page.goto(url);

        return page;
      } catch (e) {
        window.close();
      }
    }
  };

  const closePage = (page) => {
    try { page.close() } catch(e) {console.log(e)};
  }

 ipcMain.handle('find-final-date', async () => {
  const findFinalDate = require('../api/find-final-date');
  const date = await findFinalDate(createPage, closePage);
  
  return date;
 });

 ipcMain.handle('programation-data', async (event, date) => {
  const programationData = require('../api/programation-data');
  const programation = await programationData(createPage, closePage, date);
  return programation;
 });

 ipcMain.handle('download-image', async (event, pdfText) => {
  const downloadImage = require('../api/download-image');
  const image = await downloadImage(pdfText);
  return image;
 });

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.