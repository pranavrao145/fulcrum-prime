const randomWords = require("random-words");

module.exports = {
    name: "random_words",
    alias: ["rw"],
    description: "Provide a number of random words.",
    execute(message, args) {
            if (args.length > 0) {
                let words = randomWords(parseInt(args[0], 10));
                let msg = "";
                for (let i = 0; i < words.length - 1; i++) {
                    msg += words[i] + ", ";
                }
                msg += words[words.length - 1];
                message.channel.send("Here are your random words: " + msg).catch();
            }
            else {
                message.channel.send("Here is your random word: " + randomWords()).catch();
            }

    }}
