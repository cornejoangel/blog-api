const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

// Display detail page for a post
exports.post_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST DETAIL');
};

// Display list of posts
exports.post_list = function (req, res, next) {
  Post.find({}, 'title body user time_stamp hidden edited')
    .sort({ time_stamp: 1 })
    .populate('user')
    .exec((err, postList) => {
      if (err) {
        return next(err);
      }
      res.json({
        title: 'Post List',
        postList,
      });
    });
};

// GET for creating Post
exports.post_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST CREATE GET');
};

// POST for creating Post
exports.post_create_post = [
  // Validate and sanitize the title and body fields
  body('title').trim().escape().unescape("'"),
  body('body', 'Post body required')
    .trim()
    .isLength({ min: 1, max: 1024 })
    .escape()
    .unescape("'"),
  // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    // Create a Post object with sanitized/validated data
    let postUser = '';
    if (req.user) {
      postUser = req.user._id;
    }

    const post = new Post({
      title: req.body.title,
      body: req.body.body,
      time_stamp: new Date(),
      user: postUser,
      hidden: req.body.hidden,
      edited: false,
    });
    if (!req.user) {
      // trying to post while not logged in
      res.json({ post, errors: [{ msg: 'You must log in to post' }] });
      return;
    }
    if (!errors.isEmpty()) {
      res.json({ post, errors: errors.array() });
      return;
    }
    post.save((err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  },
];

// GET for deleting Post
exports.post_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST DELETE GET');
};

// POST for deleting Post
exports.post_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST DELETE POST');
};

// GET for updating Post
exports.post_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST UPDATE GET');
};

// POST for updating Post
exports.post_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST UPDATE POST');
};
