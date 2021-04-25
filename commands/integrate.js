const { getRoleFromMention } = require("../utils");
module.exports = {
    name: "integrate",
    alias: ["ig"],
    description: "Command to integrate Fulcrum with various other entities.",

    execute(message, args, con, client) {
        
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("sorry, only an administrator can use this command.");
                return;
            }

            if (!args[0]) {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!integrate [service_command] [mention/role]. See f!services for a full list of services Fulcrum offers."
                );
                return;
            }

            if (args[0] === "channelcount") {
                // integrating channel count let roleFromMention = getRoleFromMention(message, args[1]);

                if (!args[1]) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate channelcount [voice channel role]"
                    );
                    return;
                }

                if (!roleFromMention) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate channelcount [voice channel role]"
                    );
                    return;
                }

                let guild = message.guild;
                let voice_channel = message.guild.channels.cache.find(
                    (r) => r.name === roleFromMention.name && r.type === "voice"
                );

                if (!voice_channel) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate channelcount [voice channel role]"
                    );
                    return;
                }

                con.query(
                    `SELECT *
                       FROM channelcountchannel
                       WHERE guildid = '${guild.id}'`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        }
                        let query;
                        if (res.rows[0]) {
                            query = `
                        UPDATE channelcountchannel
                        SET guildid   = '${guild.id}',
                            channelid = '${voice_channel.id}'
                        WHERE guildid = '${guild.id}'
                    `;
                        } else {
                            query = `INSERT INTO channelcountchannel(guildid, channelid)
                             VALUES ('${guild.id}', '${voice_channel.id}')`;
                        }
                        con.query(query, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                message.channel.send("Channel count channel set successfully.");
                                client.commands
                                    .get("update_channel_count")
                                    .execute(null, message, client, con);
                            }
                        });
                    }
                );
            } else if (args[0] === "membercount") {
                // integrating member count
                let roleFromMention = getRoleFromMention(message, args[1]);

                if (!args[1]) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate membercount [voice channel role]"
                    );
                    return;
                }

                if (!roleFromMention) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate membercount [voice channel role]"
                    );
                    return;
                }

                let guild = message.guild;
                let voice_channel = message.guild.channels.cache.find(
                    (r) => r.name === roleFromMention.name && r.type === "voice"
                );

                if (!voice_channel) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate membercount [voice channel role]"
                    );
                    return;
                }

                con.query(
                    `SELECT *
                       FROM membercountchannel
                       WHERE guildid = '${guild.id}'`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        }
                        let query;
                        if (res.rows[0]) {
                            query = `
                        UPDATE membercountchannel
                        SET guildid   = '${guild.id}',
                            channelid = '${voice_channel.id}'
                        WHERE guildid = '${guild.id}'
                    `;
                        } else {
                            query = `INSERT INTO membercountchannel(guildid, channelid)
                             VALUES ('${guild.id}', '${voice_channel.id}')`;
                        }
                        con.query(query, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                message.channel.send("member count channel set successfully.");
                                client.commands
                                    .get("update_member_count")
                                    .execute(null, message, client, con);
                            }
                        });
                    }
                );
            } else if (args[0] === "statusroles") {

                let guild = message.guild;

                let offline_role = guild.roles.cache.find(
                    (r) => r.name.toLowerCase() === "offline"
                );

                let idle_role = guild.roles.cache.find(
                    (r) => r.name.toLowerCase() === "idle"
                );

                if (!offline_role) {
                    guild.roles
                        .create({
                            data: { name: "offline" },
                        })
                        .then(() => console.log("Offline role created successfully."))
                        .catch((err) => {
                            message.channel.send("Sorry, there was an error in creating an idle role.");
                            
                        });
                }

                if (!idle_role) {
                    guild.roles
                        .create({
                            data: {
                                name: "idle",
                                color: "#FAA61A",
                            },
                        })
                        .then(() => console.log("Idle role created successfully."))
                        .catch((err) => {
                            message.channel.send("Sorry, there was an error in creating an idle role.");
                            
                        });
                }

                message.channel.send("Status roles created successfully. You can update them at anytime using f!update statusroles")

            } else if (args[0] === "vcroles") {
                let guild = message.guild;

                guild.channels.cache
                    .filter((c) => c.type === "voice")
                    .forEach((vc) => {
                        let vc_role = guild.roles.cache.find((r) => r.name === vc.name);

                        if (vc_role) {
                            console.log("Role already exists.");
                            return;
                        }

                        guild.roles
                            .create({
                                data: { name: `${vc.name}` },
                            })
                            .then(() =>
                                console.log(
                                    `Voice channel role for ${vc.name} created successfully`
                                )
                            );
                    });

                message.channel.send(
                    "voice channel roles set up or updated successfully. NOTE: if you have voice channels with the same names as text channels, voice channel roles may not work properly. Recommended to ensure this is not the case."
                );
            } else if (args[0] === "datechannel") {
                let roleFromMention = getRoleFromMention(message, args[1]);

                if (!args[1]) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate datechannel [voice channel role]"
                    );
                    return;
                }

                if (!roleFromMention) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate datechannel [voice channel role]"
                    );
                    return;
                }

                let guild = message.guild;
                let voice_channel = message.guild.channels.cache.find(
                    (r) => r.name === roleFromMention.name && r.type === "voice"
                );

                if (!voice_channel) {
                    message.channel.send(
                        "Incorrect syntax! Correct syntax: f!integrate datechannel [voice channel role]"
                    );
                    return;
                }

                con.query(
                    `SELECT *
                       FROM datechannel
                       WHERE guildid = '${guild.id}'`,
                    (err, res) => {
                        if (err) {
                            throw err;
                        }
                        let query;
                        if (res.rows[0]) {
                            query = `
                        UPDATE datechannel
                        SET guildid   = '${guild.id}',
                            channelid = '${voice_channel.id}'
                        WHERE guildid = '${guild.id}'
                    `;
                        } else {
                            query = `INSERT INTO datechannel(guildid, channelid)
                             VALUES ('${guild.id}', '${voice_channel.id}')`;
                        }
                        con.query(query, (err) => {
                            if (err) {
                                throw err;
                            } else {
                                message.channel.send("date channel set successfully.");
                                client.commands.get("update_date").execute(message, client, con);
                            }
                        });
                    }
                );
            } else if (args[0] === "polling") {
                let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === "can-vote");

                if (role) {
                    console.log("can-vote role already exists.");
                    return;
                }

                message.guild.roles.create({
                    data: {
                        name: "can-vote"
                    } 
                }).then(() => {
                    console.log("can-vote role created successfully.");
                }).catch((err) => {
                    throw err;
                })

                message.channel.send("can-vote role created successfully.");
            }
            else {
                message.channel.send(
                    "Incorrect syntax! Correct syntax: f!integrate [service command] [mention/role]. See f!services for a full list of services Fulcrum offers."
                );
            }

    },
};
