const Discord = require("discord.js");

module.exports = {
    name: "help",
    alias: ["h"],
    description: "Displays help message",

    execute(message) {
        try {
            let channel = message.channel;

            const embed = new Discord.MessageEmbed()
                .setColor("#FFFCF4")
                .setTitle("Fulcrum Prime - Help")
                .setDescription("A breakdown of all the commands offered by Fulcrum.")
                .addFields(
                    {
                        name: "PREFIX",
                        value:
                        "My prefix is **f!**. \nYou can use any of the commands below with this prefix.",
                    },
                    { name: "\u200B", value: "\u200B" },
                    { name: "COMMANDS", value: "List of commands Fulcrum offers:" },
                    { name: "help", value: "Alias: h\nDisplays this help message." },
                    {
                        name: "services",
                        value:
                        "Alias: s\nDisplays a help message detailing all the services Fulcrum offers.",
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
                    { name: "\u200B", value: "\u200B" },
                    {
                        name: "ADMIN COMMANDS",
                        value: "List of commands Fulcrum offers for admins only:",
                    },
                    {
                        name: "polling [on/off]",
                        value:
                        "Alias: pm\nGives/takes away the can-vote role from users in the server. For this feature to work properly, polling mode must be set up (see f!services). ",
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
                        "Alias: cr\nCreates a role with the color specified. This only works when you want to create a role with one word in the name.",
                    },
                    {
                        name: "createroles [role names]",
                        value:
                        "Alias: crs\nCreates a role for each argument. This only works when you want to create roles with one word in the name.",
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
                )
                .setTimestamp();

            channel.send(embed);
        } catch (e) {
            return;
        }
    },
};
