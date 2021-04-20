const { getRoleFromMention } = require("../utils");

module.exports = {
  name: "delete_roles",
  alias: ["dr"],
  description: "Deletes the given role(s) from the server.",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.reply(
        "incorrect syntax! Correct syntax: f!deleteroles {role_mentions (separated by space)}"
      );
      return;
    }

    args.forEach((mention) => {
      let role = getRoleFromMention(message, mention);

      if (!role) {
        message.reply(
          "could not delete a role because the role supplied was invalid. Please try again."
        );
        return;
      }

      role
        .delete()
        .then((res) => {
          message.reply(`role ${res.name} deleted successfully.`);
        })
        .catch((err) => {
          message.reply(
            "there was an error deleting a role, likely because Fulcrum does not have permission to do so. Skipping over it for now."
          );
          console.log(err);
        });
    });
  },
};
