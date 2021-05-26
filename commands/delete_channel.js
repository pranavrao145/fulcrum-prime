const { getRoleFromMention, getChannelFromMention } = require("../utils");

module.exports = {
    name: "delete_channel",
    description: "Deletes the channel given.",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("sorry, you need the MANAGE_CHANNELS permission to use this command.").catch();
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!deletechannel [channel mention (vc role for voice channels)]")
        }

        let vcRole = getRoleFromMention(message, args[0]);

        let textChannel = getChannelFromMention(message, args[0])

        if (vcRole) {
            let vc = message.guild.channels.cache.find(c => c.name === vcRole.name);
            if (!vc) {
                message.channel.send("No voice channel found associated with that role. Ensure you have set up voice channel roles, that I have permission to view the voice channel, and try again.").catch();
                return;
            }

            vc.delete().then(c => {
                message.channel.send(`Channel ${c.name} deleted successfully.`).catch();
            }).catch(() => {
                message.channel.send(
                "There was an error deleting that channel. Please check my permissions and try again."
                );
                return;
            })
            return;
        }

        if (textChannel) {
            let channel = getChannelFromMention(message, args[0]);

            if (!channel) {
                message.channel.send("The channel provided was invalid. Please check my permissions to view the channel specified and try again.")
                return;
            }

            channel.delete().then(c => {
                message.channel.send(`Channel ${c.name} deleted successfully.`).catch();
            }).catch(() => {
                message.channel.send(
                "There was an error deleting that channel. Please check my permissions and try again."
                );
                return;
            })
            return;
        }
        message.channel.send("The channel provided was invalid. Please check my permissions and try again.")
    }
}
