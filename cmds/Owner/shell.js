const { Attachment } = require('discord.js');
const Discord = require('discord.js');
const shell = require('shelljs');
const fs = require('fs');

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

function command(message, client, prefix) {
    if (message.content.startsWith(prefix + 'ssh')) {
        if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472"){
        try {
            let args = message.content.split(" ")
            args.shift()
            if (args.length < 1) return message.react('❌');
            message.channel.startTyping()
            shell.exec(args.join(' '), function(code, stdout, stderr) {
                if (stdout.length > 1024 && stdout.length < 1950 || stderr.length > 1024 && stderr.length < 1950) return message.reply(`Output:\n\`\`\`${stdout}${stderr}\`\`\``).then(m=>message.channel.stopTyping(true));
                
                if (stdout.length > 1950 || stderr.length > 1950) return fs.writeFile('./logs/shelleval.log', `Command: ${args.join(' ')}\nExit code: ${code}\n\n\nOutput:\n\n${stdout}${stderr}`, 'utf8', (err) => {
                        if (err) return function(){
                            console.log(err);
                            message.reply(`FS error: ${err}`)
                        }
                        const attachment = new Attachment('./logs/shelleval.log')
                        message.reply('Output is more than 2000 characters, see attachment', attachment)
                        .then(m=>message.channel.stopTyping(true))
                    })
                
                let embed = new Discord.RichEmbed()
                    embed.addField("Command:", args.join(' '))
                    .addField('Program output:', `\`\`\`${stdout}${stderr}\`\`\``)
                    .setFooter('Exit code: ' + code)
            message.reply(embed)
            .then(m=>message.channel.stopTyping(true));
            });
        } catch (err) {
            const args = message.content.split(" ");
            args.shift();
            message.reply(`EVAL **__ERROR__**\n\`\`\`xl\n${args.join(" ")}\`\`\`\nNode Result: \`${clean(err)}\``);
            message.channel.stopTyping(true)
        }
        }else return;
    }
}

module.exports = command;
