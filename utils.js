function getRoleFromMention(msg, mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('&')) {
            mention = mention.slice(1);
        }

        return msg.guild.roles.cache.get(mention);
    }
}

module.exports = {
    getRoleFromMention
}