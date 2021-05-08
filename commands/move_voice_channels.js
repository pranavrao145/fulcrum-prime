const {getRoleFromMention} = require("../utils");

module.exports = {
    name: "move_voice_channel",
    alias: ["mv"],
    description: "Admin command that can move all users from one voice channel to another voice channel",

    execute(message, args) {
            if (!message.member.hasPermission("MOVE_MEMBERS")) {
                message.reply("sorry, you need the MOVE_MEMBERS permission to use this command. ")
                return
            }

            if (!args[0]) {
                message.channel.send("Incorrect syntax! Correct syntax: f!movevoice [from voice channel role] [to voice channel role] ");
                return;
            } else {
                let fromVoice = args[0];
                let toVoice = args[1]
                let fromRole = getRoleFromMention(message, fromVoice);
                let toRole = getRoleFromMention(message, toVoice);

                let fromChannelName, fromChannel, toChannelName, toChannel;

                if (fromRole !== undefined && toRole !== undefined) {
                    fromChannelName = fromRole.name;
                    fromChannel = message.guild.channels.cache.find(c => c.name === fromChannelName && c.type === "voice");

                    toChannelName = toRole.name;
                    toChannel = message.guild.channels.cache.find(c => c.name === toChannelName && c.type === "voice");

                    if (toChannel && fromChannel) {
                        fromChannel.members.forEach(mem => {
                            mem.voice.setChannel(toChannel);
                        })
                        message.channel.send(`All members in ${fromChannelName} moved to ${toChannelName} successfully.`);
                    } else {
                        message.channel.send("No voice channel found associated with one or more of the roles supplied. Ensure you have set up voice channel roles and try again.")
                    }
                } else {
                    message.channel.send("Incorrect syntax! Correct syntax: f!movevoice [from voice channel role] [to voice channel role]");
                }
            }

    }
}
