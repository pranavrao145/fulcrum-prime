module.exports = {
    name: "support_server",
    description: "Displays the link for the support server.",
    execute(message) {
        message.channel.send("Join our support server: https://discord.gg/wep3QwHB").catch();
    }
}