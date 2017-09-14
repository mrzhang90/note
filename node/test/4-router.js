function route(pathname,response) {
  	response.writeHead(200,{
  		"Content-Type":"text/plain"
  	})
	if(pathname=='/'){
		response.write("Hello Home");
		response.end();
	}else if(pathname=='/home/index'){
		response.end('home');
	}else{
		response.end("404");
	}
}
 
exports.route = route;