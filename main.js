const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'renderer.js'),
    },
  });

  win.loadFile('index.html');
}

ipcMain.on('open-whatsapp', () => {
  const whatsappWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });

  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
  
  whatsappWindow.loadURL('https://web.whatsapp.com', {
    userAgent: userAgent,
  });
});

app.disableHardwareAcceleration();

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
