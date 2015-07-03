var request = require('request');
var http = require('http');
var https = require('https');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var start = Math.floor((Math.random() * 1)) * 8;
    var searchURL = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&rsz=8&q=' + encodeURIComponent(cmd.args) + '&imgsz=medium&start=' + start;

    request(searchURL, function (error, response, results) {
      if (!error) {
        results = JSON.parse(results).responseData.results;
        var index = Math.floor((Math.random() * results.length));
        var result = results[index];
        var data;
        if (result) {
          var imageUrl = result.unescapedUrl;

          data = {
            chat_id: cmd.chat.id,
            imageUrl: imageUrl
          };
          util.sendImageFromUrl(data);
        } else {
          data = {
            chat_id: cmd.chat.id,
            text: 'نتیجه ای یافت نشد!'
          };
          util.sendMessage(data);
        }
      }
    });
  }
};

module.exports = functions;
