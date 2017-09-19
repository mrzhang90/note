var express=require('express');
var app=express();

//文件读取模块
var fs=require('fs');
function readFile(fileName){
	return new Promise(function(resolve,reject){
		fs.readFile(fileName,function(error,data){
			if(error) return reject(error);
			resolve(data);
		})
	})
}
async function gen(name){
	var n1=await readFile(name);
	return n1.toString();
}

//配置静态文件
app.use(express.static('public'));
//配置html模板
var swig=require("swig");
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.get('/',function(req,res,next){
	//读取解析json文件
	gen(__dirname+"/data.json").then(function(result){
		var data = (new Function("","return "+result))();//读取的json数据转成正规的json对象
		res.render('await',data);
	});
})
app.get('/insert',function(req,res,next){
	res.json({
		'status':'ok',
		'msg':'插入成功'
	})
})
app.listen(3000,function(){
	console.log('service Start')
})