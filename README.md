## 插件
1. set-iterm2-badge
	命令行的背景上打上描述文字，用来提示当前窗口
	[github地址](https://github.com/bammoo/set-iterm2-badge)
## 库
1. vue核心库
	svelte
		通过静态编译减少框架运行时的代码量
		可将模板({{msg}})编译为命令式的原生 DOM
			不需要DOM DIFF操作，节省代码量，提高性能
		对于特定功能，比如组件逻辑，if/else逻辑等... 在编译时，如果一个功能没用到，对应的代码就不会被编译到结果里去
		基于这两个特点，Svelte 应用的最终代码量可以非常小
	prepack
		把代码执行预编译的过程，
	babel-react-optimize
		优化virtual-dom运算
	Relay Modern
		Relay 将 React 与 Facebook 的 GraphQL 查询语言结合起来成就了 Relay Modern，它旨在推动 Relay 的理念，并克服原始设计的一些限制，即简化设计以提高框架整体性能
1. DOM DIFF非常有用的库
	1.virtual-dom/vdom/create-element.js
	2.virtual-dom/vdom/patch.js
	3.实现patch、diff
		https://github.com/snabbdom/snabbdom
	4.简陋版
		https://github.com/livoras/simple-virtual-dom/blob/master/lib/patch.js
		https://github.com/livoras/simple-virtual-dom/blob/master/lib/diff.js
1. concurrent.thread.js
	把同步的代码
	模拟多线程
	不用担心代码堵死，都是异步的，多线程的
	参考：http://www.cnblogs.com/woodk/articles/5199536.html
## 切面编程
[参考](https://www.zhihu.com/question/24863332)
这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。 
## webAssembly
[参考](http://blog.csdn.net/sinat_32582203/article/details/73355211)
## Nightwatch
自己配Nightwatch时，不能直接用node启动nightwatch.config.js，要建一个nightwatch.run.js的文件，用nightwatch.run.js帮助你启动nightwatch.config.js
	因为要启动Selenium/WebDriver 两个进程
spawn
	把参数和命令到一起
## 七牛API
获取视频第一帧图
http://***?vframe/jpg/offset/0
获取视频信息
http://***.mp4?avinfo
## 图标
🔍🚚
☁️🌞   ☁   ☁
   ☁ ✈   ☁  🚁
 🏬🏨🏫🏢🏤🏥🏦🏪
👬🌲 / 🚶 l🚍  \🌳👫
 🌳/ 🚘   l 🏄  \🌴🐈
 ⛳ /  🐢 l 🚔  \🌲👯
🌲/🚖     l   🐍     \🌴🏆

**xx** 相当于strong
> >向后缩,并且文字为灰色