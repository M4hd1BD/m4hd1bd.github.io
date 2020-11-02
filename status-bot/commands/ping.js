module.exports = {
	name: 'ping',
	description: 'Check bot status.',
	execute(message, args) {
		message.channel.send('I\'m up, I\'m up!');
	},
};
