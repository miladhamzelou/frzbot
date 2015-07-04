var jsonfile = require('jsonfile');
var Command = require('./models/Command');
var Group = require('./models/Group');
var User = require('./models/User');
var commands;
var processors = {};

var privates = {
  setSender: function (update, callback) {
    User.findById(update.message.from.id).exec(function (err, user) {
      if (user) {
        update.sender = user;
        privates.setGroup(update, callback);
      } else {
        privates.createAndSetSender(update, callback);
      }
    });
  },
  createAndSetSender: function (update, callback) {
    var user = new User();
    user._id = update.message.from.id;
    user.username = update.message.from.username;
    user.firstName = update.message.from.first_name;
    user.save(function (err) {
      update.sender = user;
      privates.setGroup(update, callback);
    });
  },
  setGroup: function (update, callback) {
    //chat == user
    if (update.message.chat.id > 0) {
      privates.createCommand(update, callback);
    } else {
      Group.findById(update.message.chat.id).exec(function (err, group) {
        if (group) {
          update.group = group;
          privates.createCommand(update, callback);
        } else {
          privates.createAndSetGroup(update, callback);
        }
      });
    }
  },
  createAndSetGroup: function (update, callback) {
    var group = new Group();
    group._id = update.message.chat.id;
    group.title = update.message.chat.title;
    group.save(function (err) {
      update.group = group;
      privates.createCommand(update, callback);
    });
  },
  createCommand: function (update, callback) {
    var command = new Command();
    command.cmd = update.command.cmd;
    command.args = update.message.text.substr(update.message.text.indexOf(' ') + 1);
    command.processor = update.command.processor;
    command.sender = update.sender;
    command.group = update.group;
    command.timestamp = new Date().getTime();

    command.save(function (err) {
      command.chat = {};
      command.chat.id = command.group ? command.group._id : command.sender._id;
      callback(undefined, command);
    });
  }
};

var functions = {
  init: function () {
    if (!commands) {
      var file = './core/commands.json';
      commands = jsonfile.readFileSync(file);
    }
  },
  fillCommandObject: function (update, callback) {
    var tmpCommand = update.message.text.substr(1).split(' ')[0];
    for (var i = 0; i < commands.length; i++) {
      if (commands[i].cmd === tmpCommand || commands[i].aliases.indexOf(tmpCommand) > -1) {
        update.command = commands[i];
        break;
      }
    }

    if (update.command) {
      privates.setSender(update, callback);
    } else {
      callback('cmd not found!', cmd);
    }
  },
  executeCommand: function (cmd) {
    if (!processors[cmd.processor]) {
      processors[cmd.processor] = require('./processors/' + cmd.processor);
    }

    processors[cmd.processor].execute(cmd);
  }
};

module.exports = functions;