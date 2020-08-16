# Discord Chat Logger


USAGE
```js
const { Client } = require('discord.js');
const client = new Client();

const Logger = require('discord-chat-logger');
const logger = new Logger(client, {
    pm: {
        log: true,
        logImage: true
    },
    group: {
        log: true,
        logImage: true
    },
    server: {
        log: true,
        logImage: true
    }
});
```
