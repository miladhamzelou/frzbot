var cheerio = require('cheerio');

var ch = cheerio.load('<img title="" class="thumb" src="http://cdn1a.limg.pornhub.phncdn.com/m=bKOCwLV/pics/gifs/000/469/821/469821a.jpg" data-static-url="http://cdn1a.limg.pornhub.phncdn.com/m=bKOCwLV/pics/gifs/000/469/821/469821a.jpg" data-gif-url="http://cdn1a.limg.pornhub.phncdn.com/m=eLZQ81q/pics/gifs/000/469/821/469821a.gif">');
var thumbs = ch('img.thumb');
console.log(thumbs.length);
console.log(thumbs[0].attribs['data-gif-url']);
