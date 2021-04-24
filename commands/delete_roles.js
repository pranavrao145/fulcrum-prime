const { getRoleFromMention } = require("../utils");

module.exports = {
  name: "delete_roles",
  alias: ["dr"],
  description: "Deletes the given role(s) from the server.",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.channel.send("Sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.channel.send(
        "Incorrect syntax! Correct syntax: f!deleteroles [role mentions (separated by space)]"
      );
      return;
    }

    args.forEach((mention) => {
      let role = getRoleFromMention(message, mention);

      if (!role) {
        message.channel.send(
          "Could not delete a role because the role was invalid. Skipping over it for now."
        );
        return;
      }

      role
        .delete()
        .then((res) => {
          message.channel.send(`Role ${res.name} deleted successfully.`);
        })
        .catch((err) => {
          message.channel.send(
            "There was an error deleting a role. Skipping over it for now."
          );
          console.log(err);
        });
    });
  },
};
