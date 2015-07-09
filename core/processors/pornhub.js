var phantom = require('phantom');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var page;
    var url;

    if (cmd.args) {
      page = Math.floor((Math.random() * 5));
      url = 'http://www.pornhub.com/gifs/search?search=' + cmd.args.replace(' ', '+') + '&page=' + page;
    } else {
      page = Math.floor((Math.random() * 4000));
      url = 'http://www.pornhub.com/gifs?page=' + page;
    }

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.onResourceRequested(function (requestData, request) {
          if (requestData.url.indexOf('.jpg') > -1 ||
            requestData.url.indexOf('.gif') > -1 ||
            requestData.url.indexOf('.png') > -1 ||
            requestData.url.indexOf('.css') > -1 ||
            requestData.url.indexOf('.js') > -1 ||
            requestData.url.indexOf('ads') > -1) {
            request.abort();
          }
        });
        page.open(url, function (status) {
          page.evaluate(function () {
            var urls = [];
            var thumbs = document.querySelectorAll('img.thumb');
            for (var i = 0; i < thumbs.length; i++) {
              urls.push(thumbs[i].getAttribute('data-gif-url'));
            }
            return urls;
          }, function (result) {
            if (result.length > 0) {
              var index = Math.floor((Math.random() * result.length));
              var data = {
                chat_id: cmd.chat.id,
                imageUrl: result[index]
              };
              util.sendImageFromUrl(data, true);
            }
            ph.exit();
          });
        });
      });
    });
  }
};

module.exports = functions;
