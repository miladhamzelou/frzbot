var request = require('request');
var util = require('./../util');

var randData = [{
  text: 'نیت کردی؟',
  keyboard: ['کردم'],
}, {
  text: 'هر وقت آماده بودی بگو...',
  keyboard: ['آماده شدم'],
}, {
  text: 'واقعا فال می خوای؟',
  keyboard: ['آره دیگه'],
}, {
  text: 'اول نیت کن!',
  keyboard: ['باشه'],
}];

var functions = {
  execute: function (cmd) {
    var randDataIndex = Math.floor((Math.random() * randData.length));

    var keyboard = {
      keyboard: [
        randData[randDataIndex].keyboard
      ],
      one_time_keyboard: true,
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
    var searchURL = 'http://emrani.net/Hafez/api/hafez/fal';

    request(searchURL, function (error, response, results) {
      if (!error) {
        var message = '';
        results = JSON.parse(results);
        if (results) {
          message = 'غزل شماره ' + results.id + '\n\n' + results.poem + '\n-- حافظ';
        } else {
          message += 'سرویس در دسترس نیست!';
        }

        var keyboard = {
          hide_keyboard: true,
          selective: false
        };

        var data = {
          chat_id: cmd.chat.id,
          reply_markup: JSON.stringify(keyboard),
          text: message
        };
        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
