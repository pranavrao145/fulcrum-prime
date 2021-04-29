require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
const prefix = "f!";
const schedule = require("node-schedule");
const { Client } = require("pg");
const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to database!");
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user
        .setPresence({
            status: "online",
            activity: {
                name: "f!help",
                type: "WATCHING",
            },
        })
        .then((r) => console.log(r))

    schedule.scheduleJob("0 0 * * *", function () {
        client.commands.get("update_date").execute(null, client, con);
    }); // run everyday at midnight

    client.commands.get("update_date").execute(null, client, con);
    client.commands.get("update_offline").execute(null, client);
    client.commands.get("update_vcroles").execute(null, client);
    client.commands.get("update_idle").execute(null, client);
});

client.login(process.env.BOT_TOKEN).catch((e) => {
    throw err;
});

client.on("voiceStateUpdate", (oldState, newState) => {
    if (!newState.channel || (!newState.member && oldState.channel)) {
        // if user leaves all voice channels
        const role = newState.guild.roles.cache.find(
            (r) => r.name === oldState.channel.name
        );
        if (!role) return;

        newState.member.roles
            .remove(role)
            .then(() => "Removed voice channel role from user.").catch((e) => {
                console.log("Error");
            });
    } else {
        // gets new channel
        const testChannel = newState.guild.channels.cache.find(
            (c) => c.name === newState.channel.name
        );
        // if the user is coming from another channel remove the role from that one and put in the new channel role
        if (newState.channelID === testChannel.id && oldState.channel) {
            const old_role = newState.guild.roles.cache.find(
                (r) => r.name === oldState.channel.name
            );
            newState.member.roles
                .remove(old_role)
                .then(() => "Removed voice channel role from user.").catch(e => {
                    console.log("Error");
                });
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );

            if (!old_role || !new_role) {
                return;
            }

            newState.member.roles
                .add(new_role)
                .then(() => "Added voice channel role to user.").catch(e => {
                    console.log("Error"); 
                });
        }
        // if the user is not coming from an old channel, adds new role from new channel
        if (newState.channelID === testChannel.id && !oldState.channel) {
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );
            if (!new_role) return;

            newState.member.roles
                .add(new_role)
                .then(() => "Added voice channel role to user.").catch(e => {
                    console.log("Error");
                });
        }
    }
});

client.on("message", (message) => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || message.guild === null)
        return;

    const args = message.content
        .toLowerCase()
        .slice(prefix.length)
        .trim()
        .split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "translate" || command === "tr") {
        client.commands.get("translate").execute(message, args);
    } else if (command === "polling" || command === "pm") {
        client.commands.get("polling").execute(message, args);
    } else if (command === "define" || command === "df") {
        client.commands.get("define").execute(message, args);
    } else if (command === "randomwords" || command === "rw") {
        client.commands.get("random_words").execute(message, args);
    } else if (command === "randomnumber" || command === "rn") {
        client.commands.get("random_number").execute(message, args);
    } else if (command === "help" || command === "h") {
        client.commands.get("help").execute(message, args);
    } else if (command === "clearvoice" || command === "cv") {
        client.commands.get("clear_voice_channel").execute(message, args);
    } else if (command === "movevoice" || command === "mv") {
        client.commands.get("move_voice_channel").execute(message, args);
    } else if (command === "integrate" || command === "ig") {
        client.commands.get("integrate").execute(message, args, con, client);
    } else if (command === "services" || command === "s") {
        client.commands.get("services").execute(message);
    } else if (command === "update" || command === "ud") {
        client.commands.get("update").execute(message, args, client, con);
    } else if (command === "createrole" || command == "cr") {
        client.commands.get("create_role").execute(message, args);
    } else if (command === "createroles" || command == "crs") {
        client.commands.get("create_roles").execute(message, args);
    } else if (command === "deleteroles" || command == "dr") {
        client.commands.get("delete_roles").execute(message, args);
    } else if (command === "assignrole" || command == "ar") {
        client.commands.get("assign_role").execute(message, args);
    } else if (command === "removerole" || command == "rr") {
        client.commands.get("remove_role").execute(message, args);
    } else if (command === "clearroles" || command == "clr") {
        client.commands.get("clear_roles").execute(message, args);
    } else if (command === "assignroles" || command === "ars") {
        client.commands.get("assign_roles").execute(message, args);
    } else if (command === "removeroles" || command === "rrs") {
        client.commands.get("remove_roles").execute(message, args);
    } else if (command === "start") {
        client.commands.get("start").execute(message, null);
    } else if (command === "clearchat" || command === "cc") {
        client.commands.get("clear_chat").execute(message, args);
    }
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
    let server = newPresence.guild;

    let idle_role = server.roles.cache.find(
        (role) => role.name.toLowerCase() === "idle"
    );
    let offline_role = server.roles.cache.find(
        (role) => role.name.toLowerCase() === "offline"
    );

    if (!(idle_role || offline_role)) return;

    let member = newPresence.member;

    if (newPresence.user.presence.status === "idle") {
        if (offline_role) {
            member.roles.remove(offline_role).then(() => {
                console.log("Removed offline role from user.");
            }).catch(e => {
                console.log("Error");
            });
        }

        if (idle_role) {
            member.roles.add(idle_role).then(() => {
                console.log("Added idle role to user.");
            }).catch(e =>
                {
                    console.log("Error");
                });
        }
    } else if (newPresence.user.presence.status === "offline") {
        if (idle_role) {
            member.roles.remove(idle_role).then(() => {
                console.log("Removed idle role from user.");
            }).catch(e => {
                console.log("Error");
            });
        }

        if (offline_role) {
            member.roles.add(offline_role).then(() => {
                console.log("Added offline role to user.");
            }).catch(e => {
                console.log("Error");
            });
        }
    } else {
        if (offline_role) {
            member.roles.remove(offline_role).then(() => {
                console.log("Removed offline role from user.");
            }).catch(e => {
                console.log("Error");
            });
        }

        if (idle_role) {
            member.roles.remove(idle_role).then(() => {
                console.log("Removed idle role from user.");
            }).catch(e => {
                console.log("Error");
            });
        }
    }
});

client.on("guildMemberAdd", (channel) => {
    client.commands
        .get("update_member_count")
        .execute(channel.guild, null, client, con);
});

client.on("guildMemberRemove", (channel) => {
    client.commands
        .get("update_member_count")
        .execute(channel.guild, null, client, con);
});

client.on("channelCreate", (channel) => {
    client.commands
        .get("update_channel_count")
        .execute(channel.guild, null, client, con);
});

client.on("channelDelete", (channel) => {
    client.commands
        .get("update_channel_count")
        .execute(channel.guild, null, client, con);
});

client.on("guildCreate", (guild) => {
    let channel = guild.systemChannel;

    channel.send("Hi there! Thanks for adding me to your server! Take a look at the message below to get started!");

    client.commands.get("start").execute(null, channel);

    channel.send("**IMPORTANT:** Given that Fulcrum Prime offers a variety of admin tools, please **ensure my role is above any role you want me to modify.** Otherwise, my features will not work properly.");

})
