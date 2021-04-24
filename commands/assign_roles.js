const { getUserFromMention, getRoleFromMention } = require("../utils");

module.exports = {
  name: "assign_roles",
  alias: ["ars"],
  description: "Assigns many roles to one user.",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply(
        "sorry, only an administrator can use this command."
      );
      return;
    }

    let userMention = args.shift();

    if (!userMention || !args[0]) {
        message.channel.send("Incorrect syntax! Correct syntax: f!assignroles [user] [list of roles]");
        return;
    }

    let member = getUserFromMention(message, userMention);

    if (!member) {
        message.channel.send("The user supplied was invalid.");
        return;
    }

    args.forEach(roleMention => {
        let role = getRoleFromMention(message, roleMention);
        
        if (!role) {
            message.channel.send("A role supplied was invalid. Skipping over it.");
            return;
        }

        member.roles.add(role).then(() => {
            message.channel.send(`Role ${role.name} successfully added to ${member.user.tag}`);            
        }).catch((err) => {
            // message.channel.send("There was an error in adding a role. Please try again.");
            // console.log(err);
            throw err;
        });
    });

  },
};
