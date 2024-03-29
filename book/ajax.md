## request payload 、form data 、Query String Parameters的区别
- Request Payload  
  当发起post提交，参数为string、array、object，content-type默认为text/plain(普通文本)
- Form Data  
  当发起post提交，且参数是formData类型，若未指定content-type，则默认content-type为multipart/form-data  
  主要用于发送表单数据，支持bolb、file或者string
- Query String Parameters  
  当发起get请求是，参数会以&的方式连接，和url?拼接
## 为什么会有跨域？
表单提交不会有跨域，但为什么js的ajax请求就会有跨域？我们都知道是浏览器的**同源策略**导致的。  
[那么为什么会有跨域](https://segmentfault.com/a/1190000015597029)
- 什么是同源策略？  
  同协议、同端口、同域名
- 同源策略限制的对象  
	- Cookie、LocalStorage 和 IndexDB 无法读取。
	- DOM 无法获得。
	- AJAX 请求不能发送。
  - [解决canvas图片getImageData,toDataURL跨域问题](https://www.zhangxinxu.com/wordpress/2018/02/crossorigin-canvas-getimagedata-cors/)
- 为什么要限制cookie  
  cookie的工作流程：1.服务端向客户端发送cookie；2.浏览器存储cookie；3.之后每次http请求浏览器都将cookie自动添加到request header中(同域下)发送到服务端。  
  在跨域下,cookie不会自动添加到request header中  
  [你真的会使用XMLHttpRequest吗？](https://segmentfault.com/a/1190000004322487#articleHeader13)了解-xhr.withCredentials与 CORS 什么关系  
  [聊一聊cookie](https://segmentfault.com/a/1190000004556040#articleHeader6)  
  [Cookie/Session的机制与安全](https://harttle.land/2015/08/10/cookie-session.html)  
  [浅谈CSRF攻击方式](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)  

## 跨域的解决方案
1. CORS请求头  
  [阮一峰 跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html)  
  后端添加头解决跨域 Access-control-allow-origin  
  它允许浏览器向跨资源服务器，发送一个XMLHttpRequest请求，从而克服AJAX只能同源使用的限制，整个CORS通信都是浏览器自动完成的。  
  so,实现CORS通信，关键是服务器设置。 
2. WebSocket  
  WebSocket 是一种双向通信协议，在建立连接之后， WebSocket的 server与 client都能主动向对方发送或接收数据而不受同源策略的限制
3. postMessage  
  适合不同窗口之间的通信
4. iframe加form  
  表单提交的时候，动态创建一个iframe，用于form表单提交，模拟出ajax提交的效果。iframe不显示就行，虽然表单提交刷新了iframe，但对于用户无感知。
5. document.domain
  ```
  //两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。例如：www.baidu.com 和 hi.baidu.com
	test.xxx.com a.html
	<script>
		document.domain="baidu.com";//设置同源策略
		document.cookie="test1=hello";
	</script>

	test.xxx.com b.html
	<script>
		document.cookie
	</script>

	domain='baidu.com';//最实用的同源策略
  ```
6. jsonp(script)  
  **script标签的 src属性中的链接可以访问跨域的 js脚本**，利用这个特性，服务端不再返回 JSON格式的数据，而是返回一段调用某个函数的 js代码，在 src中进行了调用，这样实现了跨域
  ```js
    <script type="text/javascript" src="http://aa.com/index.php?callback=test"></script>
		<script type="text/javascript">
			function test(data){
				console.log(data);
			}
		</script>

		<?php
			if(callback){
				test({'aa':123})
			}
		?>
  ```
7. img、link(background)
  ```js
    var s=new Image();
	 	vat start=Date.now();
	 	s.src="http://www.baidu.com/s.gif";
	 	s.onload=function(){
	 		var end=Date.now();
	 		var t=end-start;
	 		v=s.size / t +'kb/s';
	 	}
  ```
8. nginx代理
```js
server{
  location ^~ /api {
      proxy_pass http://localhost:8080;
  }
}
```
9. vue-cli devServe配置
```js
proxyTable: {
  '/list': {
    target: 'http://api.xxxxxxxx.com',
    changeOrigin: true,
    pathRewrite: {
      '^/list': '/list'
    }
  }
}
```
[全面分析前端的网络请求方式](https://mp.weixin.qq.com/s/x4YM3TtToN29k4piJlppug)
## ajax
XMLHttpRequest，(IE6下使用ActiveXObject)  
参数withCredentials：ajax请求默认会携带同源请求的 cookie，而跨域请求则不会携带 cookie，设置 xhr的 withCredentials的属性为 true将允许携带跨域 cookie。  
## Jquery
$.ajax是jquery对原生AJAX的封装
```js
$.ajax({
    dataType: 'json', 
    // 设置返回值类型
    contentType: 'application/json', 
    // 设置参数类型
    headers: {
    'Content-Type',
    'application/json'
    },
    // 设置请求头
    xhrFields: { withCredentials: true }, 
    // 跨域携带cookie
    data: JSON.stringify({a: [{b:1, a:1}]}), // 传递参数
    error:function(xhr,status){  // 错误处理
      console.log(xhr,status);
    },
    success: function (data,status) {  // 获取结果
      console.log(data,status);
    }
})
```
## Fetch
FetchAPI是一个用于访问和操作HTTP管道的强大的原生API，是XMLHttpRequest的替代品，是基于原生js的封装，没有使用XMLHttpRequest对象  
由于兼容性考虑，需要引入polyfill  
fetch默认不会带cookie，需要添加配置项： fetch(url, {credentials: 'include'})
```js
//默认的 credentials类型为 same-origin,即可携带同源请求的coodkie
if(request.credentials === 'include') {
  xhr.withCredentials = true
} 
else if(request.credentials === 'omit') {
  xhr.withCredentials = false
}
```
## AXIOS
axios是对XHR的封装，是基于promise的HTTP库，同时支持浏览器和node中使用  
防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。
```js
axios.get('/user', {
  params: {
    ID: 12345
  }
})
axios.post('/add',{
  data:{
    username:'lily'
  }
})
```
欢迎star:[https://github.com/mrzhang90/note/blob/master/book/ajax.md](https://github.com/mrzhang90/note/blob/master/book/ajax.md)