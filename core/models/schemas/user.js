var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  _id: { type: Number },
  username: { type: String },
  firstName: { type: String }
});

module.exports = userSchema;
