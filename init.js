var mongoose = require('mongoose');
var Access = require('./core/models/Access');
mongoose.connect('mongodb://localhost/frzbot');

init();

function init() {
	var access = new Access({
		_id: 'nsfw',
  	cmds: ['porn', 'butts', 'boobs', 'dick', 'pussy', 'tattoo', 'nude', 'brunette', 'pale'],
  	chatIds: [21826676]
	});
  access.save(function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log('inserted');
    }
  });
  var access2 = new Access({
		_id: 'admin',
  	cmds: ['addChatIdAccess', 'remChatIdAccess', 'addCmdAccess', 'remCmdAccess', 'allGroups', 'allUsers'],
  	chatIds: [21826676]
	});
  access2.save(function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log('inserted');
    }
  });
}
