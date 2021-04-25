const translate = require("@iamtraction/google-translate");

module.exports = {
    name: "translate",
    alias: ["tr"],
    description: "Translate a sentence.",
    execute(message, args) {
        try {
            let to_lang = args.shift();
            let text = args.join(" ")

            if (!to_lang || !text || to_lang.length !== 2) {
                message.channel.send("Invalid syntax! Correct syntax: f!translate [language to translate to (2 letter code)] [text]")
                return;
            }

            translate(text, {to: to_lang}).then(result => {
                message.channel.send("Translation to *" + to_lang + "*: '" + result.text + "'");
            }).catch(console.error);

        } catch (e) {
            return;
        }
    }
}
