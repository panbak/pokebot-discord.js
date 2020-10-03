const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    name: 'pokemon',
    usage: ' <pokemon-name>',
    description: 'Use it to get stats about a pokemon.',
    available_pokemon: ['bulbasaur', 'squirtle', 'charmander'],
    execute(message, args){
        if(!args[0]){
            const embed = new MessageEmbed()
                .setTitle('Choose your pokemon')
                .setDescription('select from bulbasaur, squirlte and charmander by writing !pokemon <pokemon-name>')
                .setImage('https://lh3.googleusercontent.com/proxy/Nx1p1eIyu2K7y-B9-QtNIbtlQddZEysGXSL8b_j9DKHcCujspdH9cZ5RBdfD4pcJmfBlRPMuv75Q-ANAoS7pQk66swnE2fV8zD1dvkLAGpMqWl9B144oEeVBP58o0_7Q9qh9mhGXY5lCEKVI7pBjwHswEiNEBTXe')
                .addFields(
                    { name: 'bulbasaur', value: 'grass and poisson', inline: true },
                    { name: 'squirlte', value: 'water', inline: true },
                    { name: 'charmander', value: 'fire', inline: true },
                )
            message.channel.send(embed);
            return;
        }
        let pokemon_name = args[0];
        if(!this.available_pokemon.includes(pokemon_name.toLowerCase())){
            message.channel.send("Please choose one of the available pokemon.");
            return;
        }
        fetch("https://pokeapi.co/api/v2/pokemon/"+pokemon_name).then(res => res.json()).then(data=>{
            let pokemon = {
                name: data.name,
                image: data.sprites.other['official-artwork']['front_default'],
                types: data.types.map((type) => type.type.name).join(' and '),
                id: data.id,
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
            };
            const embed = new MessageEmbed()
                .setTitle(message.author.username+', you selected '+pokemon.name)
                .setColor('#ffffff')
                .setDescription(`${pokemon.name} is your first pokemon on your journey to catch them all.`)
                .setImage(pokemon.image);
            message.reply('excellent choice!');
            message.channel.send(embed);
        }).catch(err => {
            message.channel.send("Please choose one of the available pokemon.");
            return;
        });
    }
}
