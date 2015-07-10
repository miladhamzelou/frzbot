var phantom = require('phantom');
var util = require('./../util');

var funstions = {
  execute: function (cmd) {
    var page = Math.floor((Math.random() * 1095));
    var searchURL = 'http://www.definebabe.com/galleries/page' + page;

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
        page.open(searchURL, function (status) {
          page.evaluate(function () {
            var links = document.querySelectorAll('div.thumb a');
            var index = Math.floor((Math.random() * links.length));
            return links[index].getAttribute('href');
          }, function (galleryLink) {
            if (galleryLink) {
              page.open('http://www.definebabe.com' + galleryLink, function (status) {
                page.evaluate(function () {
                  var links = document.querySelectorAll('section.model div.thumb a');
                  var index = Math.floor(((Math.random() * links.length) + links.length) / 2);
                  return links[index].getAttribute('href');
                }, function (imageUrl) {
                  if (imageUrl) {
                    var data = {
                      chat_id: cmd.chat.id,
                      imageUrl: imageUrl
                    };
                    util.sendImageFromUrl(data);
                  }
                  ph.exit();
                });
              });
            }
          });
        });
      });
    });
  }
};

module.exports = funstions;