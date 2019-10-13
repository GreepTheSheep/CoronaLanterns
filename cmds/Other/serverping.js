const Discord = require('discord.js')

async function serverping(message, client, prefix){
    if(message.content.startsWith(prefix + "ping")) {
        let embed = new Discord.RichEmbed
        embed.setTitle(`Pong!`)
            .setDescription(`❓: ${m.createdTimestamp - message.createdTimestamp}ms\n💓: ${Math.round(client.ping)}ms`)

        const m = await message.channel.send("Pong?");
        m.edit(embed);
      }
}

module.exports = serverping