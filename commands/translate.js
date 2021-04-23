const translate = require("@iamtraction/google-translate");

module.exports = {
  name: "translate",
  alias: ["tr"],
  description: "Translate a sentence.",
  execute(msg, args) {
      let to_lang = args.shift();
      let text = args.join(" ")

      if (!to_lang || !text || to_lang.length !== 2) {
          msg.reply("invalid syntax! Correct syntax: f!translate [language to translate to (2 letter code)] [text]")
          return;
      }

      translate(text, {to: to_lang}).then(result => {
          msg.reply('translation to *' + to_lang + "*: '" + result.text + "'");
      }).catch(console.error);

}}
