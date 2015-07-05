var Access = require('./../../models/Access');
var util = require('./../../util');

var functions = {
  execute: function(cmd) {
    var args = cmd.args.split(' ');
    var chatId = parseInt(args[0]);
    var accessId = args[1];

    Access.update({ _id: accessId }, { $addToSet: { chatIds: chatId } }).exec(function(err) {
      if(!err) {
        var data = {
          chat_id: 21826676,
          text: 'ChatId added!'
        };
        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
