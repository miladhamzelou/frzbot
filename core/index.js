var commands = require('./commands');
var access = require('./access');

var index = {
  init: function() {
    commands.init();
    access.init();
  },
  proccessUpdate: function(update) {
    commands.fillCommandObject(update, function(err, cmd) {
      if(err) {
        console.log(err);
        return;
      }

      access.checkAccess(cmd, function(err, cmd) {
        if(err) {
          console.log(err);
          return;
        }

        commands.executeCommand(cmd);
      });
    });
  }
};

module.exports = index;
