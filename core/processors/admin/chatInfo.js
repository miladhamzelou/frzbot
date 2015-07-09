var util = require('./../../util');

var functions = {
  execute: function(cmd) {
    var fromGroup = cmd.chat.id < 0;
    var infoMessage;
    if(fromGroup) {
      infoMessage = 'Title: ' + cmd.chat.title + ' id: ' + cmd.chat.id;
    }
    else {
      infoMessage = 'Username: ' + cmd.chat.username + ' id: ' + cmd.chat.id;
    }
    var data = {
      chat_id: 21826676,
      text: infoMessage
    };
    util.sendMessage(data);
  }
};

module.exports = functions;
