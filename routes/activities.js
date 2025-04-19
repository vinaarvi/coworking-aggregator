const express = require('express');
const router = express.Router();
const db = require('../db');

//CREATE
router.post('/', (req, res) =>{
    const { name_activity } = req.body;
    const sql = "INSERT INTO activities (name_activity) VALUES (?)";
    db.query(sql, [name_activity], (err, result) => {
        if(err) throw err;
        res.json({ id: result.insertId, ...req.body});
    });
});

// READ
router.get('/', (req, res) => {
    db.query("SELECT * FROM activities", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM activities WHERE activity_id = ?", [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Activity not found" });
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name_activity } = req.body;
    const sql = "UPDATE activities SET name_activity=? WHERE activity_id=?";
    db.query(sql, [name_activity, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Activity updated" });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM activities WHERE activity_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Activity deleted" });
    });
});

module.exports = router;