var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  GithubStrategy = require('passport-github').Strategy,
  GoogleOpenIdStrategy = require('passport-google').Strategy,
  GoogleOauthStrategy = require('passport-google-oauth').OAuth2Strategy,
  User = require('./db.js').User,
  config = require('./oauth.js')

// config
module.exports = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function (err, user) {
      if (err)
        done(err);
      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          fullName: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err)
            done(err);
          else {
            console.log("saving user ...");
            done(null, user);
          }
          ;
        });
      }
      ;
    });
  }
));
passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function (err, user) {
      if (err)
        done(err);
      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          fullName: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err)
            done(err);
          else {
            console.log("saving user ...");
            done(null, user);
          }
          ;
        });
      }
      ;
    });
  }
));
passport.use(new GithubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function (err, user) {
      if (err)
        done(err);
      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          fullName: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err)
            done(err);
          else {
            console.log("saving user ...");
            done(null, user);
          }
          ;
        });
      }
      ;
    });
  }
));
passport.use('google-openid', new GoogleOpenIdStrategy({
    returnURL: config.google_openid.returnURL,
    realm: config.google_openid.realm
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function (err, user) {
      if (err)
        done(err);
      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          fullName: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err)
            done(err);
          else {
            console.log("saving user ...");
            done(null, user);
          }
          ;
        });
      }
      ;
    });
  }
));
passport.use('google-oauth', new GoogleOauthStrategy({
    clientID: config.google_oauth.clientID,
    clientSecret: config.google_oauth.clientSecret,
    callbackURL: config.google_oauth.callbackURL,
    scope: config.google_oauth.scope
  },
  function (accessToken, refreshToken, profile, done) {
    User.findOne({oauthID: profile.id}, function (err, user) {
      if (err)
        done(err);
      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          fullName: profile.displayName,
          created: Date.now()
        });
        user.save(function (err) {
          if (err)
            done(err);
          else {
            console.log("saving user ...");
            done(null, user);
          }
          ;
        });
      }
      ;
    });
  }
));
