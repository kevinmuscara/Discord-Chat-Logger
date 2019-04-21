const Discord = require('discord.js');
const fs = require('fs');
const request = require('request');
const client = new Discord.Client();
const colors = require('colors');

function logging(i, p) {
    client.on('message', async message => {
        if(message.author.id === i) {} else {
            if(message.channel.type === "dm") {
                if(message.attachments.first()) {
                    let url = message.attachments.first().url;
                    download(url, p);
                } else {
                    let fileName = p + message.author.id + '.txt';
                    let fileContent = message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            }
            else if(message.channel.type === "group") {
                if(message.attachments.first()) {
                    let url = message.attachments.first().url;
                    download(url, p);
                } else {
                    let fileName = p + message.guild.id + '.txt';
                    let fileContent = '[' + message.guild.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            }
            else {
                if(message.attachments.first()) {
                    let url = message.attachments.first().url;
                    download(url, p);
                } else {
                    let fileName = p + message.guild.id + '.txt';
                    let fileContent = '[' + message.guild.name + '] ' + message.author.username + ': ' + message.content + '\n';
                    lo(fileName, fileContent);
                }
            }
        }
    });
}

function lo(name, content) {
    console.log(content);
    fs.appendFileSync(name, content, 'utf-8');
}

function download(url, path) {
    let p = path + makeRandom(10) + '.png';
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(p));
    console.log(p);
}

function makeRandom(length) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports.start = function(token, id, path) {
    client.login(token);
    client.on('ready', () => {
        console.log("Discord Chat Logger is now functioning!".bgGreen.black);
        logging(id, path);
    });
};