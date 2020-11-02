module.exports = {
	name: 'avatar',
	aliases: ['dp', 'pfp'],
	description: 'Check out someones avatar.',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format:'png', dynamic: true })}>`);
		}

		const taggedUser = message.mentions.users.first();
		return message.channel.send(`${taggedUser}'s avatar: <${taggedUser.displayAvatarURL({ format:'png', dynamic: true })}>`);
	},
};
