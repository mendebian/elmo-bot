const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath: "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth()
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', message => {

    const id = message.id;
    const body = message.body;

    const group = id.participant ? true : false;
    const phone = group ? id.participant : id.remote;
    const name = message.notifyName;

    const prefix = '!';
    const cmd = body.startsWith(prefix) ? body.substring(1).toLowerCase() : null;

    switch(cmd) {
        case 's': case 'sticker': case 'figurinha': case 'fig': case 'f':
            generateSticker(message);
            break;
    };
});

client.initialize();

const generateSticker = async (message) => {
    try {
        const { data } = await message.downloadMedia();
        const image = await new MessageMedia("image/jpeg", data, "image.jpg");
        await message.reply(id.remote, image, { sendMediaAsSticker: true, stickerName: 'Sticker', stickerAuthor: 'Elmo BOT' });
    } catch(e) {
        message.reply("Erro ao processar imagem");
    };
};
