var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var pageNumber = Math.floor((Math.random() * 4000));
    var searchURL = 'http://www.pornhub.com/gifs?o=tr&page=' + pageNumber;

    var options = {
      url: searchURL,
      headers: {
        'Host': 'www.pornhub.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Referer': 'http://www.pornhub.com/gifs',
        'Cookie': 'platform=pc; RNLBSERVERID=ded1684; performance_timing=other; FastPopSessionRequestNumber=4; local_storage=1',
        'Connection': 'keep-alive'
      }
    };

    request(options, function (error, response, results) {
      if(error) {
        console.log(error);
      }

      console.log(results);

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
