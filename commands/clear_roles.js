const { getRoleFromMention } = require("../utils");

module.exports = {
    name: "clear_roles",
    alias: ["clr"],
    description: "Removes the given roles from all users that have it.",
    execute(message, args) {
            if (!message.member.hasPermission("MANAGE_ROLES")) {
                message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
                return;
            }

            if (args.length == 0) {
                message.channel.send("Incorrect syntax! Correct syntax: f!clearroles [list of roles]"
                ).catch();
                return;
            }

            args.forEach((mention) => {
                let role = getRoleFromMention(message, mention);

                if (!role) {
                    message.channel.send("Could not clear a role given, so skipping over it. Please check my permissions and try again.").catch();
                    return;
                }

                let user_ids = role.members.map((mem) => mem.id);

                user_ids.forEach((id) => {
                    let user = message.guild.members.cache.get(id);

                    if (!user) {
                        return;
                    }

                    user.roles
                        .remove(role)
                        .then(() => {
                            message.channel.send(`Role ${role.name} removed successfully from user ${user.user.tag}`).catch()
                        })
                        .catch((err) => {
                            message.channel.send("Could not clear a role given, so skipping over it. Please check my permissions and try again.").catch();
                            return;
                        });
                });
            });

    },
};
