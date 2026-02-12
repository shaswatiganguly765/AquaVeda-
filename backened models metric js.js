const mongoose = require('mongoose');
const metricSchema = new mongoose.Schema({
  location: String,
  ph: Number,
  temperature: Number,
  conductivity: Number,
  turbidity: Number,
  status: String,
  lastUpdated: Date,
});
module.exports = mongoose.model('Metric', metricSchema);