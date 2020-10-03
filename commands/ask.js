const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'ask',
    usage: ' <question-message>',
    description: 'Use it to ask a yes/no question.',
    execute(message, args){
        if(!args[0]){
            message.reply('You should ask a question..');
            return;
        }
        if (message.member.nickname) {
            var pollCreator = message.member.nickname;
        } else {
            var pollCreator = message.author.username;
        }
        const Embed = new MessageEmbed()
            .setColor(0xffc300)
            .setTitle("📋 Poll - By @" + pollCreator)
            .setDescription(args.slice(0).join(" "))
            .setThumbnail(message.author.avatarURL())
            .addField("Key", "👍 = Yes!\n👎 = No!");
        message.channel.send(Embed).then((messageToReact) => {
            messageToReact.react("👍");
            messageToReact.react("👎");
            message.delete({ timeout: 500 }).catch(console.error);
        });
    }
}
