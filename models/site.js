var mongoose = require('mongoose');
    
var siteSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
  title: String,
  area: Number,
  labels:   String,
  status: Number,
  icon: String,
  updated: { type: Date, default: Date.now },
  originalData: mongoose.Schema.Types.Mixed
});

module.exports.schema = siteSchema;
module.exports.model = mongoose.model('Site', siteSchema);