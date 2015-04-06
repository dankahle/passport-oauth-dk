var express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  expressDomainMiddleware = require('express-domain-middleware'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  session = require('express-session'),
  loginRouter = require('./routers/login-router'),
  oauthRouter = require('./routers/oauth-router'),
  apiRouter = require('./routers/api-router'),
  auth = require('./authentication.js'),
  User = require('./db.js').User,
  logger = require('morgan')

var app = express();
app.use(session({secret: 'secret', resave: true, saveUninitialized: true}));
app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser()); // can't use, saves username not _id
//passport.deserializeUser(User.deserializeUser());

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (!err) done(null, user);
    else done(err, null);
  })
});

//app.use(logger('dev'))

app.use(oauthRouter, loginRouter)
app.use('/login', express.static('login'));

// nothing gets past this unless authed
app.use(ensureAuthenticated)

app.use(apiRouter)
app.use(express.static(__dirname + '/public'));

//////////// bottom
app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})

app.use(function(err, req, res, next) {
  if(req.xhr)
    return next(err);

  var status = err.status || err.statusCode || 500;
  if (status < 400) status = 500;

  if(process.env.NODE_ENV === 'production')
    res.sendStatus(status);
  else {
    res.status(status).send(err.stack? err.stack: err.message);
  }
})

app.use(apiErrorHandler())

app.listen(3000, function () {
  console.log('server started on 3000')
})

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();

  if (req.xhr)
    next({staus: 401, message: 'Unauthorized'})
  else
    res.redirect('/login')
}
