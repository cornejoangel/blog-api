const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  if (req.user) {
    return res.json({ title: 'Welcome to the Blog', loggedIn: true });
  }
  res.json({ title: 'Welcome to the Blog', loggedIn: false });
});

module.exports = router;
