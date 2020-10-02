const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
});

client.once('ready', () => {
    console.log('pokebot is online!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    if(client.commands.has(command)){
        client.commands.get(command).execute(message, args, client.commands);
    }
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`:wave: Hello ${member}, welcome to ${member.guild.name} region. Type !help to see command list.`);
  });

client.login(process.env.TOKEN);

