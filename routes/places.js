const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
    const { name_place, address, city, latitude, longitude, description, rating, rating_source, price_range, capacity } = req.body;
    const sql = "INSERT INTO places (name_place, address, city, latitude, longitude, description, rating, rating_source, price_range, capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name_place, address, city, latitude, longitude, description, rating, rating_source, price_range, capacity], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, ...req.body });
    });
});

// READ
router.get('/', (req, res) => {
    db.query("SELECT * FROM places", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM places WHERE place_id = ?", [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Place not found" });
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name_place, address, city, latitude, longitude, description, rating, rating_source, price_range, capacity } = req.body;
    const sql = "UPDATE places SET name_place=?, address=?, city=?, latitude=?, longitude=?, description=?, rating=?, rating_source=?, price_range=?, capacity=? WHERE place_id=?";
    db.query(sql, [name_place, address, city, latitude, longitude, description, rating, rating_source, price_range, capacity, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Place updated" });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM places WHERE place_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Place deleted" });
    });
});

module.exports = router;