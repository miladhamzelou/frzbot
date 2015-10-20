var request = require('request');
var util = require('./../util');

var randData = [{
  text: 'چه شهری؟'
}, {
  text: 'دمای هوای کجا رو می خوای؟'
}, {
  text: 'یه شهر بگو تا بهت بگم!'
}, {
  text: 'تو کدوم شهر؟'
}];

var functions = {
  execute: function (cmd) {
    var randDataIndex = Math.floor((Math.random() * randData.length));

    var keyboard = {
      force_reply: true,
      selective: true
    };

    var data = {
      chat_id: cmd.chat.id,
      reply_markup: JSON.stringify(keyboard),
      text: randData[randDataIndex].text,
      reply_to_message_id: cmd.messageId
    };
    util.sendMessage(data);
  },
  handleReply: function (cmd) {
    var searchURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=45094424e567f999475f555d3e7a3d0a&q=' + cmd.args;

    request(searchURL, function (error, response, results) {
      if (!error) {
        results = JSON.parse(results);
        var temp = results.main.temp.toFixed(1);

        var keyboard = {
          hide_keyboard: true,
          selective: false
        };

        var data = {
          chat_id: cmd.chat.id,
          reply_markup: JSON.stringify(keyboard),
          text: 'دمای هوای ' + cmd.args + ' برابر است با ' + temp + ' درجه سانتیگراد.'
        };

        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
