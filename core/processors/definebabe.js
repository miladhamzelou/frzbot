var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var page = Math.floor((Math.random() * 1095));
    console.log(page);
    var searchURL = 'http://www.definebabe.com/galleries/page' + page;

    request(searchURL, function (error, response, results) {
      if (!error) {
        var ch = cheerio.load(results);
        var links = ch('div.thumb a');
        var galleryLink = ch(links[Math.floor((Math.random() * links.length))]).attr('href');
        request('http://www.definebabe.com' + galleryLink, function (error, response, results) {
          if (!error) {
            var ch = cheerio.load(results);
            var links = ch('section.model div.thumb a');
            var imageLink = ch(links[Math.floor(((Math.random() * links.length) + links.length) / 2)]).attr('href');
            data = {
              chat_id: cmd.chat.id,
              imageUrl: imageLink
            };
            util.sendImageFromUrl(data);
          }
        });
      }
    });
  }
};

module.exports = funstions;