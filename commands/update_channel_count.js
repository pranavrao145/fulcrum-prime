module.exports = {
  name: "update_channel_count",
  alias: ["ucc"],
  description: "Updates the channel count for the server.",
  execute(guild = null, msg = null, client, con) {
    if (msg !== null) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.reply("sorry, only an administrator can use this command.");
        return;
      }
      let guild = msg.guild;

      con.query(
        `SELECT *
                       FROM channelcountchannel
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
            msg.reply(
              "sorry, channel count channel has not been set up yet. An admin f!integrate channel [voice_channel_role] to set this feature up."
            );
          } else {
            let count = guild.channels.cache.filter(
              (c) => (c.type === "voice" || c.type === "text") && !c.deleted
            ).size;
            vc.setName(`💬|Channel Count: ${count}`);
            msg.reply("channel count updated successfully!");
          }
        }
      );
      return;
    } else if (guild !== null) {
      con.query(
        `SELECT *
                       FROM channelcountchannel
                       WHERE guildid = '${guild.id}'`,
        (err, res) => {
          if (err) throw err;

          let row = res.rows[0];
          let vc;

          if (row) {
            vc = guild.channels.cache.get(row.channelid);
          }

          if (vc) {
            let count = guild.channels.cache.filter(
              (c) => (c.type === "voice" || c.type === "text") && !c.deleted
            ).size;
            vc.setName(`💬|Channel Count: ${count}`).then(() =>
              console.log("Channel count updated successfully.")
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
                       FROM channelcountchannel
                       WHERE guildid = '${guild.id}'`,
        (err, res) => {
          if (err) throw err;

          let row = res.rows[0];
          let vc;

          if (row) {
            vc = guild.channels.cache.get(row.channelid);
          }

          if (vc) {
            let count = guild.channels.cache.filter(
              (c) => (c.type === "voice" || c.type === "text") && !c.deleted
            ).size;
            vc.setName(`💬|Channel Count: ${count}`).then(() =>
              console.log("Channel count updated successfully.")
            );
          }
        }
      );
    });
  },
};
