
/*
you need this file (oauth.js) for the app, BUT... don't want to check it in to github 
for all to use, so it's added to gitclone, but need an example for github and to remind you 
 what you need to build to run it.

 facebook woudln't let you use 127.0.0.1:3000 so you used local.host:3000 for facebook
  instead and mapped local.host to 127.0.0.1 in your hosts file. That worked for facebook.
 */


var ids = {
  facebook: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: 'http://local.host:3000/auth/facebook/callback'
  },
  twitter: {
    consumerKey: 'get_your_own',
    consumerSecret: 'get_your_own',
    callbackURL: "http://local.host:3000/auth/twitter/callback"
  },
  github: {
    clientID: 'get_your_own',
    clientSecret: 'get_your_own',
    callbackURL: "http://local.host:3000/auth/github/callback"
  },
  google: {
    returnURL: 'http://local.host:3000/auth/google/callback',
    realm: 'http://local.host:3000'
  }
}

module.exports = ids