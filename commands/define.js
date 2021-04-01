const dictionary = require("word-definition");

module.exports = {
  name: "define",
  alias: ["df"],
  description: "Define a word.",
  execute(msg, args) {
      dictionary.getDef(args[0].toLowerCase(), "en", null, (definition) => {
        if (definition["definition"] != undefined) {  
            msg.reply("definition of *" + definition["word"] + "* (" + definition["category"] + "): " + definition["definition"]);
        }
        else {
            msg.reply("no definition found for *" + definition["word"] + "*. " + "Please check your spelling and try again.")
        }
      })
}}
