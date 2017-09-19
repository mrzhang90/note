var express = require('express');
var app = express();

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.json({
  	'name':'Hello from D!'
  });
});

app.listen(8081,function(){
	console.log('8081已启动');
})
