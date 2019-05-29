const Discord = require("discord.js");

function say(message, client, prefix) {

    if (message.content.startsWith(prefix + 'say')) {
        if (message.author.roles.find(r => r.name === "KEY (Corona's Lanterns)") || message.author.id == 330030648456642562) {
            let args = message.content.split(" ");
            args.shift();
            if (args.length < 1) {
                message.delete();
                client.users.get(message.author.id).send('__Input your message!__\n\nExample: `!say Hello everyone!`');
            } else {
                message.delete();
                message.channel.send(`${args.join(" ")}`)
            }
        } else return;
    }
}

module.exports = say;