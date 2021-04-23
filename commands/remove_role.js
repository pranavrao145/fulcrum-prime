const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
  name: "remove_role",
  alias: ["rr"],
  description: "Removes the given role from the given user(s).",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.reply(
        "incorrect syntax! Correct syntax: f!removerole [role mention] [user mentions]"
      );
      return;
    }

    let role = getRoleFromMention(message, args.shift());

    if (!role) {
      message.reply("the role specified was not valid. Please try again.");
      return;
    }

    args.forEach((mention) => {
      let user = getUserFromMention(message, mention);

      if (!user) {
        message.reply("a user supplied was invalid, so skipping over them.");
        return;
      }

      user.roles
        .remove(role)
        .then(() => {
          message.reply(
            `role ${role.name} successfully removed from ${user.user.tag}`
          );
        })
        .catch((err) => {
          message.reply("a user supplied was invalid, so skipping over them.");
          console.log(err);
          return;
        });
    });
  },
};
