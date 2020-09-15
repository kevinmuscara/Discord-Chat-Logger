const { Message } = require('discord.js');
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    type: String,
    author: String,
    message: String
});

module.exports = mongoose.model('Messages', MessageSchema);