var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  oauthID: Number,
  name: String,
  created: Date
})

var User = mongoose.model('User', userSchema);


module.exports = User;