
var router = require('express').Router(),
  db = require('../db')

module.exports = router;


router.get('/api/user', function (req, res) {
  res.send(req.user);
})

router.post('/api/user', function (req, res) {
  req.user.update({email: req.body.email}, function(err, user) {
    if(err) next(err);
    res.end();
  })
})
