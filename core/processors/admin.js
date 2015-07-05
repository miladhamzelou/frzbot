var jsonfile = require('jsonfile');
var util = require('./../util');
var access = require('./../access');
var Command = require('./../models/Command');
var Group = require('./../models/Group');
var User = require('./../models/User');

var functions = {
  info: function(cmd) {
    var fromGroup = cmd.chat.id < 0;
    var infoMessage;
    if(fromGroup) {
      infoMessage = 'Title: ' + cmd.chat.title + ' id: ' + cmd.chat.id;
    }
    else {
      infoMessage = 'Username: ' + cmd.chat.username + ' id: ' + cmd.chat.id;
    }
    var data = {
      chat_id: 21826676,
      text: infoMessage
    };
    util.sendMessage(data);
  },
  addAccess: function(cmd) {
    var args = cmd.args.split(' ');
    var chatId = parseInt(args[0]);
    var accessGroup = args[1];
    var accessObj = jsonfile.readFileSync('./core/access.json');
    if(accessObj[accessGroup] && accessObj[accessGroup].chatIds.indexOf(chatId) === -1) {
      accessObj[accessGroup].chatIds.push(chatId);
    }
    jsonfile.writeFileSync('./core/access.json', accessObj);
    access.reload();
  },
  removeAccess: function(cmd) {
    var args = cmd.args.split(' ');
    var chatId = parseInt(args[0]);
    var accessGroup = args[1];
    var accessObj = jsonfile.readFileSync('./core/access.json');
    if(accessObj[accessGroup] && accessObj[accessGroup].chatIds.indexOf(chatId) > -1) {
      var index = accessObj[accessGroup].chatIds.indexOf(chatId);
      accessObj[accessGroup].chatIds.splice(index, 1);
    }
    jsonfile.writeFileSync('./core/access.json', accessObj);
    access.reload();
  },
  allGroups: function(cmd) {
    Group.find({}).execute(function(err, groups) {
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

var functions = {
  execute: function(cmd) {
    functions[cmd.cmd](cmd);
  }
};

module.exports = functions;
