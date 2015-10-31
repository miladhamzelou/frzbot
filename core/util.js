var request = require('request');
var http = require('http');
var https = require('https');
var fs = require('fs');
var jsonfile = require('jsonfile');
var config = jsonfile.readFileSync('./config.json');
var env = process.env.NODE_ENV;

var functions = {
	sendMessage: function(data) {
		var options = {
			url: config[env].url.snd + 'sendMessage',
			form: data
		};
		request.post(options, function(err, httpResponse, body) {
			console.log("message sent.");
		});
	},
	sendImage: function(data, name) {
		data.photo = fs.createReadStream('./files/' + name);
		request.post({
			url: config[env].url.snd + 'sendPhoto',
			formData: data
		}, function() {
			console.log("photo sent.");
		});
	}
};

module.exports = functions;
