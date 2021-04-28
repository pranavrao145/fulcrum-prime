module.exports = {
    name: "clear_chat",
    description: "Clears a bulk of messages given a number of messages to clear.",
    execute(message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.reply("sorry, only an administrator can use this command.")
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!clearchat [number of messages to clear (2-100)]");
            return;
        }


        let parsedNum = parseInt(args[0]);
        if (isNaN(parsedNum)) {
            message.channel.send("That is not a valid number. Please enter a number from 2-100.");
            return;
        }

        if (!(parsedNum <= 100 && parsedNum >= 2)) {
            message.channel.send("That is not a valid number. Please enter a number from 2-100.");
            return;
        }
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.channel.bulkDelete(parsedNum).then(() => {
                message.channel.send("Messages deleted successfully.");
            }).catch(() => {
                message.channel.send("There was an error in deleting those messages.");
            });

            message.delete().catch(); 
        } 
        else {
            message.channel.send("There was an error in deleting those messages.");
        }
    }
}
