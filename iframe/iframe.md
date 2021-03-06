* 如果父页和子页之间是同域，很容易
	父页可以通过调用子页的contentWindow来操作子页的DOM树，同理，
	子页可以调用父页的contentWindow来操作父页的DOM树。
* 如果他们不同域，则必须遵守同源策略，
	但子页还是可以对父页的location值进行写操作，这样可以让父页重定向到其他网页，
	不过对location的操作仅仅只有写权限，而没有读权限，这样就不能获取到父页location URL的内容, 否则有可能会造成隐私数据泄露, 比如有的网站将身份认证token存在于URL中

##方法：
PS:需要同域访问
* 子iframe调用父的方法，window可以省略
	```
	[window.]parent.window.fn();
	```
* 子iframe查找父的body对象
	```
	[window.]parent.window.document.body;
	```
* 子iframe改变父iframe页面的value
	```
	[window.]parent.window.document.getElementById('parent_button').value="parent_button";
	```
* 父iframe调用子页的方法。 
	```js
	[window.]myFrame.window.fn();
	//等同于：
	document.getElementById('iframe').contentWindow.fn();
	```
* 父iframe改变子页的value
	```js
	[window.]myFrame.window.document.getElementById('child_button').value="child_button";
	//等同于：
	document.getElementById('iframe').contentWindow.document.getElementById('child_button').value="child_button";

	//也就是说
	document.getElementById('iframe').contentWindow
	//等同于
	myFrame.window//myFrame为iframe的name属性
	```
* 设置子窗口的高度
	```js
	var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;//获取父窗口
	if (iframeWin.document.body) {
		iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
	}
	```
##技巧：
	```js
	// 判断是否在框架或在对话框中
    if(self.frameElement && self.frameElement.tagName == "IFRAME"){
        alert('未登录或登录超时。请重新登录，谢谢！');
        top.location = "xxx.htm";
    }
	```

##跨域父子页面通信方法
* 如果iframe所链接的是外部页面，因为安全机制就不能使用同域名下的通信方式了。
* 父页面向子页面传递数据
	实现的技巧是利用location对象的hash值，通过它传递通信数据。在父页面设置iframe的src后面多加个data字符串，然后在子页面中通过某种方式能即时的获取到这儿的data就可以了，例如：
	* 在子页面中通过setInterval方法设置定时器，监听location.href的变化即可获得上面的data信息
	* 然后子页面根据这个data信息进行相应的逻辑处理
* **window.top**-子页面向父页面传递数据
	实现技巧就是利用一个代理iframe，它嵌入到子页面中，并且和父页面必须保持是同域，然后通过它充分利用上面第一种通信方式的实现原理就把子页面的数据传递给代理iframe，然后由于代理的iframe和主页面是同域的，所以主页面就可以利用同域的方式获取到这些数据。使用 **window.top**或者**window.parent.parent**获取浏览器最顶层window对象的引用。

##注意事项：
要确保在iframe加载完成后再进行操作，如果iframe还未加载完成就开始调用里面的方法或变量，会产生错误。判断iframe是否加载完成有两种方法：
1. iframe上用onload事件
2. 用document.readyState=="complete"来判断
##[参考](https://www.cnblogs.com/sydeveloper/p/3712863.html)