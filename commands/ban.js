module.exports = {
    name: 'ban',
    usage: ' @username',
    description: 'Use it to ban someone for 1 day.',
    execute(message, args){
    
        if (!message.member.hasPermission('KICK_MEMBERS')){
            message.reply("You do NOT have permission to ban members!");
            return;
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (member) {
                member.ban({
                    reason: 'The member was a bad pokemon trainer!',
                    days: 1
                })
                .then(() => {
                    message.channel.send(`${user.tag} has been banned.`);
                })
                .catch(err => {
                    message.reply('I was unable to ban the member');
                    console.error(err.message);
                });
            } else {
                message.reply("That user isn't in this guild!");
            }
        } else {
            message.reply("You didn't mention the user to ban!");
        }
    }
}