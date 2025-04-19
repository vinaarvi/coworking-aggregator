const mongoose = require('mongoose');

const cachedReviewSchema = new mongoose.Schema({
  place_id: { type: Number, required: true },   // Menyimpan ID tempat
  author: { type: String, required: true },      // Nama pengulas
  rating: { type: Number, required: true },      // Rating (angka)
  comment: { type: String, required: true },     // Komentar
});

const CachedReview = mongoose.model('CachedReview', cachedReviewSchema);

module.exports = CachedReview;
