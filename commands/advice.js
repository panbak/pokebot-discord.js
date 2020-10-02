const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    name: 'advice',
    usage: '',
    description: 'Use it to get life advice.',
    execute(message, args){
        fetch("https://api.adviceslip.com/advice").then(res => res.json()).then(data=>{
            const embed = new MessageEmbed().setColor('#0099ff').setTitle(data.slip.advice);
            message.channel.send(embed);
        }).catch(err => {
            message.channel.send("Sorry, I can't think something right now..");
            return;
        });
    }
}
