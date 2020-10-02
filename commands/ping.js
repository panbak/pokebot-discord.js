module.exports = {
    name: 'ping',
    usage: '',
    description: 'Check if bot is reading.',
    execute(message, args){
        message.channel.send('pong!');
    }
}