# Discord Chat Logger

Usage

```js
const { Client } = require('discord.js');
const client = new Client();

const Logger = require('discord-chat-logger');
const logger = new Logger(client, {
    pm: true,
    group: true,
    server: true,
    mongo: null
});
```

Usage with mongo
```js
const { Client } = require('discord.js');
const client = new Client();

const Logger = require('discord-chat-logger');
const logger = new Logger(client, {
    pm: true,
    group: true,
    server: true,
    mongo: 'MONGO DB URL'
});
```