const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const userController = require('./userController');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        }
        // passwords do not match!
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

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
        res.json({ message: 'success' });
      });
    });
  },
];

// GET request for login
exports.auth_login_get = function (req, res) {
  if (req.user) {
    // Already logged in
    return res.json({ title: 'Login', loggedIn: true });
  }
  return res.json({ title: 'Login', loggedIn: false });
};

// POST request for login
exports.auth_login_post = passport.authenticate('local', {
  successRedirect: '/api/login',
  failureRedirect: '/api/login',
});

// GET request for logout
exports.auth_logout_get = function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/api');
  });
};

exports.auth_login_status_get = function (req, res) {
  if (req.user) {
    return res.json({ loggedIn: true, user: req.user });
  }
  res.json({ loggedIn: false, user: null });
};
