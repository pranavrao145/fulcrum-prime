function getRoleFromMention(message, mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('&')) {
            mention = mention.slice(1);
        }

        return message.guild.roles.cache.get(mention);
    }
}

function getUserFromMention(message, mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return message.guild.members.cache.get(mention);
	}
}


module.exports = {
    getRoleFromMention,
    getUserFromMention
}
