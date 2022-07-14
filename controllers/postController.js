const Post = require('../models/post');
const User = require('../models/user');

// Display detail page for a post
exports.post_detail = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST DETAIL');
};

// Display list of posts
exports.post_list = function (req, res, next) {
  Post.find({}, 'title user time_stamp')
    .sort({ time_stamp: 1 })
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
exports.post_create_post = function (req, res, next) {
  res.send('NOT IMPLEMENTED: POST CREATE POST');
};

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
