
var router = require('express').Router(),
  passport = require('passport'),
  User = require('../db').User

module.exports = router;


router.get('/login', function(req, res) {
  var query;
  if(req.url.slice(0, 6) == '/login' || req.url.slice(0, 6) == '/auth/')
    query = '';
  else
    query = '?returnUrl=' + encodeURIComponent(req.url);
  res.redirect('/login/login.html' + query)

})

// use for generic 400/401 messages
/*
 app.post('/login', passport.authenticate('local'), function(req, res) {
 res.send(req.user);
 });
 */

// use for verbose messages
router.post('/login', function (req, res, next) {
  // we have to hook into authentication to get the login errors as the flashes are of
  // no use to us in xhr land
  passport.authenticate('local', function (err, user, info) {
    if (err)
      return next(err)

    if (!user)
      return next({status: 401, message: info.message})

    req.login(user, function (err) {
      if (err)
        return next(err);

      return res.end();
    });
  })(req, res, next);
});

router.post('/login/register', function (req, res, next) {
  var user = req.body
  user.created = Date.now();

  User.register(new User(user), user.password, function(err, user) {
    if (err) {
      if(err.name && err.name == 'BadRequestError') err.status = 400;
      return next(err);
    }
    // login for them after they register, so they can be redirected to main page
    req.login(user, function(err) {
      if(err) return next(err)
      res.end();

    })
  })
})

router.get('/login/logout', function(req, res) {
  req.logout();
  res.redirect('/login')
})


