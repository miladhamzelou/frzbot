var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var pageNumber = Math.floor((Math.random() * 4000));
    var searchURL = 'http://www.pornhub.com/gifs?page=' + pageNumber;

    request(searchURL, function (error, response, results) {
      var ch = cheerio.load(results);
      var thumbs = ch('img.thumb');
      var thumbIndex = Math.floor((Math.random() * thumbs.length));
      var thumb = thumbs[thumbIndex];
      if(thumb) {
        var imageUrl = thumb.attribs['data-gif-url'];
        data = {
          chat_id: cmd.chat.id,
          imageUrl: imageUrl
        };
        util.sendImageFromUrl(data);
      }
    });
  }
};

module.exports = funstions;
