var mongoose = require('mongoose');
var Command = require('./core/models/Command');
var Group = require('./core/models/Group');
var User = require('./core/models/User');

mongoose.connect('mongodb://localhost/test');

//init();
load();

function load() {
  Command.find({}).populate('sender group').exec(function(err, commands) {
    commands.forEach(function(command) {
      console.log(command);
    });
  });
}

function init() {
  var user = new User({_id: 1, username: 'firiz', firstName: 'Farshad'});
  var group = new Group({_id: 1, title: 'Test'});

  var cmd1 = new Command({cmd: 'img', args: 'car', sender: user._id, group: undefined, timestamp: new Date().getTime()});
  var cmd2 = new Command({cmd: 'img', args: 'car', sender: user._id, group: group._id, timestamp: new Date().getTime()});

  user.save(function(err) {
    if(err) {
      console.log(err);
      return;
    }

    group.save(function(err) {
      if(err) {
        console.log(err);
        return;
      }

      cmd1.save(function(err) {
        if(err) {
          console.log(err);
          return;
        }

        cmd2.save(function(err) {
          if(err) {
            console.log(err);
            return;
          }

          console.log('all saved');
        });
      });
    });
  });
}
