module.exports = {
    name: "create_channel",
    description: "Allows admins to create a channel.",
    execute(message, args) { if (!message.member.hasPermission("MANAGE_CHANNELS")) {
            message.reply("sorry, you need the MANAGE_CHANNELS permission to use this command.").catch();
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!createchannel [name (underscores for spaces)] (type, default text) (private/public, default public)").catch();
            return;
        }

        let name = args[0].replace(/_/g, " ")
        let type = args[1] ? args[1].toLowerCase() : null || "text";

        if (type) {
            if (type.toLowerCase() !== "text" && type.toLowerCase() !== "voice") {
                message.channel.send("The value supplied for type was invalid. Please specify 'text' or 'voice' for the type and try again.").catch();
                return;
            }
        }

        let permission = args[2] ? args[2].toLowerCase() : null || "public";

        if (type) {
            if (type.toLowerCase() !== "text" && type.toLowerCase() !== "voice") {
                message.channel.send("Invalid value for type! Please specify 'text' or 'voice' for the type and try again.").catch();
                return;
            }
        }

        if (permission === "public") {
            message.guild.channels.create(name, {
                type: type
            }).catch(e => console.log(e))
        } else if (permission.toLowerCase() === "private") {
            message.guild.channels.create(name, {
                type: type,
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL']
                    }
                ]
            }).catch(() => {
                message.channel.send("There was an error creating that channel. Please check my permissions and try again.").catch()
                return;
            });
        } else {
            message.channel.send("Invalid value for permission! Please specify 'public' or 'private' for the permission and try again.").catch();
            return;
        }
    }
}
