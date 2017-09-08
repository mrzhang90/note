var express=require('express');
var app=express();

app.use(express.static('public'));

//http://localhost:8081/?username=aa
app.get('/', function (req, res) {
	console.log(req.query);
   res.send('Hello World 【' + req.query.username +'】');
})
//http://localhost:8081/index/bb?username=aa
app.get('/index/:id', function (req, res) {//:id是一个变量
	console.log(req.params);
   // res.send('Hello World 【' + req.params.id +'】');
	res.json({
		id:req.params.id
	})
})
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})