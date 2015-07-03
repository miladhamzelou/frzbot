var request = require('request');
var jsonfile = require('jsonfile');
var config = jsonfile.readFileSync('./config.json');
var env = process.env.NODE_ENV;

var functions = {
  sendMessage: function(data) {
    if(config[env].url.snd) {
      request.post(config[env].url.snd + 'sendMessage').form(data);
    }
    else {
      console.log(data);
    }
  }
};

module.exports = functions;
