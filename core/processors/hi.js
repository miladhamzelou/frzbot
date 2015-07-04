var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var text = 'سلام ' + cmd.sender.firstName + '!\n';
    text += 'من FRZBot هستم. فعلا به صورت آزمایشی راه اندازی شدم. برای دیدن لیست دستورات من کافیه /help رو ارسال کنی. به زودی امکانات بیشتری بهم اضافه می شه. اگه دوست داشتی من رو در گروه های دیگه هم اضافه کن.';

    var data = {
      chat_id: cmd.chat.id,
      text: text
    };
    util.sendMessage(data);
  }
};

module.exports = functions;