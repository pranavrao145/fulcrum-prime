module.exports = {
    name: "update_date",
    alias: ["ud"],
    description: "Update the date in the date voice channel.",
    execute: function (message = null, client) {
        if (message !== null) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.reply("Sorry, only an administrator can use this command.");
                return;
            }
        }
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

        const Guilds = client.guilds.cache.map((guild) => guild.id);
        let date = new Date();

        Guilds.forEach((element) => {
            let guild = client.guilds.cache.get(element);

            let channel = guild.channels.cache.find((channel) =>
                channel.name.includes("📅")
            );
            if (channel) {
                channel.setName(
                    "📅|" +
                    days[date.getDay()] +
                    ", " +
                    months[date.getMonth()] +
                    " " +
                    date.getDate() +
                    ", " +
                    date.getFullYear()
                );
            }
        });
        if (message !== null) {
            message.reply("date updated successfully.")
        }
    },
};
