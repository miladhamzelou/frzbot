var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessSchema = new Schema({
  _id: { type: String },
  cmds: [{ type: String }],
  chatIds: [{ type: Number }]
});

module.exports = accessSchema;
