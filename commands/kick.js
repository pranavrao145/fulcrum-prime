const { getUserFromMention } = require("../utils");

module.exports = {
    name: "kick",
    description: "Allows admins to kick a user.",
    execute(message, args) {
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.reply("sorry, you need the KICK_MEMBERS permission to use that command.");
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!kick [user mention] (reason)")
            return;
        }
    
        let userToKick = getUserFromMention(message, args.shift());

        if (!userToKick) {
            message.channel.send("That is not a valid user. Please try again.").catch();
            return;
        }

        let r = args.join(" ");

        userToKick.kick(r ? r : null).then((mem) => {
            message.channel.send(`User ${mem.user.tag} kicked successfully.`);
        }).catch(() => {
            message.channel.send("There was an error kicking that user. Please check my permissions and try again.");
        })
    }
}
