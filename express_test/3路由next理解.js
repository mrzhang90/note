var express = require('express');
var app = express();

app.get('/index/index',function(req,res,next){
	console.log('index了');
	next();
},function(req,res,next){
	res.send('hello test');
	next();
},function(req,res,next){
	console.log('我是结尾')//这里可以继续执行，因为next会一直继续服务端操作
	// res.json({//这里会报错，因为上层的res.send已经给用户响应数据，跟客户端的握手已经完成
	// 	'aa':1
	// })
})
app.listen(8081,function(){
	console.log('8081已启动');
})

console.log('hello world')