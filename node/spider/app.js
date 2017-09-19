var express = require('express')
var app = express()
var request = require('request');
var cheerio = require('cheerio');

app.get('/', function (req, res) {
	request('http://www.jikexueyuan.com/', function (error, response, body) {
		if(!error && response.statusCode==200){
			$=cheerio.load(body);//当前的$是一个拿到了整个BODY前端选择器
			res.json({
				'ClassNum':$('.aside-cList>li').length
			});
		}
	  // console.log('error:', error); // Print the error if one occurred 
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  // console.log('body:', body); // Print the HTML for the Google homepage. 
	});
})

app.listen(3000)