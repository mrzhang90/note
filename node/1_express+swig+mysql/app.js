var express = require('express');
var app = express();

//配置静态文件
app.use(express.static('public'));
//配置html模板
var swig=require("swig");
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

//配置mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zhang123456789',
  database : 'finger'
});
connection.connect();

app.get('/',function(req,res,next){
	var data={
		'title':'Welcome',
		'script':'/script/index.js',
		'style':'/stylesheets/index.css'
	}
	res.render('index',data)
})
//ajax请求数据
app.get('/insert',function(req,res,next){
	var obj={
		'username':req.query.username
	}
	connection.query('INSERT INTO userinfo SET ?', obj, function (error, results, fields) {
	  if (error) throw error;
		res.json({
			status:'ok',
			msg:'插入成功'
		})
	});
})
app.listen(3000,function(){
	console.log('service Start');
})