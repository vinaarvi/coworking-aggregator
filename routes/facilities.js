const express = require('express');
const router = express.Router();
const db = require('../db');

//CREATE
router.post('/', (req, res) =>{
    const { name_facility } = req.body;
    const sql = "INSERT INTO facilities (name_facility) VALUES (?)";
    db.query(sql, [name_facility], (err, result) => {
        if(err) throw err;
        res.json({ id: result.insertId, ...req.body});
    });
});

// READ
router.get('/', (req, res) => {
    db.query("SELECT * FROM facilities", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// READ BY ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM facilities WHERE facility_id = ?", [id], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: "Facility not found" });
        }
    });
});

// UPDATE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name_facility } = req.body;
    const sql = "UPDATE facilities SET name_facility=? WHERE facility_id=?";
    db.query(sql, [name_facility, id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Facility updated" });
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM facilities WHERE facility_id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "Facility deleted" });
    });
});

module.exports = router;