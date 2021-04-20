const { getRoleFromMention, getUserFromMention } = require("../utils");

module.exports = {
  name: "assign_role",
  alias: ["ar"],
  description: "Adds the given role to the given user(s).",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.reply(
        "incorrect syntax! Correct syntax: f!assignrole {role_mention} {user_mentions}"
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
        .add(role)
        .then(() => {
          message.reply(
            `role ${role.name} successfully added to ${user.user.tag}`
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
