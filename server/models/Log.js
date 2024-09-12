// models/Log.js
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true
    },
    pageId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Log', logSchema);
