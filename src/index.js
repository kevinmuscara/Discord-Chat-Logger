const DATA    = require('./models/Message');
const Message = require('./models/MessageSchema');
const logger  = require('./log/index');

class Logger {
    constructor(client, options = {}) {
        if(!client) {
            logger.logErr(`Client argument is invalid`);
        } else {
            this.client = client;
        }

        if(!options) {
            this.options = {
                pm: true,
                group: true,
                server: true,
                mongo: null
            }
        } else {
            this.options = options;
        }

        if(options.mongo !== null) {
            try {
                require('mongoose').connect(options.mongo, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }).then(() => {
                    logger.log({ type: 'SUCCESS', message: 'mongoDB connected'});
                });
            } catch(error) {
                logger.logErr(`error connected to mongoDB`);
            }
        }

        this.init();
    }

    init() {
        this.client.on('ready', async() => {
            logger.log({ type: 'SUCCESS', message: `Logger Connected`});
        });

        this.client.on('message', async(message) => {
            if(message.author.bot) return;
            if(message.channel.type === "dm") {
                if(this.options.pm) {
                    if(message.attachments.first()) {
                        DATA.createMessage({ username: message.author.username, message: message.attachments.first().url}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ type: 'PM', author: message.author.username, message: message.attachments.first().url }).save();
                        }
                        logger.log({ type: 'PM', message: `${message.author.username}: ${message.attachments.first().url}`});
                    } else {
                        DATA.createMessage({ username: message.author.username, message: message.content}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ type: 'PM', author: message.author.username, message: message.content }).save();
                        }
                        logger.log({ type: 'PM', message: `${message.author.username}: ${message.content}`});
                    }
                }   
            }
            else if(message.channel.type === "group") {
                if(this.options.group) {
                    if(message.attachments.first()) {
                        DATA.createMessage({ channel: message.channel.name, username: message.author.username, message: message.attachments.first().url}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ channel: message.channel.name, type: 'GROUP', author: message.author.username, message: message.attachments.first().url }).save();
                        }
                        logger.log({ type: 'GROUP', message: `(${message.channel.name}) ${message.author.username}: ${message.attachments.first().url}`});
                    } else {
                        DATA.createMessage({ channel: message.channel.name, username: message.author.username, message: message.content}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ channel: message.channel.name, type: 'GROUP', author: message.author.username, message: message.content }).save();
                        }
                        logger.log({ type: 'GROUP', message: `(${message.channel.name}) ${message.author.username}: ${message.content}`});
                    }
                }
            }
            else {
                if(this.options.server) {
                    if(message.attachments.first()) {
                        DATA.createMessage({ guild: message.guild.name, channel: message.channel.name, username: message.author.username, message: message.attachments.first().url}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ guild: message.guild.name, channel: message.channel.name, type: 'SERVER', author: message.author.username, message: message.attachments.first().url }).save();
                        }
                        logger.log({ type: 'SERVER', message: `[${message.guild.name}] (${message.channel.name}) ${message.author.username}: ${message.attachments.first().url}`});
                    } else {
                        DATA.createMessage({ guild: message.guild.name, channel: message.channel.name, username: message.author.username, message: message.content}, message.id);
                        if(this.options.mongo !== null) {
                            new Message({ guild: message.guild.name, channel: message.channel.name, type: 'SERVER', author: message.author.username, message: message.content }).save();
                        }
                        logger.log({ type: 'SERVER', message: `[${message.guild.name}] (${message.channel.name}) ${message.author.username}: ${message.content}`});
                    }
                }
            }
        });
    }
}

module.exports = Logger;