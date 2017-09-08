var express = require('express');
var app = express();

app.get('/',function(req,res,next){
	res.send('hello world')
	next();
})
app.listen(8081,function(){
	console.log('8081已启动');
})

console.log('hello world')