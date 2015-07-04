var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var data = {
      chat_id: cmd.chat.id,
      text: 'Hello ' + cmd.sender.firstName + '!'
    };
    util.sendMessage(data);
  }
};

module.exports = functions;