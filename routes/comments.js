const express = require('express');

const router = express.Router();

// Require controller modules.
const commentController = require('../controllers/commentController');

// GET request for creating a Comment. NOTE This must come before routes that display Comment (uses id).
router.get('/create', commentController.comment_create_get);

// POST request for creating Comment.
router.post('/create', commentController.comment_create_post);

// GET request to delete Comment.
router.get('/:id/delete', commentController.comment_delete_get);

// POST request to delete Comment.
router.post('/:id/delete', commentController.comment_delete_post);

// GET request to update Comment.
router.get('/:id/update', commentController.comment_update_get);

// POST request to update Comment.
router.post('/:id/update', commentController.comment_update_post);

// GET request for one Comment.
router.get('/:id', commentController.comment_detail);

// GET request for list of all Comment items.
router.get('/', commentController.comment_list);

module.exports = router;
