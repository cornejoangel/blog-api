const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const userController = require('./userController');

// GET request for signup
exports.auth_signup_get = function (req, res) {
  if (res.locals.currentUser) {
    // Already logged in
    res.redirect('/');
  }
  res.send({ title: 'Signup' });
};

// POST request for signup
exports.auth_signup_post = [
  // Validate and sanitize fields
  body('username', 'Username required').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password required (minimum length: 4')
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
    // Extract and validation errors
    const errors = validationResult(req);

    // Encrypt the password
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
        join_date: new Date(),
      });

      if (!errors.isEmpty()) {
        // There were validation errors
        res.send({
          title: 'Signup',
          user,
          errors: errors.array(),
        });
        return;
      }

      // No errors, save the new user
      user.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  },
];

// GET request for login
exports.auth_login_get = function (req, res) {
  res.send('NOT IMPLEMENTED: LOGIN GET');
};

// POST request for login
exports.auth_login_post = function (req, res) {
  res.send('NOT IMPLEMENTED: LOGIN POST');
};

// GET request for logout
exports.auth_logout_get = function (req, res) {
  res.send('NOT IMPLEMENTED: LOGOUT GET');
};
