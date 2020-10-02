const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'about',
    usage: '',
    description: 'Show info about the bot.',
    execute(message, args){
        //if(message.member.roles.cache.has('761600490965303297')){ // role = message.guild.roles.cache.find(r => r.name === 'moderator')
        //    message.channel.send('by a moderator');
           // message.member.roles.add('761600490965303297'); //add moderator role to member or remove()... can do add(role)
        //}
        const embed = new MessageEmbed()
        .setTitle('PokeBot')
        .setURL('https://github.com/panbak/pokebot-discordjs')
	    .setAuthor('panbak', 'https://avatars3.githubusercontent.com/u/16959986?s=460&u=a66b2b7fcaa35bb67cffa3a78776705dffab9883&v=4', 'https://github.com/panbak')
        .setDescription('pokebot is a pokemon themed discord bot.');
        
        message.channel.send(embed);
    }
}