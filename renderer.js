const { ipcRenderer } = require('electron');

function openWhatsApp() {
    ipcRenderer.send('open-whatsapp');
}

function sendMessage() {
    const contactList = [
        { name: "Alice", number: "33783215305" },
        { name: "Bob", number: "33783215305" },
        { name: "Charlie", number: "33783215305" }
    ];
    const message = "Bonjour {nom}, comment ça va ?";
    ipcRenderer.send('start-sending', message, contactList);
}
