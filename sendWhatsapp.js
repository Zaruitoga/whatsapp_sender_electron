async function sendWhatsAppMessages(browser, contactList, messageTemplate) {
    for (const { name, number } of contactList) {
        const message = messageTemplate.replace('{nom}', name);
        const url = `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
        await browser.loadURL(url);
        await new Promise(r => setTimeout(r, 2000));

        const result = await browser.webContents.executeJavaScript(`
            new Promise((resolve, reject) => {
                const startTime = Date.now();
                const timeout = 15000;
                function check() {
                    const btn = document.querySelector('[data-icon="send"]');
                    if (btn) {
                        const prevCount = document.querySelectorAll('.message-out').length;
                        btn.click();
                        function waitForSend() {
                            const messages = document.querySelectorAll('.message-out');
                            if (messages.length > prevCount) {
                                const last = messages[messages.length - 1];
                                const text = last.querySelector('.copyable-text')?.innerText;
                                const icon = last.querySelector('[data-icon*="check"]');
                                if (text.includes(${JSON.stringify(message)}) && icon) {
                                    resolve("Envoyé");
                                } else {
                                    setTimeout(waitForSend, 500);
                                }
                            } else if (Date.now() - startTime < timeout) {
                                setTimeout(waitForSend, 500);
                            } else {
                                reject("Message non confirmé");
                            }
                        }
                        waitForSend();
                    } else if (Date.now() - startTime < timeout) {
                        setTimeout(check, 500);
                    } else {
                        reject("Bouton non trouvé");
                    }
                }
                check();
            })
        `).catch(err => `Erreur: ${err}`);

        console.log(`${name}: ${result}`);
        await new Promise(r => setTimeout(r, 1000));
    }
}

module.exports = { sendWhatsAppMessages };
