module.exports = {
    name: "update_member_count",
    alias: ["umc"],
    description: "Updates the member count for the server.",
    execute(guild = null, message = null, con) {
        
            if (message !== null) {
                if (!message.member.hasPermission("ADMINISTRATOR")) {
                    message.reply("sorry, only an administrator can use this command.").catch();
                    return;
                }
                let guild = message.guild;

                con.query(
                    `SELECT *
                       FROM membercountchannel
                       WHERE guildid = '${guild.id}'`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        }

                        let row = res.rows[0];
                        let vc;

                        if (row) {
                            vc = guild.channels.cache.get(row.channelid);
                        } else {
                            console.log("no row");
                        }

                        if (!vc) {
                            message.channel.send(
                                "Sorry, member count channel has not been set up yet. An admin f!integrate membercount [voice_channel_role] to set this feature up."
                            ).catch();
                        } else {
                            let count = guild.members.cache.filter((member) => !member.user.bot)
                                .size;
                            vc.setName(`👥|Member Count: ${count}`).catch();
                            message.channel.send("Member count updated successfully!").catch();
                        }
                    }
                );
                return;
            } else if (guild !== null) {
                con.query(
                    `SELECT *
                             FROM membercountchannel
                             WHERE guildid = '${guild.id}'`,
                    (err, res) => {
                        if (err) throw err;

                        let row = res.rows[0];
                        let vc;

                        if (row) {
                            vc = guild.channels.cache.get(row.channelid);
                        }

                        if (vc) {
                            let count = guild.members.cache.filter((member) => !member.user.bot)
                                .size;
                            vc.setName(`👥|Member Count: ${count}`).then(() =>
                                console.log("Member count updated successfully.")
                            ).catch(() => {
                                console.log("Error in updating member count.")
                            }); 
                        }
                    }
                );
                return;
            }
    },
};
