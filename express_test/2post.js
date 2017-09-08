var express = require('express');
var app = express();
var bodyParser = require('body-parser');
 // 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
 
app.get('/index', function (req, res) {
   res.sendFile( __dirname + "/views/" + "index.html" );
})

app.post('/index', urlencodedParser,function (req, res) {
   console.log(req.body);
   // res.send('hello '+ req.body.data);
   res.redirect('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd='+req.body.data+'&rsv_pq=f7f7d64e0000e458&rsv_t=7a650UjTsGkE%2BGB5JEXQxtWAfXUKQ638DSf6ByYtP1dl83ZEZi5x4gUORj0&rqlang=cn&rsv_enter=1&rsv_sug3=2&rsv_n=2&rsv_sug1=1&rsv_sug7=100&rsv_sug2=0&inputT=342&rsv_sug4=412')
})
 
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})