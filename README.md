## curl请求
```js
curl -X POST \
	https://baidu.com \
	-F wd=refresh_token
```

## 插件
1. set-iterm2-badge
	命令行的背景上打上描述文字，用来提示当前窗口
	[github地址](https://github.com/bammoo/set-iterm2-badge)
1. node-bash-title
	设置当前命令窗口标题
1. postcss-px-to-viewport
	px转vw，[如何在Vue项目中使用vw实现移动端适配](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)
	例：
	```js
	"postcss": {
		"plugins": {
			"autoprefixer": {},
			"postcss-px-to-viewport": { 
				"viewportWidth": 320, 
				"viewportHeight": 1334,
				"unitPrecision": 3,
				"viewportUnit": "vw",
				"fontViewportUnit": "vw",
				"selectorBlackList": [".ignore", ".hairlines"],
				"minPixelValue": 1,
				"mediaQuery": false,
				"landscapeWidth": 568
			}
		}
	}
	```
1. 微信h5，在IOS手机上下滑动的时候，整个页面就被拖着走
	```
	使用iNoBounce，使用方法：
	1、在public文件夹下自己创建一份inobounce.min.js
	2、然后在index.html加这段代码 <script src="./inobounce.min.js"></script>

	github地址：https://github.com/wangyupo/iNoBounce
	```
	加上iNoBounce以后IOS不能滚动什么情况？部分页面不能滚动又是什么情况
	```
	所有页面都不能滚动
	在最外层加这样的css：
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;

	如果有单个页面不滚动，比如你在页面里面加了vant的list组件，发现页面不能上下滑动
	本页面最外层的css这样写：
	height: 100vh;
	overflow-y:scroll;
	-webkit-overflow-scrolling:touch;
	```
## 解决问题
1. 页面引入https图片，404
	```html
		<meta name="referrer" content="no-referrer">
	```
## 微前端
百度fis适合微前端
独立的微项目，有一个集成控制微项目的路由
yog2 init project创建一个为项目
yog2 run 运行总项目
yog2 release --dist debug
前端独立发包：
systemjs帮你管理webpack的包
webpack-system把webpack原来的模块化机制踢掉，换位systemjs，
## 库
1. vue核心库
	* svelte
		通过静态编译减少框架运行时的代码量
		可将模板({{msg}})编译为命令式的原生 DOM
			不需要DOM DIFF操作，节省代码量，提高性能
		对于特定功能，比如组件逻辑，if/else逻辑等... 在编译时，如果一个功能没用到，对应的代码就不会被编译到结果里去
		基于这两个特点，Svelte 应用的最终代码量可以非常小
	* prepack
		把代码执行预编译的过程，
	* babel-react-optimize
		优化virtual-dom运算
	* Relay Modern
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
* 自己配Nightwatch时，不能直接用node启动nightwatch.config.js，要建一个nightwatch.run.js的文件，用nightwatch.run.js帮助你启动nightwatch.config.js
	因为要启动Selenium/WebDriver 两个进程
* spawn
	把参数和命令到一起
## 七牛API
1. 获取视频第一帧图
http://***?vframe/jpg/offset/0
1. 获取多媒体(视频、音频)信息，包括时长、格式等
http://***.mp4?avinfo
## 解决safair下QQ在线客服调起bug
	```js
	//这是腾讯给的API，但是safair下会在重定向的时候，刷掉调起QQ的弹窗
	http://wpa.qq.com/msgrd?v=3&uin=757927051&site=qq&menu=yes
	//完美版：直接重定向，保留调起QQ的弹窗(腾讯很搞笑，sigT和sigU可为空但必须传)
	tencent://message/?Menu=yes&uin=757927051&Site=&Service=201&sigT=&sigU=
	```
## 图标
❤️🔍🚚 🚗🚴🍎🍌🌺
☁️😙🌞   ☁   ☁
   ☁ ✈   ☁  🚁
 🏬🏨🏫🏢🏤🏥🏦🏪
👬🌲 / 🚶 l🚍  \🌳👫
 🌳/ 🚘   l 🏄  \🌴🐈
 ⛳ /  🐢 l 🚔  \🌲👯
🌲/🚖     l   🐍     \🌴🏆
## 技术笔记
RESTful
	一种架构风格
	同一种路由，既可以设置get,又可以设置post,这种就输入RESTful
	
1. 动画原则：
	除了透明度(opacity)和切换(trandform)，不要改变任何属性
2. HTTP状态码：
	304：表示服务器认为目标与缓存中一致，指示浏览器直接访问缓存；；准确的解释为————代表文件处于未改变状态，因此未受理访问请求
3. fiebug调试:
    通过firbug调试,切换到html下,然后鼠标移动到html树中相应的元素上,上面的页面中相应的元素会被高亮显示:
    在页面中蓝色部分表示元素内部,紫色部分表示padding部分,黄色部分表示margin部分
4. 耦合度
	如果一个模块修改，其他模块不变-那么耦合度就很低
	如果一个模块修改，其他模块也要修改-那么他们的耦合度就非常高
5. 前端工程化
	项目打包
	测试
	发布到服务器
## 写给PHP开发者的Node.js学习指南
**php与Node.js最大的不同在于**，PHP是一门阻塞性语言，依赖于API并且在执行结束前并不返回任何结果，而Node.js是一门非租塞语言，依赖于执行结束事件和回调机制的API。
除了这一点外，PHP和Node.js惊人的相似。
PHP和Node.js，都类似于C语言，使用花括号({})作为代码段的标记，有function关键字，用于同样的目的以及语法相同。
如果Node.js验证了阻塞型API已经是过去时了，那么它同样也验证了C语言在过去、现在和未来的一些演化。回调机制可能是一个演化的进步，但是语法已经定式。
**语法的区别**
1. 拼接字符串，PHP使用点操作符(.)，而JavaScript使用加操作符(+)。
1. php使用array()来初始化数组，而JavaScript使用方括号([])。
## 学习记录：
1. 基本的数学理论和物理 运动 匀速 斜抛 三角函数 ax2+bx+2b  矩阵
2. canvas的基本用法 画圆 正方形
3. 利用canvas集合数学和物理 展现到一个画板上 实现基本canvas应用
4. 大量的接触 图标展现库 d3 hichartts echrats...源码看一看
5. 尝试着自己写一个 图形可视化的小库
6. 利用cocos进阶学会游戏场景啊 舞台啊 镜头啊 。。
7. 学会物理引擎在JavaScript中的应用 
8. 接触2.5D的游戏开发 利用这些游戏框架 开发绚丽的H5页面
9. 开始接触3D图形学的理论部分
10. 大致看看Webgl开始着手开发Three和周边的库
11. 完善你的数据结构和算法理论 不停的应用
12. 把前端架构的测试 性能啊 等等 优秀思想应用进前端图形学的工程

**javascript是在虚拟机(VM)中执行的，该虚拟机能够最大化地优化代码并压榨每一丝的性能，这也使得JavaScript称为速度最快的动态语言之一。
Wasm同样在JavaScript虚拟机中运行，但是它表现得更好。两者可以自由交互、互不排斥，这样你就同时拥有了两者最大的优势——JavaScript巨大的生态系统和有好的语法，WebAssembly接近原生的表现性能。**

## SSR
* 落地页
	ssr服务端渲染，页面打开后台直接给前端吐数据
* 交互页
	页面打开要等，通过ajax类技术跟后台交互
* 路由变化，页面没变
	比如手机百度地图，后端返回一个对象-包含html+css+js，前端拆分渲染到页面
* fis最值钱的是
	a.js->a.xxx5566.js->b.js
* javascript同构的目的
	把swig和vue合成一个，只要你能达到前后端模板通用这个目的,“直出我想要的，异步的再请求”
* 为什么SSR
	SEO
	网速，减少ajax请求
	ajax在手机浏览器的昂贵
		很多手机浏览器发送5个以上的ajax的请求，浏览器会把请求干掉，一个都发布出来
	总结,SSR考虑请求多的情况，先吐一部分重要的东西，其他的ajax慢慢来
	所以，SSR适合移动端，国外一般都不用SSR
* vue全家桶

## Virtual-dom
* Virtual-dom是一系列的模块集合，用来提供声明式的DOM渲染。既然DOM这么慢，我们就在JS和DOM之间加个缓存。JS只操作Virtual DOM,最后的时候写入DOM
* Virtual DOM算法主要实现三个函数：element、diff、patch(补丁)，然后就可以实际使用
* DOM DIFF
	* 比较两棵DOM树的差异是Virtual DOM算法的核心部分。
	* Virtual DOM只会对同一个层级的元素进行对比，第二层级的只会跟第二层级对比，这样算法复杂度就打到O(n)
	* 实际代码中，会对新旧两棵树进行一个深度优先的遍历，每个节点都有一个唯一的标记，如果有差异就记录到一个对象里面
	* 需要注意：
		1. 尽量不要跨层级的修改dom
		2. 设置key可以最大化的利用节点
		3. 不要盲目相信diff的效率，在必要时可以手工优化
			要考虑DOM DIFF的时间算法和空间算法

## 设置VSCode为符合ESLint
[参考](https://www.jianshu.com/p/d6a69eb08f07)
[VS Code 配置](https://www.cnblogs.com/suzhen-2012/p/6750157.html)
1. vsCode安装插件-ESlint，然后文件--》首选项--》设置
    ```js
    {
			//一个tab等于2个空格
			"editor.tabSize": 2,
		//双引号格式化为单引号
		"prettier.semi": false,
	    "prettier.singleQuote": true,
		//用来保存时自动格式化，默认只支持.js
        "eslint.autoFixOnSave": true,
		//配置校验的文件类型
        "eslint.validate": [
            "javascript",
            "javascriptreact",
            {
            "language": "html",
            "autoFix": true
            },
            {
            "language": "vue",
            "autoFix": true
            }
        ]
    }
    ```
1. prettier，使用ESLint运行Prettier
	```js
	//或者选择npm安装
	npm i --save-dev prettier eslint-plugin-prettier
	```
1. vsCode安装插件-Vetur，格式化vue代码
## git commit提交检测
[参考](https://www.jianshu.com/p/cdd749c624d9)
安装
```js
npm i --save-dev husky lint-staged
```
添加 hook 函数
```js
// package.json
{
...
    "scripts": {
        ...
        "precommit": "lint-staged", // git commit 执行这个命令，这个命令在调起 lint-staged
    },
    "lint-staged": {   // lint-staged 配置
        "app/**/*.{js,jsx}": [
            "prettier --tab-width 4 --write",
            "eslint --fix",
            "git add"
        ]
    },
...
}
```
这里 lint-staged 的配置是：在 git 的待提交的文件中，在 app 目录下的所有 .js .jsx 都要执行三条命令。前两条一会儿说，后一条是将处理过的代码重新 add 到 git 中。
## MarkDown
**xx** 相当于strong
> >向后缩,并且文字为灰色