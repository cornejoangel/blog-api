const async = require('async');
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
    if (req.user && String(req.user._id) === String(user._id)) {
      // You must be logged in as the user you are trying to update
      // TODO later you will be able to access this for other users if you are an admin
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
exports.user_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER UPDATE POST');
};
