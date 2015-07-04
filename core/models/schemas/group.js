var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
  _id: { type: Number },
  title: { type: String }
});

module.exports = groupSchema;
