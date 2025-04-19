const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const {
        city,
        activity,
        facility,
        facility_ids,
        capacity_max,
        price_min,
        price_max
    } = req.query;

    let sql = `
        SELECT DISTINCT p.place_id, p.name_place, p.address, p.city, p.latitude, p.longitude,
                        p.description, p.rating, p.rating_source, p.price_range, p.capacity
        FROM places p
        INNER JOIN place_activities pa ON p.place_id = pa.place_id
        INNER JOIN activities a ON pa.activity_id = a.activity_id
        WHERE 1=1
    `;

    const params = [];

    if (city) {
        sql += ` AND p.city = ?`;
        params.push(city);
    }

    if (activity) {
        sql += ` AND a.name_activity = ?`;
        params.push(activity);
    }

    if (capacity_max) {
        sql += ` AND p.capacity <= ?`;
        params.push(Number(capacity_max));
    }

    if (price_min) {
        sql += ` AND p.price_range >= ?`;
        params.push(Number(price_min));
    }

    if (price_max) {
        sql += ` AND p.price_range <= ?`;
        params.push(Number(price_max));
    }

    if (facility) {
        sql += `
            AND EXISTS (
                SELECT 1 FROM place_facilities pf
                JOIN facilities f ON pf.facility_id = f.facility_id
                WHERE pf.place_id = p.place_id AND f.name_facility = ?
            )
        `;
        params.push(facility);
    }

    if (facility_ids && facility_ids.length > 0) {
        const facilityArray = Array.isArray(facility_ids) ? facility_ids : [facility_ids];
        const placeholders = facilityArray.map(() => '?').join(',');
        sql += `
            AND p.place_id IN (
                SELECT pf.place_id
                FROM place_facilities pf
                WHERE pf.facility_id IN (${placeholders})
                GROUP BY pf.place_id
                HAVING COUNT(DISTINCT pf.facility_id) = ?
            )
        `;
        params.push(...facilityArray, facilityArray.length);
    }

    console.log('Generated SQL:', sql);
    console.log('Parameters:', params);

    db.query(sql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        res.json(results);
    });
});

module.exports = router;
