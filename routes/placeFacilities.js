const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
    const { place_id, facility_id } = req.body;
    const sql = "INSERT INTO place_facilities (place_id, facility_id) VALUES (?, ?)";
    db.query(sql, [place_id, facility_id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Facility added to place", place_id, facility_id });
    });
});

// READ
router.get('/', (req, res) => {
    db.query("SELECT * FROM place_facilities", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM place_facilities WHERE place_facility_id = ?", [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Place Facility not found" });
        }
    });
});

// DELETE
router.delete('/:place_id/:facility_id', (req, res) => {
    const { place_id, facility_id } = req.params;
    db.query("DELETE FROM place_facilities WHERE place_id = ? AND facility_id = ?", [place_id, facility_id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Facility removed from place" });
    });
});

module.exports = router;
