const Discord = require("discord.js");

module.exports = {
    name: "services",
    alias: ["s"],
    description:
    "Displays a help message detailing all the services Fulcrum offers.",

    execute(message) {
        
            let channel = message.channel;

            const embed = new Discord.MessageEmbed()
                .setColor("#FFFCF4")
                .setTitle("Fulcrum Prime - Services")
                .setDescription("A breakdown of all the services offered by Fulcrum.")
                .addFields(
                    {
                        name: "PREFIX",
                        value:
                        "My prefix is **f!**. \nYou can use any command specified below with this prefix.",
                    },
                    { name: "\u200B", value: "\u200B" },
                    { name: "SERVICES", value: "List of services offered by Fulcrum:" },
                    {
                        name: "Voice Channel Roles",
                        value:
                        'Admins can run "f!integrate vcroles" to set up voice channel roles. If anyone joins a voice channel, Fulcrum will give them a role with the same name as that voice channel. This means you can @ everyone in a voice channel by mentioning the name of that voice channel. While this process is automatic, admins can force-update everyone\'s voice channel roles by running f!update vcroles. Note that voice channel roles are case sensitive.', },
                    {
                        name: "Date Channel",
                        value:
                        'Admins can run f!integrate datechannel [voice channel role] to set this feature up. If this is done, every day, Fulcrum will automatically update the name of the channel associated with the role specified everyday to reflect the current date in EST. Recommended to make voice channel read-only (everyone can see, but no one can join). Although this process is automatic, admins can force a date update using f!update datechannel. **NOTE: recommended to run "f!integrate vcroles" just before setting this feature up.**',
                    },
                    {
                        name: "Member Count Channel",
                        value:
                        'Admins can run f!integrate membercount [voice channel role] to set this feature up. If this is done, Fulcrum will automatically update the name of the channel associated with the role specified to reflect the number of members currently in your server. Recommended to make voice channel read-only (everyone can see, but no one can join). Although this process is automatic, admins can force a member count update using f!update membercount. **NOTE: recommended to run "f!integrate vcroles" just before setting this feature up.**',
                    },
                    {
                        name: "Channel Count Channel",
                        value:
                        'Admins can run f!integrate channelcount [voice channel role] to set this feature up. If this is done, Fulcrum will automatically update the name of the channel associated with the role specified to reflect the number of channels in your server. Recommended to make voice channel read-only (everyone can see, but no one can join). Although this process is automatic, admins can force a channel count update using f!update channelcount. **NOTE: recommended to run "f!integrate vcroles" just before setting this feature up.**',
                    },
                )
                .setTimestamp();

            channel.send(embed).catch();

    },
};
