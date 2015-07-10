var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var searchURL = 'http://www.definebabe.com/galleries/page2/';

    request({
      url: searchURL, //URL to hit
      method: 'GET'
    }, function (error, response, results) {
      if (!error) {
        var message = '';
        var ch = cheerio.load(results);
        var means = ch('div.thumb a');
        means.each(function (i, mean) {
          console.log(ch(mean).attr('href'));
        });
      }
    });
  }
};

module.exports = funstions;
