var util = require('./util');

var privates = {
  match: function (text, items) {
    for (var i = 0; i < items.length; i++) {
      if (text.indexOf(items[i]) > -1) {
        return true;
      }
    }
    return false;
  }
};

var functions = {
  understandCommand: function (update, callback) {
    var text = update.message.text.replace('@FRZBot ', '');
    if (privates.match(text, ['خبر', 'اخبار'])) {
      callback('news');
    } else if (privates.match(text, ['هوا', 'آب و هوا', 'دما', 'درجه', 'ابری', 'بارونی', 'گرم', 'سرد'])) {
      callback('weather');
    } else if (privates.match(text, ['فال', 'حافظ', 'شعر', 'غزل'])) {
      callback('hafez');
    }
  }
};

module.exports = functions;