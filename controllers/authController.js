// GET request for signup
exports.auth_signup_get = function (req, res) {
  if (res.locals.currentUser) {
    // Already logged in
    res.redirect('/');
  }
  res.send({ title: 'Signup' });
};

// POST request for signup
exports.auth_signup_post = function (req, res) {
  res.send('NOT IMPLEMENTED: SIGNUP POST');
};

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
