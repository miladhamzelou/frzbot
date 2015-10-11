var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    request('http://nudeclassical.com/random/', function (error, response, results) {
      if (!error) {
        var ch = cheerio.load(results);
        var imgs = ch('img.img-responsive');
        var imageUrl = imgs.attr('src');
        console.log(imageUrl);
        data = {
          chat_id: cmd.chat.id,
          imageUrl: 'http://nudeclassical.com' + imageUrl
        };
        util.sendImageFromUrl(data);
      }
    });
  }
};

module.exports = funstions;
