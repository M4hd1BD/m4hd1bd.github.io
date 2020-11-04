module.exports = {
	name: 'cuteCat',
	description: 'Get a cute cat picture!',
	execute(message, args) {

		const { cuteCatKey } = require('../config.json');
		const http = require('https');
		const options = {
			'method': 'GET',
			'hostname': 'api.thecatapi.com',
			'port': null,
			'path': '/v1/images/search',
			'headers': {
				'x-api-key': cuteCatKey,
			},
		};

		const req = http.request(options, function(res) {
			let chunks = '';

			res.on('data', function(chunk) {
				chunks += chunk;
			});

			res.on('end', function() {
				const body = JSON.parse(chunks);
				const pic = body[0].url;

				message.channel.send(pic);
			});
		});

		req.end();
	},
};
