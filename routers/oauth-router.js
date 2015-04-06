
var passport = require('passport')
  router = require('express').Router();

module.exports = router;

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback',
  passport.authenticate('github', {successRedirect: '/', failureRedirect: '/login'}));

router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/google/callback',
  passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login'}));

