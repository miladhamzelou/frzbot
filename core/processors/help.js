var util = require('./../util');

var functions = {
  execute: function (cmd) {
    var message = '';
    message += 'لیست دستورات FRZBot' + '\n';
    message += 'آب و هوا:' + '\n';
    message += '/weather [شهر]' + '\n';
    message += 'shortcuts: /w /هوا' + '\n';
    message += 'جست و جوی گوگل:' + '\n';
    message += '/g [عبارت مورد جست و جو]' + '\n';
    message += 'جست و جوی تصویر گوگل:' + '\n';
    message += '/img [عبارت مورد جست و جو]' + '\n';
    message += 'shortcuts: /i' + '\n';
    message += 'فال حافظ:' + '\n';
    message += '/hafez' + '\n';
    message += 'shortcuts: /fal /فال /حافظ' + '\n';
    message += 'ماشین حساب:' + '\n';
    message += '/calc [عبارت ریاضی]' + '\n';
    message += 'shortcuts: /c' + '\n';
    message += 'اطلاعات فیلم:' + '\n';
    message += '/imdb [فیلم مورد جست و جو]' + '\n';
    message += 'shortcuts: /movie' + '\n';
    message += 'جست و جوی آپارات:' + '\n';
    message += '/aparat [فیلم مورد جست و جو]' + '\n';
    message += 'shortcuts: /ap /آپارات' + '\n';
    message += 'واژه نامه:' + '\n';
    message += '/dict (fa-en/fr-fa/ar-fa/...) [کلمه انگلیسی]' + '\n';
    message += 'shortcuts: /d' + '\n';
    message += '۹گگ:' + '\n';
    message += '/9gag (hot/trend/nsfw/gif)' + '\n';
    message += 'shortcuts: /9g' + '\n';
    message += 'متن آهنگ:' + '\n';
    message += '/lyric [نام آهنگ]' + '\n';
    message += 'shortcuts: /l' + '\n';
    message += 'اخبار:' + '\n';
    message += '/news' + '\n';
    message += 'shortcuts: /خبر' + '\n';
    message += '\n' + '* کروشه ها پارامترهای اجباری و پرانتزها پارامترهای اختیاری هستند.' + '\n';
    message += '** نیازی به تایپ کردن کروشه و پرانتز نیست.' + '\n';

    var data = {
      chat_id: cmd.chat.id,
      text: message
    };
    util.sendMessage(data);
  }
};

module.exports = functions;
