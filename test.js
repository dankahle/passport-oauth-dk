
var app = require('express')()

app.use('/login', function(req, res){
  res.send(req.query)
})

app.listen(3000)