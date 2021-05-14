const Discord = require("discord.js");

module.exports = {
    name: "start",
    description: "Sends a start message for Fulcrum Prime.",
    execute(message=null, sendChannel=null) {
        let channel; 
        if (message !== null) {
            channel = message.channel;
        }
        else if (sendChannel !== null) {
            channel = sendChannel;
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#FFFCF4")
            .setTitle("Fulcrum Prime - Start")
            .setDescription("Thanks for adding Fulcrum Prime! Read below to get started!")
            .addFields(
                {
                    name: "Prefix",
                    value:
                    "Fulcrum's prefix is **f!**. \nYou can use any of Fulcrum Prime's commands with this prefix.",
                },
                {
                    name: "Help",
                    value: "To see a full list of Fulcrum's commands, run f!help.",
                },
                {
                    name: "Services",
                    value: "To see a full list of the services Fulcrum Prime offers and how to set them up, run f!services.",
                },
                {
                    name: "Support Server",
                    value: "To get the link to our support server, run f!supportserver.",
                },
            )
            .setTimestamp();

        channel.send(embed).catch();

    }
}
