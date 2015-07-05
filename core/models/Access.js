var mongoose = require('mongoose');
var accessSchema = require('./schemas/access');

module.exports = mongoose.model('Access', accessSchema);
