const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

// Display detail page for a comment
exports.comment_detail = function (req, res, next) {
  Comment.findById(req.params.id)
    .populate('user')
    .populate({
      path: 'comments',
      populate: { path: 'user' },
    })
    .exec((err, comment) => {
      if (err) {
        return next(err);
      }
      if (comment == null) {
        const err = new Error('Comment not found');
        err.status = 404;
        return next(err);
      }
      res.json({ title: 'Comment Detail', comment });
    });
};

// Display list of comments
exports.comment_list = function (req, res, next) {
  res.send('NOT IMPLEMENTED: COMMENT LIST');
};

// GET for creating Comment
exports.comment_create_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: COMMENT CREATE GET');
};

// POST for creating Comment
exports.comment_create_post = [
  // Validate and sanitize the body field
  body('body').trim().isLength({ min: 1, max: 1024 }).escape().unescape("'"),
  // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    let commentUser = '';
    if (req.user) {
      commentUser = req.user._id;
    }

    const comment = new Comment({
      body: req.body.body,
      time_stamp: new Date(),
      user: commentUser,
      edited: false,
    });
    if (!req.user) {
      // trying to comment while not logged in
      res.json({ comment, errors: [{ msg: 'You must log in to comment' }] });
      return;
    }
    if (!errors.isEmpty()) {
      res.json({ comment, errors: errors.array() });
      return;
    }
    // Comment is valid! Now find out if it gets attatched to a post or comment
    // Also save the comment once you find its parent
    if (req.body.parentType === 'post') {
      Post.findById(req.body.parentId).exec((err, post) => {
        if (err) {
          return next(err);
        }
        if (post == null) {
          const err = new Error('Post not found');
          err.status = 404;
          return next(err);
        }
        // this block is duplicated in the other section below
        comment.save((err) => {
          if (err) {
            return next(err);
          }
        });
        // end of duplication
        // Comment saved, now add it to its parent's comment array
        post.comments.push(comment._id);
        Post.findByIdAndUpdate(req.body.parentId, post, {}, (err, thePost) => {
          if (err) {
            return next(err);
          }
          res.json({ message: 'success', post: thePost });
        });
      });
    } else if (req.body.parentType === 'comment') {
      Comment.findById(req.body.parentId).exec((err, parentComment) => {
        if (err) {
          return next(err);
        }
        if (parentComment == null) {
          const err = new Error('Post not found');
          err.status = 404;
          return next(err);
        }
        // this block is duplicated in the other section above
        comment.save((err) => {
          if (err) {
            return next(err);
          }
        });
        // end of duplication
        // Comment saved, now add it to its parent's comment array
        parentComment.comments.push(comment._id);
        Comment.findByIdAndUpdate(
          req.body.parentId,
          parentComment,
          {},
          (err, theComment) => {
            if (err) {
              return next(err);
            }
            res.json({ message: 'success', comment: theComment });
          }
        );
      });
    }
  },
];

// GET for deleting Comment
exports.comment_delete_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: COMMENT DELETE GET');
};

// POST for deleting Comment
exports.comment_delete_post = function (req, res, next) {
  Comment.findById(req.params.id).exec((err) => {
    if (err) {
      return next(err);
    }
    Comment.findByIdAndRemove(req.body.commentid, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ success: true });
    });
  });
};

// GET for updating Comment
exports.comment_update_get = function (req, res, next) {
  res.send('NOT IMPLEMENTED: COMMENT UPDATE GET');
};

// POST for updating Comment
exports.comment_update_post = [
  // Validate and sanitize the body field
  body('body').trim().isLength({ min: 1, max: 1024 }).escape().unescape("'"),
  // Process request after validation/sanitization
  (req, res, next) => {
    const errors = validationResult(req);
    let commentUser = '';
    if (req.user) {
      commentUser = req.user._id;
    }
    // Get original comment to preserve time stamp and comments
    Comment.findById(req.params.id).exec((err, originalComment) => {
      if (err) {
        return next(err);
      }
      const comment = new Comment({
        body: req.body.body,
        time_stamp: originalComment.time_stamp,
        user: commentUser,
        edited: true,
        edited_time: new Date(),
        comments: originalComment.comments,
        _id: req.params.id,
      });
      if (!req.user) {
        // trying to update comment while not logged in
        res.json({ comment, errors: [{ msg: 'You must log in to comment' }] });
        return;
      }
      if (!errors.isEmpty()) {
        res.json({ comment, errors: errors.array() });
        return;
      }
      // Comment is valid, now update it
      // No need to do anything with its parent
      Comment.findByIdAndUpdate(
        req.params.id,
        comment,
        {},
        (err, theComment) => {
          if (err) {
            return next(err);
          }
          res.json({ success: true, theComment });
        }
      );
    });
  },
];
