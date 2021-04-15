require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
const prefix = "f!";
const schedule = require("node-schedule");
const {Client} = require("pg");

const con = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

con.connect(err => {
    if (err) throw err;
    console.log("Connected to database!")
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        status: "online"
    }).then(r => console.log(r));

    schedule.scheduleJob("0 0 * * *", function () {
        client.commands.get("update_date").execute(null, client, con);
    }); // run everyday at midnight

    client.commands.get("update_date").execute(null, client, con);
    client.commands.get("update_offline").execute(null, client);
    client.commands.get("update_member_count").execute(null, client, con);
    client.commands.get("update_channel_count").execute(null, null, client, con);

});

client.login(process.env.BOT_TOKEN).then();

client.on("voiceStateUpdate", (oldState, newState) => {
    if (!newState.channel || (!newState.member && oldState.channel)) {
        // if user leaves all voice channels
        const role = newState.guild.roles.cache.find(
            (r) => r.name === oldState.channel.name
        );
        if (!role) return;

        if (!newState.member.roles.cache.has(role))
            newState.member.roles.remove(role).then(() => "Removed voice channel role from user.");
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
            if (!newState.member.roles.cache.has(old_role))
                newState.member.roles.remove(old_role).then(() => "Removed voice channel role from user.");
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );

            if (!old_role || !new_role) {
                return;
            }

            if (!newState.member.roles.cache.has(new_role))
                newState.member.roles.add(new_role).then(() => "Added voice channel role to user.");
        }
        // if the user is not coming from an old channel, adds new role from new channel
        if (newState.channelID === testChannel.id && !oldState.channel) {
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );
            if (!new_role) return;

            if (!newState.member.roles.cache.has(new_role))
                newState.member.roles.add(new_role).then(() => "Added voice channel role to user.");
        }
    }
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
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
    } else if (command === "updateoffline" || command === "uo") {
        client.commands.get("update_offline").execute(message, client);
    } else if (command === "updatedate" || command === "ud") {
        client.commands.get("update_date").execute(message, client, con);
    } else if (command === "help" || command === "h") {
        client.commands.get("help").execute(message)
    } else if (command === "clearvoice" || command === "cv") {
        client.commands.get("clear_voice_channel").execute(message, args)
    } else if (command === "movevoice" || command === "mv") {
        client.commands.get("move_voice_channel").execute(message, args)
    } else if (command === "integrate" || command === "ig") {
        client.commands.get("integrate").execute(message, args, con, client)
    } else if (command === "services" || command === "s") {
        client.commands.get("services").execute(message);
    } else if (command === "updatemembercount" || command === "umc") {
        client.commands.get("update_member_count").execute(message, client, con);
    } else if (command === "updatechannelcount" || command === "ucc") {
        client.commands.get("update_channel_count").execute(null, message, client, con);
    }
});


client.on("presenceUpdate", (oldPresence, newPresence) => {
    let server = newPresence.guild;
    let offline_role = server.roles.cache.find(role => role.name.toLowerCase() === "offline");

    if (!offline_role) return;

    let member = newPresence.member;

    if (newPresence.user.presence.status === "offline" || newPresence.user.presence.status === "invisible") {
        member.roles.add(offline_role).then(() => console.log("Assigned offline role to user"));
    } else {
        member.roles.remove(offline_role).then(() => console.log("Removed offline role from user"));
    }

})

client.on("guildMemberAdd", () => {
    client.commands.get("update_member_count").execute(null, client, con);
})

client.on("guildMemberRemove", () => {
    client.commands.get("update_member_count").execute(null, client, con);
})


client.on("channelCreate", (channel) => {
    client.commands.get("update_channel_count").execute(channel.guild, null, client, con);
});

client.on("channelDelete", (channel) => {
    client.commands.get("update_channel_count").execute(channel.guild, null, client, con);
});
