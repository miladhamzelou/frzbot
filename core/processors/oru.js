var request = require('request');
var jsonfile = require('jsonfile');
var util = require('./../util');
var config = jsonfile.readFileSync('./core/processors/oru.json');

var functions = {
  execute: function(cmd) {
    var start = Math.floor((Math.random() * config[cmd.cmd].limit));
    var searchURL = config[cmd.cmd].api + start;

    request(searchURL, function (error, response, results) {
      if (!error) {
        var result = JSON.parse(results)[0];
        if (result) {
          var data = {
            chat_id: cmd.chat.id,
            imageUrl: config[cmd.cmd].prev + result.preview
          };
          util.sendImageFromUrl(data);
        }
      }
    });
  }
};

module.exports = functions;
