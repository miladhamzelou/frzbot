var util = require('./../../util');
var User = require('./../../models/User');

var functions = {
  execute: function(cmd) {
    User.find({}).exec(function(err, users) {
      var message = '';
      users.forEach(function(user) {
        message += 'ID: ' + user._id + '\n';
        message += 'firstName: ' + user.firstName + '\n';
        message += 'Username: ' + user.username + '\n';
        message += '-------------\n';
      });
      var data = {
        chat_id: 21826676,
        text: message
      };
      util.sendMessage(data);
    });
  }
};

module.exports = functions;
