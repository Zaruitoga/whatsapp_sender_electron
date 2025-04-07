const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');
const { sendWhatsAppMessages } = require('./sendWhatsapp');

let whatsappWindow;
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, 'renderer.js'),
    },
  });

  win.loadFile('index.html');
}

ipcMain.on('open-whatsapp', () => {
  whatsappWindow = new BrowserWindow({
    width: 1000,
    height: 800,
  });
  win.show()
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36';
  
  whatsappWindow.loadURL('https://web.whatsapp.com', {
    userAgent: userAgent,
  });
});

ipcMain.on('start-sending', async (event, message, contactList) => {
    console.log("Données reçues :", message, contactList);
    if (!whatsappWindow || whatsappWindow.isDestroyed()) {
        whatsappWindow = new BrowserWindow({
            width: 1000,
            height: 800,
        });
        await whatsappWindow.loadURL('https://web.whatsapp.com', {
            userAgent: 'Mozilla/5.0 (...) Chrome/114.0 Safari/537.36'
        });
        await new Promise(r => setTimeout(r, 4000));
    }

    await sendWhatsAppMessages(whatsappWindow, contactList, message);
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
