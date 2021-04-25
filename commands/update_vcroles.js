module.exports = {
    name: "update_vcroles",
    description: "Updates the vcroles for the given guild or all guilds.",
    execute(message = null, client) {
        
            if (message !== null) {
                if (!message.member.hasPermission("ADMINISTRATOR")) {
                    message.reply("sorry, only an administrator can use this command.");
                    return;
                }

                let guild = message.guild;

                let voice_channels = guild.channels.cache.filter(c => c.type === "voice");

                voice_channels.forEach(channel => {
                    let role = guild.roles.cache.find(r => r.name === channel.name);

                    if (!role) {
                        return;
                    }

                    channel.members.forEach(mem => {
                        mem.roles.add(role).then(() => {
                            console.log("VC role updated.");
                        }).catch((err) => {
                            console.log("Error");
                        });

                    }) 
                })  
                return;
            }

            const Guilds = client.guilds.cache.map(guild => guild.id);

            Guilds.forEach((element) => {
                let guild = client.guilds.cache.get(element);

                let voice_channels = guild.channels.cache.filter(c => c.type === "voice");

                voice_channels.forEach(channel => {
                    let role = guild.roles.cache.find(r => r.name === channel.name);

                    if (!role) {
                        return;
                    }

                    channel.members.forEach(mem => {
                        mem.roles.add(role).then(() => {
                            console.log("VC role updated.");
                        }).catch((err) => {
                            console.log("Error");
                        });

                    }) 
                })  

            })
            console.log("All servers' voice channel roles updated successfully.");

    }
}
