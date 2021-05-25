module.exports = {
    name: "create_channel",
    description: "Allows admins to create a channel.",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("sorry, you need the MANAGE_CHANNELS permission to use this command.").catch();
            return;
        }
    }
}
