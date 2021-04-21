module.exports = {
    name: "update_offline",
    alias: ["uo"],
    description: "Give people that are offline the offline role, and remove the offline role from people that are online.",
    execute(message = null, client) {
        if (message !== null) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            let guild = message.guild;
            let offline_role = guild.roles.cache.find(role => role.name.toLowerCase() === "offline");

            if (!offline_role) {
                return;
            } else {
                guild.members.cache.forEach(member => {
                    if (member.presence.status === "offline") {
                        member.roles.add(offline_role);
                    } else {
                        member.roles.remove(offline_role);
                    }
                })
                console.log("Offline roles updated succesfully.");
                return;
            }
        }

        const Guilds = client.guilds.cache.map(guild => guild.id);

        Guilds.forEach((element) => {
            let guild = client.guilds.cache.get(element);
            let offline_role = guild.roles.cache.find(role => role.name === "offline" || role.name === "Offline");

            if (offline_role) {
                guild.members.cache.forEach(member => {
                    if (member.presence.status === "offline") {
                        member.roles.add(offline_role);
                    } else {
                        member.roles.remove(offline_role);
                    }
                })
            }
        })
        console.log("All servers' offline roles updated succesfully.");
    }
}
