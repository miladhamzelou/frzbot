var request = require('request');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var searchURL = 'http://www.omdbapi.com/?t=' + cmd.args + '&y=&plot=short&r=json';

    request(searchURL, function (error, response, results) {
      if (!error) {
        var message = '';
        results = JSON.parse(results);
        if (results.Response) {
          message += 'نام: ' + results.Title + '\n';
          message += 'سال: ' + results.Year + '\n';
          message += 'ژانر: ' + results.Genre + '\n';
          message += 'امتیاز: ' + results.imdbRating + '\n';
          message += 'پوستر: ' + results.Poster;
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
