var jsonfile = require('jsonfile');
var access;

var functions = {
	init: function() {
		if(!access) {
			var file = './core/access.json';
			access = jsonfile.readFileSync(file);
		}
	},
	reload: function() {
		var file = './core/access.json';
		access = jsonfile.readFileSync(file);
	},
  checkAccess: function(cmd, callback) {
		var hasAccess = true;
		var keys = Object.keys(access);
		for(var i = 0; i < keys.length; i++) {
			if(access[keys[i]].cmds.indexOf(cmd.cmd) > -1 && access[keys[i]].chatIds.indexOf(cmd.chat.id) === -1) {
				hasAccess = false;
				break;
			}
		}
		if(hasAccess) {
			callback(undefined, cmd);
		}
		else {
			callback('access denied!', cmd);
		}
  }
};

module.exports = functions;
