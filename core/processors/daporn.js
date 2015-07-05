var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var pageNumber = Math.floor((Math.random() * 60));
    var searchURL = 'http://www.daporngifs.com/page/' + pageNumber;

    request(searchURL, function (error, response, results) {
      var ch = cheerio.load(results);
      var thumbs = ch('img.attachment-thumbnail');
      var thumbIndex = Math.floor((Math.random() * thumbs.length));
      var thumb = thumbs[thumbIndex];

      if(thumb) {
        var imageUrl = thumb.attribs.src;
        imageUrl = imageUrl.replace('-150x150', '');
        imageUrl = imageUrl.replace('jpg', 'gif');
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
