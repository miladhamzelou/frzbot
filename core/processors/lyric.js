var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    if(cmd.args) {
      var searchURL = 'http://search.azlyrics.com/search.php?q=' + cmd.args.replace(' ', '+');
      request(searchURL, function (error, response, results) {
        var ch = cheerio.load(results);
        var link = ch('td.text-left a').attr('href');
        if(link) {
          request(link, function (error, response, results) {
            var ch = cheerio.load(results);
            var b = ch(ch('div.ringtone')[0]).next('b');
            var title = b.text();
            var divs = ch('div');
            divs.each(function(i, elem) {
              var div = ch(elem);
              if(!div.attr('class') && div.parent().attr('class') === 'col-xs-12 col-lg-8 text-center') {
                var data = {
                  chat_id: cmd.chat.id,
                  text: title + '\n' + div.text()
                };
                util.sendMessage(data);
              }
            });
          });
        }
      });
    }
  }
};

module.exports = functions;
