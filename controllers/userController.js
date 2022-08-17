const bcrypt = require('bcryptjs');
const async = require('async');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

// Display detail page for a user
exports.user_detail = function (req, res, next) {
  async.parallel(
    {
      user(callback) {
        User.findById(req.params.id).exec(callback);
      },
      user_posts(callback) {
        Post.find({ user: req.params.id }).populate('comments').exec(callback);
      },
      user_comments(callback) {
        Comment.find({ user: req.params.id })
          .populate('comments')
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        const err = new Error('User not found');
        err.status = 404;
        return next(err);
      }
      res.send({
        title: 'User Detail',
        user: results.user,
        user_posts: results.user_posts,
        user_comments: results.user_comments,
      });
    }
  );
};

// Display list of users
exports.user_list = function (req, res, next) {
  User.find({}, 'username join_date')
    .sort({ join_date: 1 })
    .exec((err, userList) => {
      if (err) {
        return next(err);
      }
      res.send({
        title: 'User List',
        user_list: userList,
      });
    });
};

// POST for deleting User
exports.user_delete_post = function (req, res, next) {
  async.parallel(
    {
      user(callback) {
        User.findById(req.params.id).exec(callback);
      },
      user_posts(callback) {
        Post.find({ user: req.params.id }).exec(callback);
      },
      user_comments(callback) {
        Comment.find({ user: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.user_posts.length > 0 || results.user_comments.length > 0) {
        // Cannot delete a user who has posts or comments, return
        res.json({ error: 'User has posts or comments' });
        return;
      }
      // User has no posts or comments, delete user
      User.findByIdAndRemove(req.body.userid, (err) => {
        if (err) {
          return next(err);
        }
        res.json({ success: true });
      });
    }
  );
};

// GET for updating User
exports.user_update_get = function (req, res, next) {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      return next(err);
    }
    if (
      (req.user && String(req.user._id) === String(user._id)) ||
      (req.user && req.user.admin)
    ) {
      // You must be logged in as the user you are trying to update
      // Or you could just be an admin
      res.json({ title: 'Update User', user });
      return;
    }
    res.json({
      title: 'Update User',
      error: 'Not logged in',
    });
  });
};

// POST for updating User
exports.user_update_post = [
  // Validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required (minimum length: 4)')
    .trim()
    .isLength({ min: 4 })
    .escape(),
  body('confirmation')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),

  (req, res, next) => {
    // Extract any validation errors
    const errors = validationResult(req);

    // Preserve original join date
    const joinDate = User.findById(req.params.id).join_date;

    // Encrypt the password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        join_date: joinDate,
        _id: req.params.id,
      });

      if (!errors.isEmpty()) {
        // There were validation errors
        res.json({ title: 'Update User', user, errors: errors.array() });
        return;
      }

      // No errors, update the user
      User.findByIdAndUpdate(req.params.id, user, {}, (err, theUser) => {
        if (err) {
          return next(err);
        }
        res.json({ success: true, theUser });
      });
    });
  },
];
