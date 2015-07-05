var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var pageNumber = Math.floor((Math.random() * 4000));
    var searchURL = 'http://www.pornhub.com/gifs?page=' + pageNumber;

    request(searchURL, function (error, response, results) {
      if(error) {
        console.log(error);
      }

      var ch = cheerio.load(results);
      var thumbs = ch('img.thumb');

      console.log(thumbs.length);

      var thumbIndex = Math.floor((Math.random() * thumbs.length));

      console.log(thumbIndex);

      var thumb = thumbs[thumbIndex];

      console.log(thumb);

      if(thumb) {
        var imageUrl = thumb.attribs['data-gif-url'];

        console.log(imageUrl);

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
