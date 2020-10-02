module.exports = {
    name: 'unban',
    usage: ' @username',
    description: 'Use this command to remove a ban.',
    execute(message, args){
    
        if (!message.member.hasPermission('BAN_MEMBERS')){
            message.reply("You do NOT have permission to ban members!");
            reutrn;
        }
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            console.log(member);
            message.guild.members.unban(member.id).then(()=>{
                message.channel.send(`${user.tag} 's ban has been revoke.`);
            });
        } else {
            message.reply("You didn't mention the user to unban!");
        }
    }
}