const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
    const { place_id, activity_id } = req.body;
    const sql = "INSERT INTO place_activities (place_id, activity_id) VALUES (?, ?)";
    db.query(sql, [place_id, activity_id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Activity added to place", place_id, activity_id });
    });
});

// READ
router.get('/', (req, res) => {
    db.query("SELECT * FROM place_activities", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM place_activities WHERE place_activity_id = ?", [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Place Activity not found" });
        }
    });
});

// DELETE
router.delete('/:place_id/:activity_id', (req, res) => {
    const { place_id, activity_id } = req.params;
    db.query("DELETE FROM place_activities WHERE place_id = ? AND activity_id = ?", [place_id, activity_id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Activity removed from place" });
    });
});

module.exports = router;
