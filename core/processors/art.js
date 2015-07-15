var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    request('http://nudeclassical.com/random/', function (error, response, results) {
      if (!error) {
        var ch = cheerio.load(results);
        var imgs = ch('div.maincontent img.ph1000');
        var imageUrl = ch(imgs[0]).attr('src');
        data = {
          chat_id: cmd.chat.id,
          imageUrl: 'http://nudeclassical.com' + imageLink
        };
        util.sendImageFromUrl(data);
      }
    });
  }
};

module.exports = funstions;