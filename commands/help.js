const Discord = require("discord.js");


module.exports = {
    name: "help",
    alias: ["h"],
    description: "Displays help message",

    execute(message, args) {
        let channel = message.channel;
        if (args.length === 0 || args[0] !== "admin") {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFCF4")
                .setTitle("Fulcrum Prime - Help")
                .setDescription("A breakdown of all the commands offered by Fulcrum.")
                .addFields(
                    {
                        name: "PREFIX",
                        value: "My prefix is **f!**. \nYou can use any of the commands below with this prefix.",
                    },
                    { name: "\u200B", value: "\u200B" },
                    { name: "COMMANDS", value: "List of commands Fulcrum offers:" },
                    { name: "start", value: "\nDisplays a start message." },
                    { name: "help", value: "Alias: h\nDisplays this help message." },
                    {
                        name: "services",
                        value:
                            "Alias: s\nDisplays a help message detailing all the services Fulcrum offers and how to set them up.",
                    },
                    {
                        name: "define [word]",
                        value: "Alias: df\nDefines the English word.",
                    },
                    {
                        name: "translate [2 letter code of language] [word/phrase]",
                        value:
                            "Alias: tr\nTranslates given word/phrase to the language specified.",
                    },
                    {
                        name: "randomnumbers [start number] [end number]",
                        value: "Alias: rn\nPicks a random number in the range specified.",
                    },
                    {
                        name: "randomwords [num]",
                        value:
                            "Alias: rw\nGenerates the amount of random words specified. Not specifying a number will generate one word.",
                    },
                    {
                        name: "supportserver",
                        value:
                            "Alias: ss\nDisplays the link for the Fulcrum Prime Support Server.",
                    },
                )
                .setTimestamp()
                .setFooter("Looking for admin commands? Try f!help admin.");

            channel.send(embed).catch();

            return;
        } else if (args[0] === "admin") {
            const embed = new Discord.MessageEmbed()
                .setColor("#FFFCF4")
                .setTitle("Fulcrum Prime - Admin Help")
                .setDescription("A breakdown of all the admin commands offered by Fulcrum.")
                .addFields(
                    {
                        name: "PREFIX",
                        value:
                            "My prefix is **f!**. \nYou can use any of the commands below with this prefix.",
                    },
                    { name: "\u200B", value: "\u200B" },
                    {
                        name: "ADMIN COMMANDS",
                        value: "List of commands Fulcrum offers for admins only:",
                    },
                    {
                        name: "clearvoice [voice channel role]",
                        value:
                            "Alias: cv\nClear the voice channel associated with the role specified. For this feature to work properly, voice channel roles must be set up (see f!services).",
                    },
                    {
                        name:
                            "movevoice [(from) voice channel role] [(to) voice channel role]",
                        value:
                            "Alias: mv\nMoves all users in the voice channel associated with the first role to the voice channel associated with the second. For this feature to work properly, voice channel roles must be set up (see f!services). **Note:** attempting to move someone to a voice channel which they do not have permission to access will give them *temporary access* to that channel and still move them. Their access will be revoked upon leaving the voice channel.",
                    },
                    {
                        name: "createrole [role name] [color hex]",
                        value:
                            "Alias: cr\nCreates a role with the color specified. To create a role name with spaces, use underscores in the place of the spaces and Fulcrum Prime will convert them (e.g. @Role_with_spaces).",
                    },
                    {
                        name: "createroles [role names]",
                        value:
                            "Alias: crs\nCreates a role for each argument. To create a role name with spaces, use underscores in the place of the spaces and Fulcrum Prime will convert them (e.g. @Role_with_spaces).",
                    },
                    {
                        name: "deleteroles [list of roles]",
                        value: "Alias: dr\nDeletes all roles specified.",
                    },
                    {
                        name: "assignrole [role] [list of users]",
                        value:
                            "Alias: ar\nAssigns the role specified to all users specified.",
                    },
                    {
                        name: "assignroles [user] [list of roles]",
                        value:
                            "Alias: ars\nAssigns all the roles given to the specified user.",
                    },
                    {
                        name: "removerole [role] [list of users]",
                        value:
                            "Aljas: rr\nRemoves the role specified from all users specified.",
                    },
                    {
                        name: "removeroles [user] [list of roles]",
                        value:
                            "Aljas: rrs\nRemoves all the roles from the user specified.",
                    },
                    {
                        name: "clearroles [list of roles]",
                        value:
                            "Alias: clr\nFor each role give, removes the role from any user that has it.",
                    },
                    {
                        name: "purgechat [number of messages (2-100)]",
                        value:
                            "Alias: pc\nDeletes the amount of messages (before the command) specified. Also deletes the message the admins uses to clear the chat.",
                    },
                    {
                        name: "kick [user to kick] [reason (optional)]",
                        value:
                            "\nKicks the user specified for the reason, if specified.",
                    },
                    {
                        name: "ban [user mention] [days (optional, 0-7, 0 for default)]  [reason (optional)]",
                        value:
                            "\nBans the user specified for the reason, if specified. Also purges their messages on the server for the amount of days specified, if specified. Days is 0 by default, so if you want to add a reason with just the default amount of days, simply pass 0 as the argument for days.",
                    },
                )
                .setTimestamp()
            channel.send(embed).catch()
            return;
        }


    },
};
