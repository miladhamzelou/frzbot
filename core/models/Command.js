var mongoose = require('mongoose');
var commandSchema = require('./schemas/command');

module.exports = mongoose.model('Command', commandSchema);
