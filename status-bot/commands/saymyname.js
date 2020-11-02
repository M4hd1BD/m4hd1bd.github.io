module.exports = {
	name: 'saymyname',
	description: 'Know your name.',
	execute(message, args) {
		message.channel.send(`You're ${message.author}`);
	},
};
