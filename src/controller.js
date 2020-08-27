const colors = require('colors');
const Message = require('./Message');

module.exports.dbLogPm = function(author, message) {
    const msg = new Message({
        type: 'PM',
        author: `${author}`,
        message: `${message}`
    });

    msg.save();
};

module.exports.dbLogGroup = function(author, message) {
    const msg = new Message({
        type: 'GROUP',
        author: `${author}`,
        message: `${message}`
    });

    msg.save();
};

module.exports.dbLogServer = function(author, message) {
    const msg = new Message({
        type: 'SERVER',
        author: `${author}`,
        message: `${message}`
    });

    msg.save();
};

module.exports.logError = function(error) {  console.log('[ERROR]'.bgRed.white + ` ${error}`.bgBlack.white); };
module.exports.logInfo = function(message) { console.log('[INFO]'.bgCyan.white + ` ${message}`.bgBlack.white); };
module.exports.logPm = function(author, message) { console.log('[PM]'.bgBlue.white + ` ${author}: ${message}`.bgBlack.white); };
module.exports.logGroup = function(group, author, message) { console.log('[GROUP]'.bgGreen.white + ` [${group}] ${author}: ${message}`.bgBlack.white); };
module.exports.logServer = function(server, channel, author, message) { console.log('[SERVER]'.bgMagenta.white + ` [${server}] [${channel}] ${author}: ${message}`.bgBlack.white); };