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
    console.log(client.guilds.cache.size)
    client.user
        .setPresence({
            status: "online",
            activity: {
                name: "f!help",
                type: "WATCHING",
            },
        })
        .then((r) => console.log(r)).catch();

    schedule.scheduleJob("0 0 * * *", function () {
        client.commands.get("update_date").execute(null, client, con);
    }); // run everyday at midnight

    client.commands.get("update_vcroles").execute(null, client);
});

client.login(process.env.BOT_TOKEN).catch((e) => {
    throw err;
});

client.on("voiceStateUpdate", (oldState, newState) => {
    // three situations - user leaves all voice channels, user joins a new voice channel from an old one, user joins a vc without an old channel

    if (oldState.channel && !newState.channel) { // if user leaves all voice channels
        let oldRole = oldState.guild.roles.cache.find(r => r.name === oldState.channel.name);    

        if (!oldRole) return;

        oldState.member.roles.remove(oldRole).then(() => {
            console.log("Voice channel role removed succesfully.")
        }).catch(() => {
            console.log("Error updating voice channel role.");
        });
    }
    else if (oldState.channel && newState.channel) {
        let oldRole = oldState.guild.roles.cache.find(r => r.name === oldState.channel.name);    
        let newRole = newState.guild.roles.cache.find(r => r.name === newState.channel.name);    

        if (oldRole) {
            oldState.member.roles.remove(oldRole).then(() => {
                console.log("Voice channel role removed succesfully.")
            }).catch(() => {
                console.log("Error updating voice channel role.");
            });
        }

        if (newRole) {
            newState.member.roles.add(newRole).then(() => {
                console.log("Voice channel role added succesfully.")
            }).catch(() => {
                console.log("Error updating voice channel role.");
            });

        }
    } else if (!oldState.channel && newState.channel) {
        let newRole = newState.guild.roles.cache.find(r => r.name === newState.channel.name);    

        if (!newRole) {
            return;
        }

        newState.member.roles.add(newRole).then(() => {
            console.log("Voice channel role added succesfully.")
        }).catch(() => {
            console.log("Error updating voice channel role.");
        });

    }
});

client.on("message", (message) => {
    if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot || message.guild === null)
        return;

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "translate" || command === "tr") {
        client.commands.get("translate").execute(message, args);
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
    } else if (command === "purgechat" || command === "pc") {
        client.commands.get("purge_chat").execute(message, args);
    } else if (command === "supportserver" || command === "ss") {
        client.commands.get("support_server").execute(message);
    } else if (command === "ban") {
        client.commands.get("ban").execute(message, args);
    } else if (command === "kick") {
        client.commands.get("kick").execute(message, args);
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
    let channel = guild.systemChannel || guild.channels.cache.filter(c => c.type === "text").filter(c => c.permissionsFor(guild.me).has("SEND_MESSAGES")).first();

    if (channel) {
        channel.send("Hi there! Thanks for adding me to your server! Take a look at the message below to get started!");

        client.commands.get("start").execute(null, channel);

        channel.send("**IMPORTANT:** Given that Fulcrum Prime offers a variety of admin tools, please **ensure my role is above any role you want me to modify, and that I can view and manage all channels you want me managing.** Otherwise, my features will not work properly.").catch();
        channel.send("Join our support server: https://discord.com/invite/gR59PU2ufS").catch();
        channel.send("If you like the bot, please consider upvoting: https://top.gg/bot/827156281164955679").catch();
    }
})
