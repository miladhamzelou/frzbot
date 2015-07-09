var util = require('./../../util');
var Group = require('./../../models/Group');

var functions = {
  execute: function(cmd) {
    Group.find({}).exec(function(err, groups) {
      groups.forEach(function(group) {
        var data = {
          chat_id: group._id,
          force_reply: true,
          text: cmd.args
        };
        util.sendMessage(data);
      });
    });
  }
};

module.exports = functions;
