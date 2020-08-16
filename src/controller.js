const colors = require('colors');

/**
 * @param {String} error 
 */
module.exports.logError = function(error) {  console.log('[ERROR]'.bgRed.white + ` ${error}`.bgBlack.white); };

/**
 * @param {String} message 
 */
module.exports.logInfo = function(message) { console.log('[INFO]'.bgCyan.white + ` ${message}`.bgBlack.white); };

/**
 * @param {String} author 
 * @param {String} message 
 */
module.exports.logPm = function(author, message) { console.log('[PM]'.bgBlue.white + ` ${author}: ${message}`.bgBlack.white); };

/**
 * @param {String} group 
 * @param {String} author 
 * @param {String} message 
 */
module.exports.logGroup = function(group, author, message) { console.log('[GROUP]'.bgGreen.white + ` [${group}] ${author}: ${message}`.bgBlack.white); };

/**
 * @param {String} server 
 * @param {String} channel 
 * @param {String} author 
 * @param {String} message 
 */
module.exports.logServer = function(server, channel, author, message) { console.log('[SERVER]'.bgMagenta.white + ` [${server}] [${channel}] ${author}: ${message}`.bgBlack.white); };