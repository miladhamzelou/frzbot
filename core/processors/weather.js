var request = require('request');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var searchURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=45094424e567f999475f555d3e7a3d0a&q=' + cmd.args;

    request(searchURL, function (error, response, results) {
      if (!error) {
        results = JSON.parse(results);
        var temp = results.main.temp.toFixed(1);
        var data = {
          chat_id: cmd.chat.id,
          text: 'دمای هوای ' + cmd.args + ' برابر است با ' + temp + ' درجه سانتیگراد.'
        };

        util.sendMessage(data);
      }
    });
  }
};

module.exports = functions;
