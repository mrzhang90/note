var http=require('http');
http.createServer(function(req,res){
	//定义一个返回头
	res.writeHead(200,{'Content-Type':'text/plan'});

	//发送响应的数据
	res.end('Hello world!\n');


}).listen(8000);

//服务运行后输出
console.log('server is running...')
