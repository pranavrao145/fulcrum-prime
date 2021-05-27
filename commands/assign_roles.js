const { getUserFromMention, getRoleFromMention } = require("../utils");

module.exports = {
    name: "assign_roles",
    alias: ["ars"],
    description: "Assigns many roles to one user.",
    execute(message, args) {
            if (!message.member.hasPermission("MANAGE_ROLES")) {
                message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
                return;
            }

            let userMention = args.shift();

            if (!userMention || !args[0]) {
                message.channel.send("Incorrect syntax! Correct syntax: f!assignroles [user] [list of roles]").catch();
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
                    message.channel.send("A role supplied was invalid. Skipping over it.").catch();
                    return;
                }

                member.roles.add(role).then(() => {
                    message.channel.send(`Role ${role.name} successfully added to ${member.user.tag}`).catch();            
                }).catch(() => {
                     message.channel.send("There was an error in adding a role. Please check my permissions and try again.").catch();
                     
                });
            });
 
    },
};
