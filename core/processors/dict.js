var request = require('request');
var cheerio = require('cheerio');
var util = require('./../util');

var langs = {
  fa: '0',
  ar: '1',
  en: '2',
  fr: '3',
  de: '4',
  it: '5'
};

var funstions = {
  execute: function (cmd) {
    var searchURL = 'http://www.ariadic.com/natije_query.php';
    var langCode = '20';
    var temp = cmd.args.split(' ')[0];

    if (temp) {
      var from = temp.split('-')[0];
      var to = temp.split('-')[1];

      if (from && to) {
        var fromIsValid = false;
        var fromCode;
        var toIsValid = false;
        var toCode;
        var keys = Object.keys(langs);

        if (keys.indexOf(from) > -1) {
          fromCode = langs[from];
          fromIsValid = true;
        }
        if (keys.indexOf(to) > -1) {
          toCode = langs[to];
          toIsValid = true;
        }

        var error;
        if (!fromIsValid) {
          error = 'زبان مبدا معتبر نیست!';
        }

        if (!toIsValid) {
          error = 'زبان مقصد معتبر نیست!';
        }

        if (fromCode !== '0' && toCode !== '0') {
          error = 'یکی از دو زبان مبدا و مقصد باید فارسی باشد!';
        }

        if (fromCode === toCode) {
          error = 'ربان مبدا و مقصد باید متفاوت باشد!';
        }

        if(error) {
          var data = {
            chat_id: cmd.chat.id,
            text: error
          };
          util.sendMessage(data);
        }

        langCode = fromCode + toCode;
        cmd.args = cmd.args.substr(cmd.args.indexOf(' ') + 1);
      }
    }

    request({
      url: searchURL, //URL to hit
      method: 'POST',
      form: {
        Lang: langCode,
        queryString: cmd.args
      }
    }, function (error, response, results) {
      if (!error) {
        var message = '';
        var ch = cheerio.load(results);
        var means = ch('div.mean');
        var meaning = '';
        means.each(function (i, mean) {
          meaning += ch(mean).text() + ', ';
        });

        if (meaning) {
          message = meaning;
        } else {
          message += 'نتیجه ای یافت نشد!';
        }

        var data = {
          chat_id: cmd.chat.id,
          text: message
        };
        util.sendMessage(data);
      }
    });
  }
};

module.exports = funstions;
