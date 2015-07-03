var request = require('request');
var http = require('http');
var https = require('https');
var fs = require('fs');
var jsonfile = require('jsonfile');
var config = jsonfile.readFileSync('./config.json');
var env = process.env.NODE_ENV;

var functions = {
  sendMessage: function(data) {
    request.post(config[env].url.snd + 'sendMessage').form(data);
  },
  sendImageFromUrl: function(data) {
    var ext = data.imageUrl.substr(data.imageUrl.length - 4);
    var fileName = './temp/' + Math.floor((Math.random() * 999999)) + ext;
    var file = fs.createWriteStream(fileName);

    if(data.imageUrl.indexOf('https') > -1) {
      https.get(data.imageUrl, callback);
    }
    else {
      http.get(data.imageUrl, callback);
    }

    function callback(response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(function() {
          delete data.imageUrl;
          var method;
          if(ext === '.gif') {
            method = 'sendDocument';
            data.document = fs.createReadStream(fileName);
          }
          else {
            method = 'sendPhoto';
            data.photo = fs.createReadStream(fileName);
          }
          request.post({url: config[env].url.snd + method, formData: data}, function() {
            fs.unlink(fileName);
          });
        });
      });
    }
  }
};

module.exports = functions;
