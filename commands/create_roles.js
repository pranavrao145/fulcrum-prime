const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
    name: "create_roles",
    alias: ["crs"],
    description: "Creates role(s) with the given name(s).",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_ROLES")) {
            message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
            return;
        }

        if (args.length == 0) {
            message.channel.send(
                "Invalid syntax! Correct syntax: f!createrole [names of roles]"
            ).catch();
            return;
        }

        let guild = message.guild;

        args.forEach((mention) => {

            let user_test = getRoleFromMention(message, mention) || getUserFromMention(message, mention);

            if (user_test) {
                message.channel.send("Could not create role because that role already exists.").catch();
                return;
            }

            let submention = mention.startsWith("@") ? mention.slice(1) : mention;
            
            let finalMention = submention.replace(/_/g, " ")

            let role = guild.roles.cache.find((r) => r.name === finalMention);

            if (role) {
                message.channel.send(
                    `Could not create role ${role.name} because that role already exists.`
                ).catch();
                return;
            }

            guild.roles
                .create({
                    data: {
                        name: finalMention,
                    },
                })
                .then((res) => {
                    message.channel.send(`Role ${res.name} created successfully.`).catch();
                })
                .catch((err) => {
                    message.channel.send(
                        "There was an error creating a role, so skipping over it."
                    ).catch();

                });
        });

    },
};
