const colors = require('colors');

module.exports.log = function(content = {}) {
    console.log(`[${content.type}]`.bgYellow.black + ` ${content.message}`);
}

module.exports.logErr = function(err) {
    console.log(`[ERR]`.bgRed.black + ` ${err}`.white);
}