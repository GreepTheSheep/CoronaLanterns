// All currency commands

const cur_json = require('./cur.json')

function currency_cmds(message, client, prefix, functiondate, functiontime, cooldowns, getlogchannel, dbl, guildPrefix, userLang, lang, langtext){

    const claim = require('./claim.js')
    claim(message, client, prefix, cooldowns, dbl, cur_json);

    const balance = require('./balance.js')
    balance(message, client, prefix, cooldowns, cur_json);

}

module.exports = currency_cmds;