var request = require('request');
var util = require('./../util');

var randData = [{
  text: 'به نظر من پاییز بهترین فصل ساله'
}, {
  text: 'پاییز قشنگه!'
}, {
  text: 'بهتر از پاییزم داریم مگه؟'
}, {
  text: 'یه فصل خاصه!'
}];

var functions = {
  execute: function (cmd) {
    var randDataIndex = Math.floor((Math.random() * randData.length));

    var data = {
      chat_id: cmd.chat.id,
      text: randData[randDataIndex].text,
      reply_to_message_id: cmd.messageId
    };
    util.sendMessage(data);
  }
};

module.exports = functions;
