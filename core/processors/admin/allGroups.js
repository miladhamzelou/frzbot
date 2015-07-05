var util = require('./../../util');
var Group = require('./../../models/Group');

var functions = {
  execute: function(cmd) {
    Group.find({}).exec(function(err, groups) {
      var message = '';
      groups.forEach(function(group) {
        message += 'ID: ' + group._id + '\n';
        message += 'Title: ' + group.title + '\n';
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
