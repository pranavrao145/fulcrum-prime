const { getRoleFromMention, getChannelFromMention } = require("../utils");

module.exports = {
    name: "delete_channels",
    description: "Deletes the channels given.",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("sorry, you need the MANAGE_CHANNELS permission to use this command.").catch();
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!deletechannel [channel mentions (vc roles for voice channels)]").catch();
            return;
        }

        args.forEach(mention => {
            let vcRole = getRoleFromMention(message, mention);

            let textChannel = getChannelFromMention(message, mention)

            if (vcRole) {
                let vc = message.guild.channels.cache.find(c => c.name === vcRole.name);
                if (!vc) {
                    message.channel.send("No voice channel found associated with a role specified. Ensure you have set up voice channel roles, that I have permission to view the voice channel, and try again.").catch();
                    return;
                }

                vc.delete().then(c => {
                    message.channel.send(`Channel ${c.name} deleted successfully.`).catch();
                }).catch(() => {
                    message.channel.send(
                        "There was an error deleting a voice channel, so skipping over it. Please check my permissions and try again."
                    ).catch();
                })
                return;
            }

            if (textChannel) {
                textChannel.delete().then(c => {
                    message.channel.send(`Channel ${c.name} deleted successfully.`).catch();
                }).catch(() => {
                    message.channel.send(
                        "There was an error deleting a text channel, so skipping over it. Please check my permissions and try again."
                    ).catch();
                })
                return;
            }
            message.channel.send("An argument provided was not valid for a text or voice channel. Please check my permissions and try again.").catch();
        })
    }
}
