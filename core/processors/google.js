var request = require('request');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var searchURL = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + encodeURIComponent(cmd.args);

    request(searchURL, function (error, response, results) {
      if (!error) {
        var message = '';

        result = JSON.parse(results).responseData.results[0];
        if (result) {
          message = result.unescapedUrl;
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
