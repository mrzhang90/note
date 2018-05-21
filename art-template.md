## 引用文件：
	https://github.com/aui/art-template/blob/master/lib/template-web.js
## 使用方法：
	render({
	    handle: handle[index-1]
	});
## 封装函数：
	 ### 函数使用场景：
		#### 1.初始化渲染
		#### 2.修改数据，重新渲染的时候
	function render(data){
	    var data = data;
	    var html = template('test', data);
	    document.getElementById('publicHandle').innerHTML = html;
	}