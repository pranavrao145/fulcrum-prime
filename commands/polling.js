module.exports = {
  name: "polling",
  alias: ["pm"],
  description: "Gives users the role can-vote to access polling channels.",
  execute(message, args) {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("sorry, only an administrator can use this command.");
      return;
    }

    if (args.length == 0) {
      message.reply(
        "Invalid syntax! Correct syntax: f!polling [on/off]"
      );
      return;
    }

    let action = args[0];
    let role = message.guild.roles.cache.find((r) => r.name === "can-vote");

    if (!role) {
      message.reply(
        "please create the can-vote role for this command to work."
      );
      return;
    }

    if (action === "enable") {
      message.guild.members.cache
        .array()
        .filter((m) => !m.user.bot)
        .forEach((member) => {
          member.roles.add(role);
        });
        message.reply("polling mode enabled successfully.");
    }
    else if (action === "disable") {
        message.guild.members.cache
        .array()
        .filter((m) => !m.user.bot)
        .forEach((member) => {
          member.roles.remove(role);
        });
        message.reply("polling mode disabled successfully.");
    }
    else {
        message.reply("that is not a valid option. Please try again with a valid option.")
    }
  },
};
