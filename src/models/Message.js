const { writeFileSync } = require('fs');
const messages = require('./messages.json');

module.exports.createMessage = function(message, ID) {
    return new Promise((resolve, reject) => {
        const id = { ID };
        message = { ...id, ...message };
        messages.push(message);
        writeFileSync('./messages.json', JSON.stringify(messages), 'utf8', (err) => {});
    });
}