const { ipcRenderer } = require('electron');

function openWhatsApp() {
    ipcRenderer.send('open-whatsapp');
}

function sendMessage() {
    const contactList = [
        { name: "Alice", number: "33783215305" },
        { name: "Bob", number: "33769683329" },
        { name: "Charlie", number: "33783215305" },
        { name: "David", number: "33769683329" },
        { name: "Eve", number: "33783215305" },
        { name: "Frank", number: "33769683329" },
        { name: "Grace", number: "33783215305" },
        { name: "Heidi", number: "33769683329" },
        { name: "Ivan", number: "33783215305" },
        { name: "Judy", number: "33769683329" },
        { name: "Mallory", number: "33783215305" },
        { name: "Niaj", number: "33769683329" },
        { name: "Olivia", number: "33783215305" },
        { name: "Peggy", number: "33769683329" },
        { name: "Rupert", number: "33783215305" },
        { name: "Sybil", number: "33769683329" }
    
    ];
    const message = "Bonjour {nom}, comment ça va ?";
    ipcRenderer.send('start-sending', message, contactList);
}
