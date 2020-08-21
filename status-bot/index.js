const fs = require('fs');
const Discord = require('discord.js');
const { prfx, tkn } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {

	if (!message.content.startsWith(prfx) || message.author.bot) return;

	const args = message.content.slice(prfx.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) {
		return message.reply('Please make sure you wrote the right command.');
	}

	const command = client.commands.get(commandName);

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	// get a collection of triggered commands
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 5) * 1000;

	if (timestamps.has(message.author.id)) {

		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`slow down boi, wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	}

	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}

});

client.login(tkn);
