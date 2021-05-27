const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
    name: "assign_role",
    alias: ["ar"],
    description: "Adds the given role to the given user(s).",
    execute(message, args) {
        
            if (!message.member.hasPermission("MANAGE_ROLES")) {
                message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
                return;
            }

            if (args.length == 0) {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!assignrole [role mention] [user mentions]"
                ).catch();
                return;
            }

            let role = getRoleFromMention(message, args.shift());

            if (!role) {
                message.channel.send("The role specified was not valid. Please try again.").catch();
                return;
            }

            args.forEach((mention) => {
                let user = getUserFromMention(message, mention);

                if (!user) {
                    message.channel.send("A user supplied was invalid, so skipping over them.").catch();
                    return;
                }

                user.roles
                    .add(role)
                    .then(() => {
                        message.channel.send(
                            `Role ${role.name} successfully added to ${user.user.tag}`
                        ).catch();
                    })
                    .catch(() => {
                        message.channel.send("A user supplied was invalid, so skipping over them.").catch();
                        
                        return;
                    });
            });

    }
};
