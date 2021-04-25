module.exports = {
    name: "polling",
    alias: ["pm"],
    description: "Gives users the role can-vote to access polling channels.",
    execute(message, args) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (args.length == 0) {
                message.channel.send(
                    "Invalid syntax! Correct syntax: f!polling [on/off]"
                );
                return;
            }

            let action = args[0];
            let role = message.guild.roles.cache.find((r) => r.name === "can-vote");

            if (!role) {
                message.channel.send(
                    "please create the can-vote role for this command to work."
                );
                return;
            }

            if (action === "on") {
                message.guild.members.cache
                    .array()
                    .filter((m) => !m.user.bot)
                    .forEach((member) => {
                        member.roles.add(role).catch(() =>{
                            console.log("Error in updating can-vote role for a user.")
                        });
                    });
                message.channel.send("polling mode enabled successfully.");
            }
            else if (action === "off") {
                message.guild.members.cache
                    .array()
                    .filter((m) => !m.user.bot)
                    .forEach((member) => {
                        member.roles.remove(role).catch(() =>{
                            console.log("Error in updating can-vote role for a user.")
                        });;
                    });
                message.channel.send("polling mode disabled successfully.");
            }
            else {
                message.channel.send("that is not a valid option. Please try again with a valid option.")
            }
        } catch (e) {
            return;
        }
    },
};
