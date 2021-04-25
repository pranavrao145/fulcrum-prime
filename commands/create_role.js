module.exports = {
    name: "create_role",
    alias: ["cr"],
    description: "Creates a role with the given name and optional colour.",
    execute(message, args) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (!args[0]) {
                message.channel.send(
                    "Invalid syntax! Correct syntax: f!createrole [name of role] [#colour code (optional)]"
                );
                return;
            }

            let guild = message.guild;

            if (args[0].startsWith('@')) args[0] = args[0].slice(1); 

            let role = guild.roles.cache.find((r) => r.name === args[0]);

            if (role) {
                message.channel.send("Could not create role because that role already exists.");
                return;
            }

            if (args[1]) {
                guild.roles
                    .create({
                        data: {
                            name: args[0],
                            color: args[1].toUpperCase(),
                        },
                    })
                    .then((res) => {
                        message.channel.send(`Role ${res.name} created successfully.`);
                    })
                    .catch((err) => {
                        message.channel.send("there was an error creating that role.");
                        console.log(err);
                    });
            } else { guild.roles
                    .create({
                        data: {
                            name: args[0],
                        },
                    })
                    .then((res) => {
                        message.channel.send(`Role ${res.name} created successfully.`);
                    })
                    .catch((err) => {
                        message.channel.send("there was an error creating that role.");
                        console.log(err);
                    });
            }
        } catch (e) {
            return;
        }
    },
};
