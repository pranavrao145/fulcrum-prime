const dictionary = require("word-definition");

module.exports = {
    name: "define",
    alias: ["df"],
    description: "Define a word.",
    execute(message, args) {
        if (args[0]) {
            dictionary.getDef(args[0].toLowerCase(), "en", null, (definition) => {
                if (definition["definition"] != undefined) {
                    message.channel.send("Definition of *" + definition["word"] + "* (" + definition["category"] + "): " + definition["definition"]);
                } else {
                    message.channel.send("No definition found for *" + definition["word"] + "*. " + "Please check your spelling and try again.")
                }
            })
        }
        else {
            message.channel.send("Incorrect syntax! Correct syntax: f!define [word]");
        }

    }
}
