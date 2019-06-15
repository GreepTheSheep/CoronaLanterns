
const Discord = require('discord.js');
function days_until_frozen_2(){
    var distance = milliseconds_until_frozen_2()
    var days = Math.floor( milliseconds_until_frozen_2()/(1000*60*60*24) );
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
function milliseconds_until_frozen_2(){
    return Date.parse("November 22 2019 00:00:00 GMT-0400") - Date.parse(new Date());
}

//Frozen II countdown
function frozen_2_countdown(client,channel_id) {
    const channel = client.channels.get(channel_id);
    if (!channel) {
        console.log(`Channel: ${channel_id} cannot be found`);
        return;
    }
    channel.setName(`${days_until_frozen_2()}`).catch(err=>console.log(err));

    var x = setInterval(function() {
        const text = `${days_until_frozen_2()}`
        channel.setName(`${text}`).catch(err=>console.log(err));

        if (milliseconds_until_frozen_2() < 0) {
            clearInterval(x);
            channel.setName(`FROZEN II IS OUT!!`).catch(err=>console.log(err));
        }
    }, 1000);
}

module.exports = frozen_2_countdown;