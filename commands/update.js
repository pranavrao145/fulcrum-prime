module.exports = {
    name: "update",
    alias: ["ud"],
    description:
    "Base command for updating channel count, offline roles, date, and member count.",
    execute(message, args, client, con) {
        try {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (!args[0]) {
                message.channel.send(
                    "Invalid syntax! Correct syntax: f!update [service]. See f!services for all possible services updatable with this command."
                );
                return;
            }

            if (args[0] == "datechannel") {
                client.commands.get("update_date").execute(message, client, con);
            } else if (args[0] == "membercount") {
                client.commands
                    .get("update_member_count")
                    .execute(null, message, client, con);
            } else if (args[0] == "channelcount") {
                client.commands
                    .get("update_channel_count")
                    .execute(null, message, client, con);
            } else if (args[0] == "statusroles") {
                client.commands.get("update_idle").execute(message, client);
                client.commands.get("update_offline").execute(message, client);
                message.channel.send("Status roles updated successfully!");
            } else if (args[0] == "vcroles") {
                client.commands.get("update_vcroles").execute(message, client);
                message.channel.send("Voice channel roles updated successfully!");
            }
            else {
                message.channel.send(
                    "the service provided is invalid! See f!services for a full list of services updatable with this command."
                );
                return;
            }
        } catch (e) {
            return;
        }
    },
};
