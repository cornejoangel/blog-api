const express = require('express');

const router = express.Router();

// Require controller modules.
const authController = require('../controllers/authController');

router.get('/signup', authController.auth_signup_get);
router.post('/signup', authController.auth_signup_post);
router.get('/login', authController.auth_login_get);
router.post('/login', authController.auth_login_post);
router.get('/logout', authController.auth_logout_get);
router.get('/loginstatus', authController.auth_login_status_get);

module.exports = router;
