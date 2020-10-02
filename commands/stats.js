const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
module.exports = {
    name: 'stats',
    usage: ' <pokemon-name>',
    description: 'Use it to get stats about a pokemon.',
    execute(message, args){
        let pokemon_name = args[0].replace(/ /g,'');
        if(!pokemon_name.length>0){
            message.channel.send("make sure not to add spaces before the pokemon name!");
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
            .setTitle(pokemon.name)
            .setDescription(`${pokemon.name} is a ${pokemon.types} type pokemon.`)
            .setImage(pokemon.image)
            .addFields(
                { name: 'hp', value: pokemon.hp, inline: true },
                { name: 'attack', value: pokemon.attack, inline: true },
                { name: 'defense', value: pokemon.defense, inline: true },
            )
            message.channel.send(embed);
        }).catch(err => {
            message.channel.send("I don't think such pokemon exists..");
            return;
        });
    }
}
