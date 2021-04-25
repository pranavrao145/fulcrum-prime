const { getRoleFromMention } = require("../utils");

module.exports = {
    name: "delete_roles",
    alias: ["dr"],
    description: "Deletes the given role(s) from the server.",
    execute(message, args) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (args.length == 0) {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!deleteroles [list of roles]"
                );
                return;
            }

            args.forEach((mention) => {
                let role = getRoleFromMention(message, mention);

                if (!role) {
                    message.channel.send(
                        "Could not delete a role because the role was invalid. Skipping over it."
                    );
                    return;
                }

                role
                    .delete()
                    .then((res) => {
                        message.channel.send(`Role ${res.name} deleted successfully.`);
                    })
                    .catch((err) => {
                        message.channel.send(
                            "There was an error deleting a role. Skipping over it."
                        );
                        console.log(err);
                    });
            });
        } catch (e) {
            return;
        }
    },
};
