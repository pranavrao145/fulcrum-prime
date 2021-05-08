const {getRoleFromMention} = require("../utils");

module.exports = {
    name: "clear_voice_channel",
    alias: ["cv"],
    description: "Admin command that can clear the voice channel",

    execute(message, args) {
            if (!message.member.hasPermission("MOVE_MEMBERS")) {
                message.reply("sorry, you need the MOVE_MEMBERS permission to use this command. ")
                return
            }

            if (!args[0]) {
                message.channel.send("Incorrect syntax! Correct syntax: f!clearvoice [voice channel role] ");
                return;
            } else {
                let mention = args[0];
                let role = getRoleFromMention(message, mention)
                let channelName, channel;


                if (role !== undefined) {
                    channelName = role.name;
                    channel = message.guild.channels.cache.find(c => c.name === channelName && c.type === 'voice');

                    if (channel) {
                        channel.members.forEach(mem => {
                            mem.voice.setChannel(null);
                        })
                        message.channel.send("Voice channel cleared successfully.");
                    } else {
                        message.channel.send("No voice channel found associated with that role. Ensure you have set up voice channel roles and try again.")
                    }
                } else {
                    message.channel.send("Incorrect syntax! Correct syntax: f!clearvoice [voice channel role] ");
                }
            }

    }
}
