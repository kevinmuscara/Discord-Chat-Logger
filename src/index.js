const Controller = require('./controller');

class Logger {
    /**
     * @param {Client} client 
     * @param {JSON} options 
     */
    constructor(client, options = {}) {
        if(!client) {
            Controller.logError(`Missing argument: client`);
        } else {
            this.client = client;
        }

        if(!options) {
            this.options = { pm: true, group: true, server: true, file: null }
        } else {
            this.options = options;
        }

        this.init();
    }

    init() {
        this.client.on('ready', async() => {
            Controller.logInfo('Chat Logger ready!');
        });

        this.client.on('message', async(message) => {
            if(message.author.bot) return;
            if(message.channel.type === "dm") {
                if(this.options.pm.log) {
                    if(message.attachments.first()) {
                        if(this.options.pm.logImage) {
                            Controller.logPm(
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        Controller.logPm(
                            message.author.username,
                            message.content
                        );
                    }
                } else {}
            } else if(message.channel.type === "group") {
                if(this.options.group.log) {
                   if(message.attachments.first()) {
                        if(this.options.group.logImage) {
                            Controller.logGroup(
                                message.channel.name,
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        Controller.logGroup(
                            message.channel.name,
                            message.author.username,
                            message.content
                        );
                    }
                } else {}
            } else {
                if(this.options.server.log) {
                    if(message.attachments.first()) {
                        if(this.options.server.logImage) {
                            Controller.logServer(
                                message.guild.name,
                                message.channel.name,
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        Controller.logServer(
                            message.guild.name,
                            message.channel.name,
                            message.author.username,
                            message.content
                        );
                    }
                } else {}
            }
        });
    }
}

module.exports = Logger;