const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'Welcome to the Blog' });
});

module.exports = router;
