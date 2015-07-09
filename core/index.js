var jsonfile = require('jsonfile');
var Command = require('./models/Command');
var Group = require('./models/Group');
var User = require('./models/User');
var Access = require('./models/Access');
var commands;
var processors = {};

var privates = {
  setSender: function (update) {
    User.findById(update.message.from.id).exec(function (err, user) {
      if (user) {
        update.sender = user;
        privates.setGroup(update);
      } else {
        privates.createAndSetSender(update);
      }
    });
  },
  createAndSetSender: function (update) {
    var user = new User();
    user._id = update.message.from.id;
    user.username = update.message.from.username;
    user.firstName = update.message.from.first_name;
    user.save(function (err) {
      update.sender = user;
      privates.setGroup(update);
    });
  },
  setGroup: function (update) {
    //chat == user
    if (update.message.chat.id > 0) {
      privates.createCommand(update);
    } else {
      Group.findById(update.message.chat.id).exec(function (err, group) {
        if (group) {
          update.group = group;
          privates.createCommand(update);
        } else {
          privates.createAndSetGroup(update);
        }
      });
    }
  },
  createAndSetGroup: function (update) {
    var group = new Group();
    group._id = update.message.chat.id;
    group.title = update.message.chat.title;
    group.save(function (err) {
      update.group = group;
      privates.createCommand(update);
    });
  },
  createCommand: function (update) {
    var command = new Command();
    command.cmd = update.command.cmd;
    if (update.message.text.indexOf(' ') > -1) {
      command.args = update.message.text.substr(update.message.text.indexOf(' ') + 1);
    }
    command.processor = update.command.processor;
    command.sender = update.sender;
    command.group = update.group;
    command.timestamp = new Date().getTime();

    command.save(function (err) {
      command.chat = {};
      command.chat.id = command.group ? command.group._id : command.sender._id;
      privates.checkAccess(command);
    });
  },
  checkAccess: function (command) {
    Access.find({}).exec(function (err, accesses) {
      var hasAccess = true;
      for (var i = 0; i < accesses.length; i++) {
        if (accesses[i].cmds.indexOf(command.cmd) > -1 && accesses[i].chatIds.indexOf(command.chat.id) === -1) {
          hasAccess = false;
          break;
        }
      }
      if (hasAccess) {
        privates.executeCommand(command);
      }
    });
  },
  executeCommand: function (command) {
    if (!processors[command.processor]) {
      processors[command.processor] = require('./processors/' + command.processor);
    }

    processors[command.processor].execute(command);
  }
};

var functions = {
  init: function () {
    if (!commands) {
      var file = './core/commands.json';
      commands = jsonfile.readFileSync(file);
    }
  },
  proccessUpdate: function (update) {
    var tmpCommand = update.message.text.substr(1).split(' ')[0];
    for (var i = 0; i < commands.length; i++) {
      if (commands[i].cmd === tmpCommand ||
        (commands[i].aliases && commands[i].aliases.indexOf(tmpCommand) > -1)) {
        update.command = commands[i];
        break;
      }
    }

    if (update.command) {
      privates.setSender(update);
    }
  }
};

module.exports = functions;