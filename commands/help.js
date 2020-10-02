module.exports = {
    name: 'help',
    usage: '',
    description: 'Use it to list all commands.',
    execute(message, args, commands){
        let helpList = '';
        commands.forEach(command => {
            helpList+='!'+command.name+command.usage+'-'+command.description+'\n';
        });
        message.channel.send(helpList);
    }
}