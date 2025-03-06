const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db/config');

// Get all cities
router.get('/', async (req, res, next) => {
    try {
        const db = await getDatabase();
        const cities = await db.all('SELECT * FROM Cities');
        res.json(cities);
    } catch (error) {
        next(error);
    }
});

// Get city by ID
router.get('/:id', async (req, res, next) => {
    try {
        const db = await getDatabase();
        const city = await db.get('SELECT * FROM Cities WHERE city_id = ?', [req.params.id]);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.json(city);
    } catch (error) {
        next(error);
    }
});

// Create new city
router.post('/', async (req, res, next) => {
    try {
        const { name, region } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const db = await getDatabase();
        const result = await db.run(
            'INSERT INTO Cities (name, region, last_updated) VALUES (?, ?, ?)',
            [name, region, new Date().toISOString()]
        );

        res.status(201).json({
            city_id: result.lastID,
            name,
            region,
            last_updated: new Date().toISOString()
        });
    } catch (error) {
        next(error);
    }
});

// Update city
router.put('/:id', async (req, res, next) => {
    try {
        const { name, region } = req.body;
        const db = await getDatabase();
        
        await db.run(
            'UPDATE Cities SET name = ?, region = ?, last_updated = ? WHERE city_id = ?',
            [name, region, new Date().toISOString(), req.params.id]
        );

        const updatedCity = await db.get('SELECT * FROM Cities WHERE city_id = ?', [req.params.id]);
        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        
        res.json(updatedCity);
    } catch (error) {
        next(error);
    }
});

// Delete city
router.delete('/:id', async (req, res, next) => {
    try {
        const db = await getDatabase();
        await db.run('DELETE FROM Cities WHERE city_id = ?', [req.params.id]);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router; 