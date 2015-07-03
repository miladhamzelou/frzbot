var request = require('request');
var jsonfile = require('jsonfile');
var util = require('./../util');
var config = jsonfile.readFileSync('./core/processors/tumblr.json');

var functions = {
  execute: function (cmd) {
    var blogs = config[cmd.cmd];
    var blog = blogs[Math.floor(Math.random() * blogs.length)];
    var searchURL = 'http://api.tumblr.com/v2/blog/' + blog + '.tumblr.com/posts?api_key=rWZy3vh1Kes3ki8Q9u00RZO33Eki8afXu9dflCZRME581W4tXX&type=photo';

    request(searchURL, function (error, response, results) {
      if (!error) {
        var posts = JSON.parse(results).response.posts;
        var index = Math.floor(Math.random() * posts.length);
        var post = posts[index];

        if (post) {
          var imageUrl = post.photos[0].original_size.url;
          var ext = imageUrl.substr(imageUrl.length - 4);

          if (ext === '.gif') {
            for (var i = 0; i < post.photos[0].alt_sizes.length; i++) {
              if (post.photos[0].alt_sizes[i].width === 250) {
                imageUrl = post.photos[0].alt_sizes[i].url;
              }
            }
          }

          var data = {
            chat_id: cmd.chat.id,
            imageUrl: imageUrl
          };

          util.sendImageFromUrl(data);
        }
      }
    });
  }
};

module.exports = functions;
