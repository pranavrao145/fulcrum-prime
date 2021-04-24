const randomWords = require("random-words");

module.exports = {
  name: "random_words",
  alias: ["rw"],
  description: "Provide a number of random words.",
  execute(message, args) {
      if (args.length > 0) {
          let words = randomWords(parseInt(args[0], 10));
          let message = "";
          for (let i = 0; i < words.length - 1; i++) {
              message += words[i] + ", ";
          }
          message += words[words.length - 1];
          message.channel.send("here are your random words: " + message);
      }
      else {
          message.channel.send("here is your random word: " + randomWords());
      }
}}
