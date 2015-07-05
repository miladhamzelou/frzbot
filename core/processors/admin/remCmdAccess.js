var Access = require('./../../models/Access');
var util = require('./../../util');

var functions = {
  execute: function(cmd) {
    var args = cmd.args.split(' ');
    var command = args[0];
    var accessId = args[1];

    Access.update({ _id: accessId }, { $pull: { cmds: command } }).exec(function(err) {
      if(!err) {
        var data = {
          chat_id: 21826676,
          text: 'Cmd removed!'
        };
        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
