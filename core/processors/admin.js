var jsonfile = require('jsonfile');
var util = require('./../util');
var access = require('./../access');

function info(cmd) {
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
}

function addAccess(cmd) {
  var args = cmd.args.split(' ');
  var chatId = parseInt(args[0]);
  var accessGroup = args[1];
  var accessObj = jsonfile.readFileSync('./core/access.json');
  if(accessObj[accessGroup] && accessObj[accessGroup].chatIds.indexOf(chatId) === -1) {
    accessObj[accessGroup].chatIds.push(chatId);
  }
  jsonfile.writeFileSync('./core/access.json', accessObj);
  access.reload();
}

function removeAccess(cmd) {
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
}

var functions = {
  execute: function(cmd) {
    if(cmd.cmd === 'info') {
      info(cmd);
    } else if(cmd.cmd === 'addAccess') {
      addAccess(cmd);
    } else if(cmd.cmd === 'removeAccess') {
      removeAccess(cmd);
    }
  }
};

module.exports = functions;
