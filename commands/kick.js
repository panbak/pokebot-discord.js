module.exports = {
    name: 'kick',
    usage: ' @username',
    description: 'Use it to kick someone from the server.',
    execute(message, args){
    
        if (!message.member.hasPermission('KICK_MEMBERS')){
            message.reply("You do NOT have permission to kick members!");
            return;
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.kick(`You have been kicked by ${message.author.tag}`)
                .then(() => {
                    message.channel.send(`${user.tag} has been kicked.`);
                })
                .catch(err => {
                    message.reply('I was unable to kick the member');
                    console.error(err.message);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to kick!");
        }
    }
}