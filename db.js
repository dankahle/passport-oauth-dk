var mongoose = require('mongoose'),
  passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
  oauthID: Number,
  fullName: String,
  email: String,
  created: Date
})
userSchema.plugin(passportLocalMongoose, {saltlen: 8, keylen:16});

var db = mongoose.createConnection('mongodb://localhost:27017/db')
  .on('error', function (err) {
    console.error('mongerr:', err.stack);
  })

var User = db.model('User', userSchema);

module.exports = {
  db: db,
  User: User
};

