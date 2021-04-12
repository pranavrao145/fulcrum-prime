const Discord = require("discord.js");

module.exports = {
    name: "help",
    alias: ["h"],
    description: "Displays help message",

    execute(message) {
        let channel = message.channel;

        const embed = new Discord.MessageEmbed()
            .setTitle('Fulcrum Prime - Help')
            .setDescription('A breakdown of all the features and commands I offer.')
            .addFields(
                { name: 'PREFIX', value: 'My prefix is **f!**. \nYou can use any of the commands below with this prefix.' },
                { name: '\u200B', value: '\u200B' },
                { name: 'FEATURES', value: "List of passive features I offer:" },
                { name: 'Voice Channel Roles', value: 'Admins can create a role that matches the name of a voice channel on your server. If anyone joins that voice channel, I will give them the corresponding role. This means you can now @ everyone in a voice channel by mentioning the name of that voice channel.' },
                { name: 'Offline Roles', value: 'Admins can create a role "@offline", which I will automatically assign to people who are offline or invisible. This means you can now @ everyone who is offline using @offline. Although the process is automatic, admins can force-update everyone\'s offline roles using f!updateoffline.' },
                { name: 'Date Channel', value: 'Admins can create a voice channel with the 📅 emoji in the name. If this is done, every day, I will automatically update this everyday to reflect the current date in EST. I suggest making this voice channel read-only (everyone can see, but no one can join). Although this process is automatic, admins can force a date update using f!updatedate.' },
                { name: '\u200B', value: '\u200B' },
                { name: 'COMMANDS', value: "List of commands I offer:" },
                { name: 'help', value: 'Alias: h\nDisplays this help message.' },
                { name: 'define {word}', value: 'Alias: df\nDefines the English word.' },
                { name: 'translate {2 letter code of language} {word/phrase}', value: 'Alias: tr\nTranslates given word/phrase to the language specified.' },
                { name: 'random_numbers {start number} {end number}', value: 'Alias: rn\nPicks a random number in the range specified.' },
                { name: 'random_words {num}', value: 'Alias: rw\nGenerates the amount of random words specified. Not specifying a number will generate one word.' },
                { name: 'polling {on/off}', value: 'Alias: pm\nOnly admins can use this command. This command will give/take away the can-vote role from users in the server. For this feature to work properly, a can-vote role must exist, and polling channels must be restricted to only those who have the can-vote role.' },
                { name: 'clearvoice {voice_channel_role}', value: 'Alias: cv\nOnly admins can use this command. This command will clear the voice channel associated with the role specified. For this feature to work properly, voice channel roles must be set up (see above).' },
                { name: 'movevoice {from_voice_channel_role} {to_voice_channel_role}', value: 'Alias: mv\nOnly admins can use this command. This command will move all users in the voice channel associated with the first role to the voice channel associated with the second. For this feature to work properly, voice channel roles must be set up (see above).' }

            )
            .setTimestamp()


        channel.send(embed);
    }
}