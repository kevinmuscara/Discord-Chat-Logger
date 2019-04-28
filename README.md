# Discord Chat Logger
Discord chat logger is a simple and easy to use node.js module that allows your bot to store messages sent in group chats, dms, and servers into a text file. the bot even has a feature to download images!


## Dependencies

* `discord.js` library for connecting to the bot
* `request` library for downloading images
* `fs` library for creating and writing to files
* `colors` library for making the console look colorful
* `ftp-deploy` library for uploading files to the web

## Installation

**Node.js 6.0.0 or newer is required.**
to install the discord  chat logger package type the following into terminal `npm install discord-chat-logger`
If you need any help setting the bot up, add me on discord and ask `Kefin#7273`

## Example Usage

Example usage for logging pm, group, and server messages and images. 

vars:
* `path` is the path to where you want the files to be stored
* `downloadImage` is boolean(true or false)
* `id` is the id of the bot
```js
const logger = require('discord-chat-logger');

logger.connect("Start Message", "bot_token");
logger.logPm(path, downloadImage, id);
logger.logGroup(path, downloadImage, id);
logger.logServer(path, downloadImage, id);

```

Example usage for logging and uploading messages to a website

vars:
* `path` is the path to where you want the files to be stored
* `downloadImage` is boolean(true or false)
* `id` is the id of the bot
* `config` is the settings for deploying files to the website

```js
const logger = require("discord-chat-logger");
let config = {
    user: "user",
    password: "password",
    host: "ftp.someserver.com",
    port: 21,
    localRoot: __dirname + '/local-folder', //Path to the local folder that the messages are logged into
    remoteRoot: '/public_html/remote-folder/', //Path to the directory on website you want to upload fiels to  
};

logger.connect("Start Message", "bot_token");
logger.uploadPmLog(path, downloadImage, id, config);
logger.uploadGroupLog(path, downloadImage, id, config);
logger.uploadServerLog(path, downloadImage, id, config);
```
