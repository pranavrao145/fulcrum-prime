const { getRoleFromMention } = require("../utils");

module.exports = {
  name: "clear_roles",
  alias: ["clr"],
  description: "Removes the given role from all users that have it.",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.reply(
        "incorrect syntax! Correct syntax: f!clearrole {role_mention}"
      );
      return;
    }

    args.forEach((mention) => {
      let role = getRoleFromMention(message, mention);

      if (!role) {
        message.reply("could not clear a role given, skipping for now.");
        return;
      }

      let user_ids = role.members.map((mem) => mem.id);

      user_ids.forEach((id) => {
        let user = message.guild.members.cache.get(id);

        if (!user) {
          return;
        }

        user.roles
          .remove(role)
          .then(() => {
            message.reply(`the role ${role.name} removed successfully from user ${user.user.tag}`)
          })
          .catch((err) => {
            throw err;
          });
      });
    });
  },
};
