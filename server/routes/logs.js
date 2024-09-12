// routes/logs.js
const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

// Endpoint to insert logs for a given day
router.post('/logs', async (req, res) => {
    try {
        const logs = req.body; // Expecting an array of log objects (timestamp, pageId, customerId)
        await Log.insertMany(logs);
        res.status(201).send('Logs inserted successfully');
    } catch (err) {
        res.status(400).send('Error inserting logs');
    }
});

module.exports = router;
