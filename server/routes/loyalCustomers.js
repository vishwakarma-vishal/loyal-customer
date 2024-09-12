// routes/loyalCustomers.js
const express = require('express');
const router = express.Router();
const Log = require('../models/Log');

router.get('/loyal-customers', async (req, res) => {
  try {
    const day1Start = new Date('2024-09-10T00:00:00Z');
    const day1End = new Date('2024-09-10T23:59:59Z');
    const day2Start = new Date('2024-09-11T00:00:00Z');
    const day2End = new Date('2024-09-11T23:59:59Z');

    // Fetch logs for both days
    const logsDay1 = await Log.find({ timestamp: { $gte: day1Start, $lte: day1End } });
    const logsDay2 = await Log.find({ timestamp: { $gte: day2Start, $lte: day2End } });

    console.log('Logs Day 1:', logsDay1);
    console.log('Logs Day 2:', logsDay2);

    // Maps to store the unique pages visited by each customer on both days
    const customerPagesDay1 = {};
    const customerPagesDay2 = {};

    logsDay1.forEach(log => {
      if (!customerPagesDay1[log.customerId]) customerPagesDay1[log.customerId] = new Set();
      customerPagesDay1[log.customerId].add(log.pageId);
    });

    logsDay2.forEach(log => {
      if (!customerPagesDay2[log.customerId]) customerPagesDay2[log.customerId] = new Set();
      customerPagesDay2[log.customerId].add(log.pageId);
    });

    console.log('Customer Pages Day 1:', customerPagesDay1);
    console.log('Customer Pages Day 2:', customerPagesDay2);

    // Find loyal customers
    const loyalCustomers = Object.keys(customerPagesDay1).filter(customerId =>
      customerPagesDay1[customerId].size >= 2 &&
      customerPagesDay2[customerId] &&
      customerPagesDay2[customerId].size >= 2
    );

    console.log('Loyal Customers:', loyalCustomers);
    res.json(loyalCustomers);
  } catch (err) {
    console.error('Error fetching loyal customers:', err);
    res.status(500).send('Error fetching loyal customers');
  }
});

module.exports = router;
