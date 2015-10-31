var util = require('./util');
var states = require('./states.json');
var stateId = "0";

var functions = {
  proccessUpdate: function (update) {
    console.log("Start processing at state: " + stateId);
    var state = states[stateId];

    if(state.answerNextState) {
      var answer = update.message.text;
      var nextStateId;
      for(var i = 0; i < state.keyboard.length; i++) {
        for(var j = 0; j < state.keyboard[i].length; j++) {
          if(state.keyboard[i][j] === answer) {
            nextStateId = state.answerNextState[i][j];
          }
        }
      }
      stateId = nextStateId;
      state = states[stateId];
    } else if(state.nextState) {
      stateId = state.nextState;
      state = states[stateId];
    }

    console.log("State changed to: " + stateId);

    var keyboard;
    if(state.keyboard) {
      keyboard = {
        keyboard: state.keyboard,
        one_time_keyboard: true,
        selective: true
      };
    }

    var data = {
      chat_id: update.message.chat.id,
      reply_markup: JSON.stringify(keyboard),
      text: state.text
    };

    util.sendMessage(data);

    if(state.photo) {
      var data = {
        chat_id: update.message.chat.id,
        reply_markup: JSON.stringify(keyboard)
      };

      util.sendImage(data, state.photo);
    }
  }
};

module.exports = functions;
