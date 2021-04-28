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
                    message.reply("sorry, only an administrator can use this command.");
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
                           } else {
                               console.log("no row");
                           }

                           if (!vc) {
                               message.channel.send("Sorry, date channel feature not set up on this server. An admin can run f!integrate datechannel [voice_channel_role] to set this feature up.")
                           } else {
                               let date = new Date();
                               vc.setName(
                                   "📅|" +
                                   days[date.getDay()] +
                                   ", " +
                                   months[date.getMonth()] +
                                   " " +
                                   date.getDate() +
                                   ", " +
                                   date.getFullYear()
                               );
                               message.channel.send("Date updated successfully.")
                           }
                       })
                return;
            }

    },
};
