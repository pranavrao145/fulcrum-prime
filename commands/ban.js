const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
    name: "ban",
    description: "Allows admins to ban a user.",
    execute(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.reply("sorry, you need the BAN_MEMBERS permission to use that command.");
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!ban [user mention] (days, 0-7, 0 for default)  (reason)")
            return;
        }

        let userToBan = getUserFromMention(message, args.shift());
        
        if (!userToBan) {
            message.channel.send("That is not a valid user. Please try again.").catch();
            return;
        }

        let d = args.shift();
        let r = args.join(" ");

        if (d) {
            if (isNaN(d)) {
                message.channel.send("That is not a valid number for days. Please try again.").catch();
                return;
            } 

            let tempd = parseInt(d, 10);

            if (tempd < 0 || tempd > 7) {
                message.channel.send("That is not a valid number for days. Please try again.").catch();
                return;
            } 
        }

        message.guild.members.ban(userToBan, {
            days: parseInt(d, 10),
            reason: r ? r : null
        }).then(mem => {
            message.channel.send(`User ${mem.user.tag} was banned successfully.`).catch()
        }).catch(() => {
            message.channel.send("There was an error banning that user. Please check my permissions and try again.").catch();
        })

    }
}

