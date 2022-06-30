const express = require('express');

const router = express.Router();

// Require controller modules.
const postController = require('../controllers/postController');

// GET request for creating a Post. NOTE This must come before routes that display Post (uses id).
router.get('/create', postController.post_create_get);

// POST request for creating Post.
router.post('/create', postController.post_create_post);

// GET request to delete Post.
router.get('/:id/delete', postController.post_delete_get);

// POST request to delete Post.
router.post('/:id/delete', postController.post_delete_post);

// GET request to update Post.
router.get('/:id/update', postController.post_update_get);

// POST request to update Post.
router.post('/:id/update', postController.post_update_post);

// GET request for one Post.
router.get('/:id', postController.post_detail);

// GET request for list of all Post items.
router.get('/', postController.post_list);

module.exports = router;
