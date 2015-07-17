var util = require('./../../util');
var Command = require('./../../models/Command');

var functions = {
  execute: function(cmd) {
    Command.find({}).exec(function(err, commands) {
      var all = 0;
      var map = {};
      commands.forEach(function(command) {
        if(map[command.cmd]) {
          map[command.cmd]++;
        }
        else {
          map[command.cmd] = 1;
        }
        all++;
      });
      var sortable = [];
      Object.keys(map).forEach(function(key) {
        sortable.push([key, map[key]]);
      });
      sortable.sort(function(a, b) {
        return b[1] - a[1];
      });
      var message = 'All commands count: ' + all + '\n';
      sortable.forEach(function(pair) {
        var percent = (pair[1] / all) * 100;
        message += pair[0] + '\n';
        for(var i = 0; i < percent; i++) {
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
