var phantom = require('phantom');
var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var page = Math.floor((Math.random() * 4000));
    var url = 'http://www.pornhub.com/gifs?page=' + page;

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.open(url, function (status) {
          page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function () {
            setTimeout(function () {
              page.evaluate(function () {
                var urls = [];
                var thumbs = $('img.thumb');
                $.each(thumbs, function (index, thumb) {
                  urls.push($(thumb).data('gif-url'));
                });
                return urls;
              }, function (result) {
                if (result.length > 0) {
                  var index = Math.floor((Math.random() * result.length));
                  var data = {
                    chat_id: cmd.chat.id,
                    imageUrl: result[index]
                  };
                  util.sendImageFromUrl(data);
                }
                ph.exit();
              });
            }, 1000);
          });
        });
      });
    });
  }
};

module.exports = functions;