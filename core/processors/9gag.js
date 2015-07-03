var request = require('request');
var http = require('http');
var fs = require('fs');
var feed = require("feed-read");
var cheerio = require('cheerio');
var util = require('./../util');

var functions = {
  execute: function (cmd) {

    var section = cmd.args;
    var atomUrl = '';

    switch (section) {
    case 'hot':
      atomUrl = 'http://9gag-rss.com/api/rss/get?code=9GAGHot&format=1';
      break;
    case 'trend':
      atomUrl = 'http://9gag-rss.com/api/rss/get?code=9GAG&format=1';
      break;
    case 'nsfw':
      atomUrl = 'http://9gag-rss.com/api/rss/get?code=9GAGNSFW&format=1';
      break;
    case 'gif':
      atomUrl = 'http://9gag-rss.com/api/rss/get?code=9GAGGIF&format=1';
      break;
    default:
      atomUrl = 'http://9gag-rss.com/api/rss/get?code=9GAGHot&format=1';
    }

    request(atomUrl, function (error, response, results) {
      results = results.replace("\ufeff", "");
      feed.atom(results, function (err, items) {
        var index = Math.floor((Math.random() * items.length));
        var result = items[index];
        var message = '';
        if (result) {
          var ch = cheerio.load(result.content);
          imageUrl = ch('img').attr('src');

          var dataText = {
            chat_id: cmd.chat.id,
            text: result.title
          };
          util.sendMessage(data);

          var dataPhoto = {
            chat_id: cmd.chat.id,
            imageUrl: imageUrl
          };
          util.sendImageFromUrl(data);
        }
      });
    });
  }
};

module.exports = functions;
