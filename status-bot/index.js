const Discord = require('discord.js');
const { prfx, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

  if (message.content.startsWith(`${prfx}ping`)) {
	// send back "Pong." to the channel the message was sent in
	message.channel.send('I\'m up, I\'m up!');
  }
});

client.login(token);
