var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commandSchema = new Schema({
  cmd: { type: String },
  args: { type: String },
  processor: { type: String },
  sender: { type: Number, ref: 'User' },
  group: { type: Number, ref: 'Group' },
  timestamp: { type: Number },
  messageId: { type: Number },
  replyToCommand: { type: Schema.Types.ObjectId, ref: 'Command' }
});

module.exports = commandSchema;
