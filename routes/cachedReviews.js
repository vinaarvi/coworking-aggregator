const express = require('express');
const router = express.Router();
const CachedReview = require('../models/CachedReview');

// GET cached reviews by place_id
router.get('/:place_id', async (req, res) => {
    try {
      const placeId = parseInt(req.params.place_id);
      const data = await CachedReview.find({ place_id: placeId }); // Mengambil semua review untuk place_id
      if (data.length === 0) return res.status(404).json({ message: 'No reviews found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving cached reviews' });
    }
  });
  

// POST new cached review
router.post('/', async (req, res) => {
    try {
      const { place_id, author, rating, comment } = req.body;
    
      // Log data yang diterima dari client
      console.log("Data yang akan disimpan:", { place_id, author, rating, comment });
  
      // Buat object baru berdasarkan data yang dikirim
      const newReview = new CachedReview({
        place_id,
        author,
        rating,
        comment
      });
  
      // Simpan data ke MongoDB
      const savedReview = await newReview.save();
      console.log("Data yang berhasil disimpan:", savedReview);
  
      // Kembalikan response dengan data yang sudah disimpan
      res.status(201).json(savedReview);
    } catch (err) {
      console.error('Error saving review:', err);
      res.status(500).json({ message: 'Error saving review' });
    }
  });
  
  

module.exports = router;