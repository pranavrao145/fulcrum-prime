module.exports = {
    name: "clear_chat",
    description: "Clears a bulk of messages given a number of messages to clear.",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply("sorry, you need the MANAGE_MESSAGES permission to use this command.").catch();
            return;
        }

        if (args.length === 0) {
            message.channel.send("Invalid syntax! Correct syntax: f!clearchat [number of messages to clear (2-100)]").catch();
            return;
        }


        let parsedNum = parseInt(args[0]);
        if (isNaN(parsedNum)) {
            message.channel.send("That is not a valid number. Please enter a number from 2-100.").catch();
            return;
        }

        if (!(parsedNum <= 100 && parsedNum >= 2)) {
            message.channel.send("That is not a valid number. Please enter a number from 2-100.").catch();
            return;
        }
        if (message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            message.delete().catch(); 

            message.channel.bulkDelete(parsedNum).catch(() => {
                message.channel.send("There was an error in deleting those messages.").catch();
            });

        } 
        else {
            message.channel.send("There was an error in deleting those messages.").catch();
        }
    }
}
