# Discord Chat Logger

Standard usage

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

Usage with MongoDB

```js
const { Client } = require('discord.js');
const client = new Client();

const Logger = require('discord-chat-logger');
const logger = new Logger(client, {
    mongo: {
        enabled: true,
        url: `YOUR_MONGODB_CONNECT_URL`
    },
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