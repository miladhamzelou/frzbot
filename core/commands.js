var jsonfile = require('jsonfile');
var commands;
var processors = {};

var functions = {
	init: function() {
		if(!commands) {
			var file = './core/commands.json';
			commands = jsonfile.readFileSync(file);
		}
	},
	fillCommandObject: function(update, callback) {
		var cmd = {};
		cmd.from = update.message.from;
		cmd.chat = update.message.chat;
		cmd.args = update.message.text.substr(update.message.text.indexOf(' ') + 1);
		var tmpCommand = update.message.text.substr(1).split(' ')[0];
		for(var i = 0; i< commands.length; i++) {
			if(commands[i].cmd === tmpCommand || commands[i].aliases.indexOf(tmpCommand) > -1) {
				cmd.cmd = commands[i].cmd;
				cmd.processor = commands[i].processor;
				break;
			}
		}
		if(cmd.cmd) {
			callback(undefined, cmd);
		}
		else {
			callback('cmd not found!', cmd);
		}
	},
	executeCommand: function(cmd) {
		if(!processors[cmd.processor]) {
			processors[cmd.processor] = require('./processors/' + cmd.processor);
		}

		processors[cmd.processor].execute(cmd);
	}
};

module.exports = functions;
