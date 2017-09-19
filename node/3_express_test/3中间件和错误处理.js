var express=require('express');
var app = express();
// var router = express.Router();router中间件和app中间件处理的情况一样
//router没有特别复杂的app里的api ;; router只有路由相关的api 相当于mini的app
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('必经的路由:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.data=123;
  next();//通过next把中间件分成一个个的小石头
},function(req,res,next){
	console.log('通过中间件取到的值',res.data);
	res.send('end');
});

//错误处理中间件
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('饿哦 505了!');
});

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("接口已启动 http://%s:%s", host, port)
 
})