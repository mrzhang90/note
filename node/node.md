##插件
1. http-server
    快速开启node服务
    一个简单的零配置命令行http服务器
    * 全局安装：
        npm i -g http-server
    * 快读启动
        cd到要运行到目录，然后使用命令http-server
##方法
	process()
		全局变量，即global对象的属性
	util
		是Node核心模块，提供常用函数集合
		util.inherits
			继承父类，实现对象简原型继承的函数
	几个特殊的API
		setTimeout和setInterval线程池不参与
		process.nextTick() 实现类似
			setTimeout(function(){},0);每次调用放入队列中，在下一次循环中取出
		总结：
			process.nextTick()，效率最高，消费资源小，但会阻塞CPU的后续调用；
				idle观察者 ，执行优先级最高
			setTimeout()，精确度不高，可能有延迟执行的情况发生，且因为动用了红黑树，所以消耗资源大；
				io观察者 ，执行优先级次之
			setImmediate()，消耗的资源小，也不会造成阻塞，但效率也是最低的
				check观察者，执行优先级最低
			http://blog.csdn.net/hkh_1012/article/details/53453138
			https://www.zhihu.com/question/23028843/answer/34597367
		node实现sleep

##Node经典代码
	正则匹配路由-三个model服务正则路由
		router.get(/^\/(\d+)_(\d+)/,cModel.A,cModel.B,cModel.C);

	加密算法
		var shaObj = new jsSHA(string,'TEXT');
		VAR HASH = shaObj.getHash('SHA-1','HEX');

	请求headers报头
	var forPound = req.headers['x-forwarded-for-pound'];

	回调处理异步
	callback(new Error('Fail to parse http response to json,url:'+reqOptions.url+'),red,body);

	在所有路由没有触发之前，引入middleware
	require('./middleware')(app);

	异步解决方案
	async( await ctx.render('index.html'));

	常用的Node控制异步技术手段
		1.step,wind(提供等待的异步库)，Bigpipe,Q.js
			早期的异步处理库
			Q.JS
				q.js在nodejs里是一个非常流行的promise库,支持浏览器端使用
				https://yq.aliyun.com/articles/53393
				http://www.xuanfengge.com/web-route-frame.html?utm_source=tuicool&utm_medium=referral
		2.Async,Await
		3.Promise/Defferred是一种先执行异步调用，延迟传递的处理方式。
			Promise是高级接口，事件是低级接口。低级接口可以构建很多复杂场景，高级接口一旦定义，不太容易变化，不再有低级接口的灵活性，但对于解决问题非常有效
		4.由于Node基于v8的原因，目前还不支持协程。协程不是进程或线程，其执行过程类似于例程，或者说不带返回值得函数调用
			进程
				任务管理器里的进程中的那些，就是进程，相当于一个应用程序就是一个进程
			线程
				一个进程包含多个线程，线程是帮助应用程序做事情的
			协程
				一个进程包含多个协程
			线程和协程的区别：
				线程相对独立，有自己的上下文，切换受系统控制；
				协程也相对独立，有自己的上下文，但是其切换由自己控制，由当前协程切换到其他协程由当前协程来控制

##node实现web端文件下载
	//node(koa)实现web端文件下载
	downloadImg(ctx){
		var fileName = 'code_testnet.png';
		let filePath=path.join(__dirname,'../assets/images/',fileName)
		var stats = fs.statSync(filePath); 
		if(stats.isFile()){
			ctx.type="application/octet-stream"
			ctx.attachment(fileName);
			ctx.length=stats.size
			ctx.body=fs.readFileSync(filePath);
		} else {
			ctx.status=404
		}
	}

# Node和Npm版本升级到最新版
1. 先查看本机node.js版本：
	```js
	node -v
	```
1. 清除node.js的cache：
	```js
	sudo npm cache clean -f
	```
1. 安装 n 工具，这个工具是专门用来管理node.js版本的，别怀疑这个工具的名字，是他是他就是他，他的名字就是 "n"
	```js
	sudo npm install -g n
	```
1. 安装最新版本的node.js
	```js
	sudo n stable
	```
1. 再次查看本机的node.js版本：
	```js
	node -v
	```
1. 更新npm到最新版：
	```js
	$ sudo npm install npm@latest -g
	```
1. 验证
	```js
	node -v
	npm -v
	```
