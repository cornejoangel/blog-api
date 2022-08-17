const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

// Display detail page for a post
exports.post_detail = function (req, res, next) {
  Post.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    })
    .populate({
      path: 'comments',
      populate: { path: 'comments' },
    })
    .exec((err, post) => {
      if (err) {
        return next(err);
      }
      if (post == null) {
        const err = new Error('Post not found');
        err.status = 404;
        return next(err);
      }
      res.json({ title: 'Post Detail', post });
    });
};

// Display list of posts
exports.post_list = function (req, res, next) {
  Post.find({})
    .sort({ time_stamp: -1 })
    .populate('user')
    .populate('comments')
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

// POST for deleting Post
exports.post_delete_post = function (req, res, next) {
  Post.findById(req.params.id).exec((err) => {
    if (err) {
      return next(err);
    }
    Post.findByIdAndRemove(req.body.postid, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  });
};

// GET for updating Post
exports.post_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST UPDATE GET');
};

// POST for updating Post
exports.post_update_post = [
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
    // Find original post to preserve time stamp and comments
    Post.findById(req.params.id).exec((err, originalPost) => {
      if (err) {
        return next(err);
      }
      const post = new Post({
        title: req.body.title,
        body: req.body.body,
        time_stamp: originalPost.time_stamp,
        user: postUser,
        hidden: req.body.hidden,
        edited: true,
        edited_time: new Date(),
        comments: originalPost.comments,
        _id: req.params.id,
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
      // Post is valid, update it
      Post.findByIdAndUpdate(req.params.id, post, {}, (err, thePost) => {
        if (err) {
          return next(err);
        }
        res.json({ success: true, thePost });
      });
    });
  },
];
