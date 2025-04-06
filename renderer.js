const { ipcRenderer } = require('electron');

function openWhatsApp() {
  ipcRenderer.send('open-whatsapp');
}


function hello() {
  alert("Coucou depuis Electron !");
}
