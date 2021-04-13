const {getRoleFromMention} = require("../utils");

module.exports = {
    name: "move_voice_channel",
    alias: ["mv"],
    description: "Admin command that can move all users from one voice channel to another voice channel",

    execute(msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.reply("sorry, only an administrator can use this command.")
            return;
        }

        if (!args[0]) {
            msg.reply("Incorrect syntax! Correct syntax: f!movevoice {from_voice_channel_role} {to_voice_channel_role} ");
            return;
        } else {
            let fromVoice = args[0];
            let toVoice = args[1]
            let fromRole = getRoleFromMention(msg, fromVoice);
            let toRole = getRoleFromMention(msg, toVoice);

            let fromChannelName, fromChannel, toChannelName, toChannel;

            if (fromRole !== undefined && toRole !== undefined) {
                fromChannelName = fromRole.name;
                fromChannel = msg.guild.channels.cache.find(c => c.name === fromChannelName);

                toChannelName = toRole.name;
                toChannel = msg.guild.channels.cache.find(c => c.name === toChannelName);

                if (toChannel && toChannel.type === 'voice' && fromChannel && fromChannel.type === 'voice') {
                    fromChannel.members.forEach(mem => {
                        mem.voice.setChannel(toChannel);
                    })
                    msg.reply(`all members in ${fromChannelName} moved to ${toChannelName} successfully.`);
                } else {
                    msg.reply("no voice channel found associated with one or more of the roles supplied. Ensure you have set up voice channel roles and try again.")
                }
            } else {
                msg.reply("Incorrect syntax! Correct syntax: f!movevoice {from_voice_channel_role} {to_voice_channel_role}");
            }

        }
    }
}