var http=require('http');
http.createServer(function(req,res){
	//����һ������ͷ
	res.writeHead(200,{'Content-Type':'text/plan'});

	//������Ӧ������
	res.end('Hello world!\n');


}).listen(8000);

//�������к����
console.log('server is running...')
