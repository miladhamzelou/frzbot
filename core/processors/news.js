var util = require('./../util');
var feed = require("feed-read");

var randData = [{
  text: 'چه خبری می خوای؟'
}, {
  text: 'منبع خبر رو انتخاب کن!'
}, {
  text: 'از کجا برات خبر بیارم؟'
}, {
  text: 'بگو چه خبری می خوای؟'
}];

var functions = {
  execute: function (cmd) {
    var randDataIndex = Math.floor((Math.random() * randData.length));

    var keyboard = {
      keyboard: [
        ['همشهری', 'ورزش ۳', 'تابناک'],
        ['رادیو فردا', 'بی بی سی فارسی', 'دیجیاتو']
      ],
      one_time_keyboard: true,
      selective: true
    };

    var data = {
      chat_id: cmd.chat.id,
      reply_markup: JSON.stringify(keyboard),
      text: randData[randDataIndex].text,
      reply_to_message_id: cmd.messageId
    };
    util.sendMessage(data);
  },
  handleReply: function (cmd) {
    var url;
    if (cmd.args === 'همشهری') {
      url = 'http://www.hamshahrionline.ir/rss';
    } else if (cmd.args === 'ورزش ۳') {
      url = 'http://www.varzesh3.com/rss/rssMain.xml';
    } else if (cmd.args === 'تابناک') {
      url = 'http://www.tabnak.ir/fa/rss/1';
    } else if (cmd.args === 'رادیو فردا') {
      url = 'http://www.radiofarda.com/api/zpoqie-kqp';
    } else if (cmd.args === 'بی بی سی فارسی') {
      url = 'http://www.bbc.com/persian/iran/index.xml';
    } else if (cmd.args === 'دیجیاتو') {
      url = 'http://feeds.feedburner.com/Digiato?format=xml';
    }

    feed(url, function (err, items) {
      var text = '';
      for (var maxLength = 10; maxLength > 0; maxLength--) {
        var item = items[10 - maxLength];
        text += '* ' + item.title + '\n';
        if (item.content.indexOf('...') > -1) {
          item.content = item.content.substr(0, item.content.indexOf('...') + 3);
        }
        text += '-- ' + item.content + '\n';
        text += item.link + '\n';
        text += '-------------------- \n';

        if (maxLength % 5 === 1) {
          var keyboard = {
            hide_keyboard: true,
            selective: false
          };

          var data = {
            chat_id: cmd.chat.id,
            text: text,
            reply_markup: JSON.stringify(keyboard),
            disable_web_page_preview: true
          };
          util.sendMessage(data);
          text = '';
        }
      }
    });
  }
};

module.exports = functions;
