# Discord Chat Logger

Effecient discord event, and chat logger for Discord v13 API Clients.

Uses PostgreSQL for database queries.

### Usage

```js
const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
})

const logger, { getGuilds, getMessages, getEvents } = require('discord-chat-logger')
logger(client, {
  debug: true,
  db: {
    host: '127.0.0.1', // PostgreSQL Server Address
    port: 5520, // PostgreSQL Server Port
    user: 'postgres', // PostgreSQL DB Username
    password: 'postgres' // PostgreSQL DB Password
  }
})

getGuilds().then(res => console.log(res)) // Returns Guilds database query
getMessages().then(res => console.log(res)) // Returns Messages database query
getEvents().then(res => console.log(res)) // Returns Events database query

client.login('DISCORD_BOT_TOKEN')
```