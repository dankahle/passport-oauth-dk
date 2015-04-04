var express = require('express');
var routes = require('./routes');
var User = require('./user.js');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session')
require('./authentication.js');

mongoose.connect('mongodb://localhost/db');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
var router = express.Router();
app.use(router)
app.use(express.static(__dirname + '/public'));

// seralize and deseralize
passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (!err) done(null, user);
    else done(err, null);
  })
});

// routes
router.get('/', routes.index);
router.get('/ping', routes.ping);
router.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', {user: req.user});
})
router.get('/auth/facebook',
  passport.authenticate('facebook'),
  function (req, res) {
  });
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/account');
  });
router.get('/auth/twitter',
  passport.authenticate('twitter'),
  function (req, res) {
  });
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/account');
  });
router.get('/auth/github',
  passport.authenticate('github'),
  function (req, res) {
  });
router.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/account');
  });
router.get('/auth/google',
  passport.authenticate('google'),
  function (req, res) {
  });
router.get('/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/account');
  });
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// port
app.listen(3000, function() { console.log('listening on 3000')});

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = app
