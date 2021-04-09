require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
client.commands = new Discord.Collection();
const prefix = "f!";
const schedule = require("node-schedule");
const {Client} = require("pg");

const con = new Client({
    connectionString: process.env.DATABASE_URL
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
    });

    schedule.scheduleJob("0 0 * * *", function () {
        client.commands.get("update_date").execute(client);
    }); // run everyday at midnight

    client.commands.get("update_date").execute(null, client);
    client.commands.get("update_offline").execute(null, client);

});

client.login(process.env.BOT_TOKEN);

client.on("voiceStateUpdate", (oldState, newState) => {
    if (!newState.channel || (!newState.member && oldState.channel)) {
        // if user leaves all voice channels
        const role = newState.guild.roles.cache.find(
            (r) => r.name === oldState.channel.name
        );
        if (!role) return;

        if (!newState.member.roles.cache.has(role))
            newState.member.roles.remove(role);
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
                newState.member.roles.remove(old_role);
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );

            if (!old_role || !new_role) {
                return;
            }

            if (!newState.member.roles.cache.has(new_role))
                newState.member.roles.add(new_role);
        }
        // if the user is not coming from an old channel, adds new role from new channel
        if (newState.channelID === testChannel.id && !oldState.channel) {
            const new_role = newState.guild.roles.cache.find(
                (r) => r.name === newState.channel.name
            );
            if (!new_role) return;

            if (!newState.member.roles.cache.has(new_role))
                newState.member.roles.add(new_role);
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
        client.commands.get("update_date").execute(message, client);
    } else if (command === "help" || command === "h") {
        client.commands.get("help").execute(message)
    }
});


client.on("presenceUpdate", (oldPresence, newPresence) => {
    let server = newPresence.guild;
    let offline_role = server.roles.cache.find(role => role.name === "offline" || role.name === "Offline");

    if (!offline_role) return;

    let member = newPresence.member;

    if (newPresence.user.presence.status === "offline" || newPresence.user.presence.status === "invisible") {
        member.roles.add(offline_role);
    } else {
        member.roles.remove(offline_role);
    }

})