const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
    name: "remove_role",
    alias: ["rr"],
    description: "Removes the given role from the given user(s).",
    execute(message, args) {
        

            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (args.length == 0) {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!removerole [role mention] [user mentions]"
                );
                return;
            }

            let role = getRoleFromMention(message, args.shift());

            if (!role) {
                message.channel.send("The role specified was not valid. Please try again.");
                return;
            }

            args.forEach((mention) => {
                let user = getUserFromMention(message, mention);

                if (!user) {
                    message.channel.send("A user supplied was invalid, so skipping over them.");
                    return;
                }

                user.roles
                    .remove(role)
                    .then(() => {
                        message.channel.send(
                            `Role ${role.name} successfully removed from ${user.user.tag}`
                        );
                    })
                    .catch((err) => {
                        message.channel.send("A user supplied was invalid, so skipping over them.");
                        
                        return;
                    });
            });

    },
};
