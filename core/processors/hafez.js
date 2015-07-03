var request = require('request');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
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

        var data = {
          chat_id: cmd.chat.id,
          text: message
        };
        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
