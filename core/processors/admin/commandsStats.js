var util = require('./../../util');
var Command = require('./../../models/Command');

var functions = {
  execute: function(cmd) {
    Command.find({}).exec(function(err, commands) {
      var map = {
        all: 0
      };
      commands.forEach(function(command) {
        if(map[command.cmd]) {
          map[command.cmd]++;
        }
        else {
          map[command.cmd] = 1;
        }
        map.all++;
      });

      var message = '';
      Object.keys(map).forEach(function(key) {
        if(key === 'all') {
          message += 'All commands count: ' + map.all + '\n';
          return;
        }
        var percent = (map[key] / map.all) * 100;
        var colonCount = Math.floor((map[key] / map.all) * 40);
        message += key + ':\n';
        for(; colonCount > 0; colonCount--) {
          message += ':';
        }
        message += ' ' + percent.toFixed(2) + '%\n';
      });

      var data = {
        chat_id: 21826676,
        text: message
      };
      util.sendMessage(data);
    });
  }
};

module.exports = functions;
