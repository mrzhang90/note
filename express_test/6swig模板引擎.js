var express = require('express');
var app = express();
var swig = require('swig');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(express.static('public'));

app.get('/',function (req, res, next) {
 res.render('home',{
  title:'测试首页',
  data:'hello Express'
 })
});

app.listen(8081,function(){
	console.log('8081已启动');
})
