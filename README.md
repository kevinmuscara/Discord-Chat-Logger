# Discord Chat Logger
Discord chat logger is a simple and easy to use node.js module that allows your bot to store messages sent in group chats, dms, and servers into a text file. the bot even has a feature to download images!


## Dependencies

* `discord.js` library for connecting to the bot
* `request` library for downloading images
* `fs` library for creating and writing to files
* `colors` library for making the console look colorful

## Installation

**Node.js 6.0.0 or newer is required.**
to install the discord  chat logger package type the following into terminal `npm install discord-chat-logger`
If you need any help setting the bot up, add me on discord and ask `Kefin#7273`

## Example Usage

The img field is boolean, put either true or false. True if you want the bot to download images, false if you don't

```js
const logger = require('discord-chat-logger');

logger.connect("Start Message", "bot_token");

logger.logServer("./path/to/serverFiles/", true, 193415441350262784);
logger.logPm("./path/to/pmFiles/", true, 193415441350262784);
logger.logGroup("./path/to/groupFiles", true, 193415441350262784);

```
