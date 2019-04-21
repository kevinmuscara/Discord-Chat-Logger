Discord Chat Logger

Discord chat logger is a simple and easy to use node.js module that allows your bot to store messages sent in group chats, dms, and servers into a text file. the bot even has a feature to download images!


Dependencies

`discord.js` library for connecting to the bot
`request` library for downloading images
`fs` library for creating and writing to files
`colors` library for making the console look colorful


Installation

**Node.js 6.0.0 or newer is required**. to install the discord chat logger package type the following into terminal
`npm install discord-chat-logger`


Example Usage

```js
const logger = require('discord-chat-logger');
var token = "secret_token";
var id = "bot_id";
var path = "path_to_where_you_want_files_stored";
 
logger.start(token, id, path);```
