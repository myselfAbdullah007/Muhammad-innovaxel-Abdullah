const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accessCount: { type: Number, default: 0 },
});

urlSchema.statics.createUrl = function ({ url, shortCode }) {
  return this.create({ url, shortCode });
};

urlSchema.statics.findByShortCode = function (shortCode) {
  return this.findOne({ shortCode });
};

urlSchema.statics.findByUrl = function (url) {
  return this.findOne({ url });
};

const Url = mongoose.model('Url', urlSchema);

module.exports = Url; 