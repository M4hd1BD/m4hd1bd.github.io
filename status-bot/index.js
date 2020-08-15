const Discord = require('discord.js');
const { prfx, tkn } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {
	if (message.content.startsWith(`${prfx}ping`)) {
		message.channel.send('I\'m up, I\'m up!');
	}
});

client.login(tkn);
