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
  User.find({}, 'username join_date member_level')
    .sort({ join_date: 1 })
    .exec((err, userList) => {
      if (err) {
        return next(err);
      }
      res.send({
        title: 'user_list',
        user_list: userList,
      });
    });
};

// GET for creating User
exports.user_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER CREATE GET');
};

// POST for creating User
exports.user_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER CREATE POST');
};

// GET for deleting User
exports.user_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER DELETE GET');
};

// POST for deleting User
exports.user_delete_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER DELETE POST');
};

// GET for updating User
exports.user_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER UPDATE GET');
};

// POST for updating User
exports.user_update_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: USER UPDATE POST');
};