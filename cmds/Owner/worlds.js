const Discord = require('discord.js')
const fs = require('fs')

function errorgenerating(message, err, date, time, logchannel) {
    message.channel.send('Error during generating files, see <#589337734754336781> for more details').then(m=>m.delete(15000))
    const errorlog = `Error during generating files: ${err}`
    logchannel.send(errorlog)
    console.log(`[${date()} - ${time()}] ${errorlog}`)
}

function worlds(message, client, prefix, date, time, logchannel) {
    if (message.author.id === '330030648456642562'  || message.author.id === "460348027463401472") {
        if (message.content.startsWith(prefix + 'createworld') || message.content.startsWith(prefix + 'addworld')) {
            try {
                let args = message.content.split(" ")
                args.shift()
                if (args.length < 1) return message.react('❌')
                const path = `./data/movies/${args.join("-").toLowerCase()}`
                message.delete(15000)
                message.channel.send('Generating files...')
                .then(m=>{
                    m.delete(15000)
                    fs.writeFile(path+'_pics.json', '[]', function(err){ if (err) {errorgenerating(message, err, date, time, logchannel)}})
                    fs.writeFile(path+'_quotes.json', '[]', function(err){ if (err) {errorgenerating(message, err, date, time, logchannel)}})
                    m.edit('Files successfully generated!')
                    const filesoklog = `New world added by owner: ${args[0].charAt(0).toUpperCase() + args.join(" ").slice(1)}`
                    logchannel.send(filesoklog)
                    console.log(`[${date()} - ${time()}] ${filesoklog}`)
                })
                .catch(err=>{
                    errorgenerating(message, err, date, time, logchannel)
                })
            } catch(err) {
                errorgenerating(message, err, date, time, logchannel)
            }
        }
    }
}

module.exports = worlds
