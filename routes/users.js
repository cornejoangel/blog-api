const express = require('express');

const router = express.Router();

// Require controller modules.
const userController = require('../controllers/userController');

// POST request to delete User.
router.post('/:id/delete', userController.user_delete_post);

// GET request to update User.
router.get('/:id/update', userController.user_update_get);

// POST request to update User.
router.post('/:id/update', userController.user_update_post);

// GET request for one User.
router.get('/:id', userController.user_detail);

// GET request for list of all User items.
router.get('/', userController.user_list);

module.exports = router;
