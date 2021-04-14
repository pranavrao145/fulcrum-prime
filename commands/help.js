const Discord = require("discord.js");

module.exports = {
    name: "help",
    alias: ["h"],
    description: "Displays help message",

    execute(message) {
        let channel = message.channel;

        const embed = new Discord.MessageEmbed()
            .setTitle('Fulcrum Prime - Help')
            .setDescription('A breakdown of all the commands offered by Fulcrum.')
            .addFields(
                {
                    name: 'PREFIX',
                    value: 'My prefix is **f!**. \nYou can use any of the commands below with this prefix.'
                },
                {name: '\u200B', value: '\u200B'},
                {name: 'COMMANDS', value: "List of commands Fulcrum offers:"},
                {name: 'help', value: 'Alias: h\nDisplays this help message.'},
                {name: 'services', value: 'Alias: s\nDisplays a help message detailing all the services Fulcrum offers.'},
                {name: 'define {word}', value: 'Alias: df\nDefines the English word.'},
                {
                    name: 'translate {2 letter code of language} {word/phrase}',
                    value: 'Alias: tr\nTranslates given word/phrase to the language specified.'
                },
                {
                    name: 'random_numbers {start number} {end number}',
                    value: 'Alias: rn\nPicks a random number in the range specified.'
                },
                {
                    name: 'random_words {num}',
                    value: 'Alias: rw\nGenerates the amount of random words specified. Not specifying a number will generate one word.'
                },
                {
                    name: 'polling {on/off}',
                    value: 'Alias: pm\nOnly admins can use this command. This command will give/take away the can-vote role from users in the server. For this feature to work properly, a can-vote role must exist, and polling channels must be restricted to only those who have the can-vote role.'
                },
                {
                    name: 'clearvoice {voice_channel_role}',
                    value: 'Alias: cv\nOnly admins can use this command. This command will clear the voice channel associated with the role specified. For this feature to work properly, voice channel roles must be set up (see above).'
                },
                {
                    name: 'movevoice {from_voice_channel_role} {to_voice_channel_role}',
                    value: 'Alias: mv\nOnly admins can use this command. This command will move all users in the voice channel associated with the first role to the voice channel associated with the second. For this feature to work properly, voice channel roles must be set up (see above). **Note:** attempting to move someone to a voice channel which they do not have permission to access will give them *temporary access* to that channel and still move them. Their access will be revoked upon leaving the voice channel.'
                }
            )
            .setTimestamp()


        channel.send(embed);
    }
}