const Discord = require("discord.js");

module.exports = {
  name: "help",
  alias: ["h"],
  description: "Displays help message",

  execute(message) {
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
          name: "random_numbers [start number] [end number]",
          value: "Alias: rn\nPicks a random number in the range specified.",
        },
        {
          name: "random_words [num]",
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
            "Alias: pm\nGives/takes away the can-vote role from users in the server. For this feature to work properly, a can-vote role must exist, and polling channels must be restricted to only those who have the can-vote role.",
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
          name: "createrole [role name] [color_hex]",
          value:
            "Alias: cr\nCreates a role with the color specified. This only works when you want to create a role with one word in the name.",
        },
        {
          name: "createroles [role names]",
          value:
            "Alias: crs\nCreates a role for each argument. This only works when you want to create roles with one word in the name.",
        },
        {
          name: "deleterole [list of role mentions]",
          value: "Alias: dr\nDeletes all roles specified.",
        },
        {
          name: "assignrole [role] [list of user mentions]",
          value:
            "Alias: ar\nAssigns the role specified to all users specified.",
        },
        {
          name: "removerole [role] [list of user mentions]",
          value:
            "Alias: rr\nRemoves the role specified from all users specified.",
        },
        {
          name: "clearroles [role mentions]",
          value:
            "Alias: clr\nRemoves the role mentioned from any user that has it.",
        }
      )
      .setTimestamp();

    channel.send(embed);
  },
};
