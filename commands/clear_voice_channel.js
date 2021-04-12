const {getRoleFromMention} = require("../utils");

module.exports = {
    name: "clear_voice_channel",
    alias: ["cv"],
    description: "Admin command that can clear the voice channel",

    execute(msg, args) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
            msg.reply("sorry, only an administrator can use this command.")
        }

        if (!args[0]) {
            msg.reply("Incorrect syntax! Correct syntax: f!clearvoice {voice_channel_role} ");
            return;
        } else {
            let mention = args[0];
            let role = getRoleFromMention(msg, mention)
            let channelName, channel;


            if (role !== undefined) {
                channelName = role.name;
                channel = msg.guild.channels.cache.find(c => c.name === channelName);

                if (channel && channel.type === 'voice') {
                    channel.members.forEach(mem => {
                        mem.voice.setChannel(null);
                    })
                    msg.reply("voice channel cleared successfully.");
                } else {
                    msg.reply("no voice channel found associated with that role. Ensure you have set up voice channel roles and try again.")
                }
            } else {
                msg.reply("Incorrect syntax! Correct syntax: f!clearvoice {voice_channel_role} ");
            }

        }
    }
}