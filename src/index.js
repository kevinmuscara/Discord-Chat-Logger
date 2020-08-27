const Controller = require('./controller');
const mongoose = require('mongoose');

class Logger {
    constructor(client, options = {}) {
        if(!client) {
            Controller.logError(`Missing argument: client`);
        } else {
            this.client = client;
        }

        if(!options) {
            this.options = {
                mongo: {
                    enabled: false,
                    url: null
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
            }
        } else {
            this.options = options;
        }

        if(options.mongo.enabled) {
            if(options.mongo.url) {
                try {
                    mongoose.connect(options.mongo.url, {
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }).then(() => {
                        Controller.logInfo(`DB connected`);
                    });
                } catch(error) {
                    Controller.logError(error);
                }
            } else {
                Controller.logError(`Missing argument: URL`);
            }
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
                            if(this.options.mongo.enabled) {
                                Controller.dbLogPm(
                                    message.author.username,
                                    message.attachments.first().url
                                );
                            } else {}

                            Controller.logPm(
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        if(this.options.mongo.enabled) {
                            Controller.dbLogPm(
                                message.author.username,
                                message.content
                            );
                        } else {}

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
                            if(this.options.mongo.enabled) {
                                Controller.dbLogGroup(
                                    message.author.username,
                                    message.attachments.first().url
                                );
                            } else {}

                            Controller.logGroup(
                                message.channel.name,
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        if(this.options.mongo.enabled) {
                            Controller.dbLogGroup(
                                message.author.username,
                                message.attachments.content
                            );
                        } else {}

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
                            if(this.options.mongo.enabled) {
                                Controller.dbLogServer(
                                    message.author.username,
                                    message.attachments.first().url
                                );
                            } else {}

                            Controller.logServer(
                                message.guild.name,
                                message.channel.name,
                                message.author.username,
                                message.attachments.first().url
                            );
                        } else {}
                    } else {
                        if(this.options.mongo.enabled) {
                            Controller.dbLogServer(
                                message.author.username,
                                message.content
                            );
                        } else {}

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