const { Client } = require('discord.js');
const client = new Client();

const Logger = require('../index');
let config = {
    "pm": {
        "log": true,
        "logImages": true
    },
    "group": {
        "log": true,
        "logImages": true
    },
    "server": {
        "log": true,
        "logImages": true
    }
};

const logger = new Logger(client, config);

client.login('NzI2NTY4NzIzMTU4NDAxMDc2.XvfL2g.tQGTkHVmaQg_KBTUA9bTd-o6Wck');
client.on('ready', async() => {
    console.log('online');
});