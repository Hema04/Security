var express = require('express');
var bodyParser = require('body-parser');
var hpp = require('hpp');
var app = express();
app.use(bodyParser.urlencoded());
app.use(hpp());
var router = express.Router();


router.get('/', function(req, res){
    if(req.query.name){
      res.status(200).send('Hi ' + req.query.name.toUpperCase())
    } else {
      res.status(200).send('Hi');
    }
  });

  module.exports = router;