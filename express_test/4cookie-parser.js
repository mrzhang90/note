var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// 加载用于解析 cookie 的中间件
app.use(cookieParser());//这句就加载了cookie-parser的方法,原理是：
// app.use(function(req,res,next){
// 	req.cookies=function(){
// 		return {
// 			data 123
// 		}
// 	}
// })

app.get('/index',function(req,res,next){
	console.log(req.cookies)
	res.send(req.cookies['officeUsertoken'])
})
app.listen(8081,function(){
	console.log('8081已启动');
})