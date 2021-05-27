const { getUserFromMention, getRoleFromMention } = require("../utils");

module.exports = {
    name: "remove_roles",
    alias: ["rrs"],
    description: "Removes many roles from one user.",
    execute(message, args) {

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
            return;
        }


        let userMention = args.shift();

        if (!userMention || !args[0]) {
            message.channel.send("Incorrect syntax! Correct syntax: f!removeroles [user] [list of roles]").catch();
            return;
        }

        let member = getUserFromMention(message, userMention);

        if (!member) {
            message.channel.send("The user supplied was invalid.").catch();
            return;
        }

        args.forEach(roleMention => {
            let role = getRoleFromMention(message, roleMention);

            if (!role) {
                message.channel.send("A role supplied was invalid, so skipping over it.").catch();
                return;
            }

            member.roles.remove(role).then(() => {
                message.channel.send(`Role ${role.name} successfully removed from ${member.user.tag}`).catch();            
            }).catch(() => {
                message.channel.send("There was an error in removing a role. Please check my permissions and try again.").catch();

            });
        });

    },
};
