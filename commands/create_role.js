const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
    name: "create_role",
    alias: ["cr"],
    description: "Creates a role with the given name and optional colour.",
    execute(message, args) {
            if (!message.member.hasPermission("MANAGE_ROLES")) {
                message.reply("sorry, you need the MANAGE_ROLES permission to use this command.").catch();
                return;
            }

            if (!args[0]) {
                message.channel.send(
                    "Invalid syntax! Correct syntax: f!createrole [name of role (underscores for spaces)] [#colour code (optional)]"
                ).catch();
                return;
            }

            let guild = message.guild;

            let user_test = getRoleFromMention(message, args[0]) || getUserFromMention(message, args[0]);

            if (user_test) {
                message.channel.send("Could not create role because that role already exists.").catch();
                return;
            }
        
            if (args[0].startsWith('@')) args[0] = args[0].slice(1); 
            
            let role_parsed = args[0].replace(/_/g, " ")

            let role = guild.roles.cache.find((r) => r.name === role_parsed);

            if (role) {
                message.channel.send("Could not create role because that role already exists.").catch();
                return;
            }

            if (args[1]) {
                guild.roles
                    .create({
                        data: {
                            name: role_parsed,
                            color: args[1].toUpperCase(),
                        },
                    })
                    .then((res) => {
                        message.channel.send(`Role ${res.name} created successfully.`).catch();
                    })
                    .catch((err) => {
                        message.channel.send("there was an error creating that role. Please check my permissions and try again.").catch();
                        
                    });
            } else { guild.roles
                    .create({
                        data: {
                            name: role_parsed,
                        },
                    })
                    .then((res) => {
                        message.channel.send(`Role ${res.name} created successfully.`).catch();
                    })
                    .catch((err) => {
                        message.channel.send("there was an error creating that role. Please check my permissions and try again.").catch();
                        
                    });
            }

    },
};
