//阻塞代码-同步调用
//var fs=require('fs');
//var data=fs.readFileSync('data.txt');//阻塞式的读取
//console.log(data.toString());//按照字符串处理


//非阻塞代码-异步调用
var fs=require('fs');
fs.readFile('data.txt',function(err,data){
	if(err){
		return console.log(err)
	}console.log(data.toString());
})
console.log('程序执行完毕！');