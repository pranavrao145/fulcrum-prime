module.exports = {
  name: "update_idle",
  alias: ["ui"],
  description:
    "Give people that are idle the idle role, and remove the idle role from others.",
  execute(message = null, client) {
    if (message !== null) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.reply("sorry, only an administrator can use this command.");
        return;
      }

      let guild = message.guild;
      let idle_role = guild.roles.cache.find(
        (role) => role.name.toLowerCase() === "idle"
      );

      if (!idle_role) {
        return;
      } else {
        guild.members.cache.forEach((member) => {
          if (member.presence.status === "idle") {
            member.roles.add(idle_role);
          } else {
            member.roles.remove(idle_role);
          }
        });
        console.log("All servers' idle roles updated succesfully.");
        return;
      }
    }

    const Guilds = client.guilds.cache.map((guild) => guild.id);

    Guilds.forEach((element) => {
      let guild = client.guilds.cache.get(element);
      let idle_role = guild.roles.cache.find(
        (role) => role.name.toLowerCase() === "idle"
      );

      if (idle_role) {
        guild.members.cache.forEach((member) => {
          if (member.presence.status === "idle") {
            member.roles.add(idle_role);
          } else {
            member.roles.remove(idle_role);
          }
        });
      }
    });
    console.log("All servers' idle roles updated succesfully.");
  },
};
