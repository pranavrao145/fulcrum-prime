const { getUserFromMention, getRoleFromMention } = require("../utils");

module.exports = {
    name: "remove_roles",
    alias: ["rrs"],
    description: "Removes many roles from one user.",
    execute(message, args) {

        if (!message.member.hasPermission("MANAGE_ROLES")) {
            message.reply("sorry, you need the MANAGE_ROLES permission to use this command.");
            return;
        }


        let userMention = args.shift();

        if (!userMention || !args[0]) {
            message.channel.send("Incorrect syntax! Correct syntax: f!assignroles [user] [list of roles]");
            return;
        }

        let member = getUserFromMention(message, userMention);

        if (!member) {
            message.channel.send("The user supplied was invalid.");
            return;
        }

        args.forEach(roleMention => {
            let role = getRoleFromMention(message, roleMention);

            if (!role) {
                message.channel.send("A role supplied was invalid. Skipping over it.");
                return;
            }

            member.roles.remove(role).then(() => {
                message.channel.send(`Role ${role.name} successfully removed from ${member.user.tag}`);            
            }).catch((err) => {
                message.channel.send("There was an error in adding a role. Please try again.");

            });
        });

    },
};
