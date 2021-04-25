module.exports = {
    name: "create_roles",
    alias: ["crs"],
    description: "Creates role(s) with the given name(s).",
    execute(message, args) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (args.length == 0) {
                message.channel.send(
                    "Invalid syntax! Correct syntax: f!createrole [names of roles]"
                );
                return;
            }

            let guild = message.guild;

            args.forEach((mention) => {
                let finalMention = mention.startsWith("@") ? mention.slice(1) : mention;

                let role = guild.roles.cache.find((r) => r.name === finalMention);

                if (role) {
                    message.channel.send(
                        `Could not create role ${role.name} because that role already exists.`
                    );
                    return;
                }

                guild.roles
                    .create({
                        data: {
                            name: finalMention,
                        },
                    })
                    .then((res) => {
                        message.channel.send(`Role ${res.name} created successfully.`);
                    })
                    .catch((err) => {
                        message.channel.send(
                            "There was an error creating a role, so skipping over it."
                        );
                        console.log(err);
                    });
            });
        } catch (e) {
            return;
        }
    },
};
