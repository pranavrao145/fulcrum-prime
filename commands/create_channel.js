const { getRoleFromMention } = require("../utils");

module.exports = {
    name: "create_channel",
    alias: ["cc"],
    description: "Creates a channel given a channel name, type, and category.",
    execute(message, args) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply(
                    "sorry, only an administrator can use this command."
                );
                return;
            }

            let name = args.shift();
            let type = args.shift().toLowerCase();
            let category = args.shift().toLowerCase;

            if (!(name && type)) {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!createchannel [name] [type] [category (optional)] [roles that can view this channel (optional)]"
                );
                return;
            }

            let channel = message.guild.channels.cache.find((c) => c.name === name);

            if (channel) {
                message.channel.send(
                    "Cannot create that channel bceause a channel with that name already exists."
                );
                return;
            }

            if (!(type === "text" || type === "voice")) {
                message.channel.send(
                    "Invalid channel type! Channel type must be text or voice."
                );
                return;
            }

            message.guild.channels
                .create(name)
                .then((channel) => {

                })
                .catch((err) => {
                    throw err;
                });
        } catch (e) {
            return;
        }
    },
};
