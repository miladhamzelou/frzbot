var request = require('request');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var searchURL = 'http://www.aparat.com/etc/api/videoBySearch/text/' + encodeURIComponent(cmd.args) + '/perpage/1';

    request(searchURL, function (error, response, results) {
      if (!error) {
        var message = '';

        var result = JSON.parse(results).videobysearch[0];
        if (result) {
          message = 'http://www.aparat.com/v/' + result.uid;
        } else {
          message += 'نتیجه ای یافت نشد!';
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
