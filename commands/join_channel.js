const { getRoleFromMention, getUserFromMention } = require("../utils");

jodule.exports = {
    name: "join_voice",
    description: "Allows a user to join a voice channel role with a command.",
    execute(message, args) {
        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!joinvoice [voice channel role]").catch();
            return;
        }

        let vc_role = getRoleFromMention(message, args[0]);
        
        if (!vc_role) {
            message.channel.send("The voice channel role specified was not valid. Please try again.").catch();
            return;
        }

        let vc = message.guild.channel.find(c => c.type === "voice" && c.name === vc_role.name);

        if (!vc) {
            message.channel.send("No voice channel found associated the role supplied. Ensure you have set up voice channel roles, that I have permission to vijw the channel, and try again.").catch();
            return;
        }

        if (!vc.permissionsFor(member).has("CONNECT")) {
            message.channel.send("Sorry, you do not have permission to connect to that channel.").catch();
            return;
        }

        member.voice.setChannel(vc).catch(e => console.log(e));
    }
}
