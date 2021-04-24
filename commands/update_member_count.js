module.exports = {
  name: "update_member_count",
  alias: ["umc"],
  description: "Updates the member count for the server.",
  execute(guild = null, message = null, client, con) {
    if (message !== null) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.channel.send("Sorry, only an administrator can use this command.");
        return;
      }
      let guild = message.guild;

      con.query(
        `SELECT *
                       FROM membercountchannel
                       WHERE guildid = '${guild.id}'`,
        (err, res) => {
          if (err) {
            throw err;
          }

          let row = res.rows[0];
          let vc;

          if (row) {
            vc = guild.channels.cache.get(row.channelid);
          } else {
            console.log("no row");
          }

          if (!vc) {
            message.channel.send(
              "sorry, member count channel has not been set up yet. An admin f!integrate membercount [voice_channel_role] to set this feature up."
            );
          } else {
            let count = guild.members.cache.filter((member) => !member.user.bot)
              .size;
            vc.setName(`👥|Member Count: ${count}`);
            message.channel.send("member count updated successfully!");
          }
        }
      );
      return;
    } else if (guild !== null) {
      con.query(
        `SELECT *
                             FROM membercountchannel
                             WHERE guildid = '${guild.id}'`,
        (err, res) => {
          if (err) throw err;

          let row = res.rows[0];
          let vc;

          if (row) {
            vc = guild.channels.cache.get(row.channelid);
          }

          if (vc) {
            let count = guild.members.cache.filter((member) => !member.user.bot)
              .size;
            vc.setName(`👥|Member Count: ${count}`).then(() =>
              console.log("Member count updated successfully.")
            );
          }
        }
      );
      return;
    }

    const Guilds = client.guilds.cache.map((guild) => guild.id);

    Guilds.forEach((element) => {
      let guild = client.guilds.cache.get(element);
      con.query(
        `SELECT *
                       FROM membercountchannel
                       WHERE guildid = '${guild.id}'`,
        (err, res) => {
          if (err) throw err;

          let row = res.rows[0];
          let vc;

          if (row) {
            vc = guild.channels.cache.get(row.channelid);
          }

          if (vc) {
            let count = guild.members.cache.filter((member) => !member.user.bot)
              .size;
            vc.setName(`👥|Member Count: ${count}`).then(() =>
              console.log("Member count updated successfully.")
            );
          }
        }
      );
    });
  },
};
