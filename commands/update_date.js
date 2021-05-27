module.exports = {
    name: "update_date",
    alias: ["ud"],
    description: "Update the date in the date voice channel.",
    execute(message = null, client, con) {

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr", 
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday", 
        ];

        if (message !== null) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.").catch();
                return;
            }
            let guild = message.guild;

            con.query(`SELECT *
                       FROM datechannel
                       WHERE guildid = '${guild.id}'`, (err, res) => {
                           if (err) throw err;

                           let row = res.rows[0];
                           let vc;

                           if (row) {
                               vc = guild.channels.cache.get(row.channelid);
                           }

                           if (!vc) {
                               message.channel.send("Sorry, date channel feature not set up on this server. An admin can run f!integrate datechannel [voice_channel_role] to set this feature up.").catch()
                           } else {
                               let date = new Date();
                               let vcName = vc.name;
                               let toBeSetName =   
                                   "📅|" +
                                   days[date.getDay()] +
                                   ", " +
                                   months[date.getMonth()] +
                                   " " +
                                   date.getDate() +
                                   ", " +
                                   date.getFullYear();
                                
                               if (!vcName !== toBeSetName) {
                                   vc.setName(toBeSetName).catch();
                                   message.channel.send("Date updated successfully.").catch();
                                   console.log("Date update triggered.")
                               }
                               else {
                                   message.channel.send("Date updated successfully.").catch();
                               }
                           }
                       })
            return;
        }

        const Guilds = client.guilds.cache.map((guild) => guild.id);
        let date = new Date();

        Guilds.forEach((element) => {
            let guild = client.guilds.cache.get(element);
            con.query(`SELECT *
                       FROM datechannel
                       WHERE guildid = '${guild.id}'`, (err, res) => {
                           if (err) throw err;

                           let row = res.rows[0];
                           let vc;

                           if (row) {
                               vc = guild.channels.cache.get(row.channelid);
                           }

                           if (vc) {
                               let vcName = vc.name;
                               let toBeSetName =   
                                   "📅|" +
                                   days[date.getDay()] +
                                   ", " +
                                   months[date.getMonth()] +
                                   " " +
                                   date.getDate() +
                                   ", " +
                                   date.getFullYear();
                                
                               if (!vcName !== toBeSetName) {
                                   vc.setName(toBeSetName).then(c => {
                                    console.log(`Date updated successfully in ${c.guild.name}.`)
                                   }).catch();
                               }
                           }
                       })
        });
    },
};
