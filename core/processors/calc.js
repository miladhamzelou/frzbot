var request = require('request');
var math = require('mathjs');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var data = {
      chat_id: cmd.chat.id,
      text: math.eval(cmd.args)
    };
    util.sendMessage(data);
  }
};

module.exports = functions;
