const dictionary = require("word-definition");

module.exports = {
    name: "define",
    alias: ["df"],
    description: "Define a word.",
    execute(msg, args) {
        if (args[0]) {
            dictionary.getDef(args[0].toLowerCase(), "en", null, (definition) => {
                if (definition["definition"] != undefined) {
                    msg.reply("definition of *" + definition["word"] + "* (" + definition["category"] + "): " + definition["definition"]);
                } else {
                    msg.reply("no definition found for *" + definition["word"] + "*. " + "Please check your spelling and try again.")
                }
            })
        }
        else {
            msg.reply("incorrect syntax! Correct syntax: f!define {word}");
        }

    }
}
