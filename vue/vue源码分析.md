## Object.create(null)
	Object.create(null)没有继承任何原型方法，也就是说它的原型链没有上一层
	在js中null是没有任何属性和方法的。你继承了一个null，所以里面没有任何东西
	来源
		https://segmentfault.com/q/1010000009976954
##可学习汤姆大叔的
[设计模式之观察者模式](https://blog.csdn.net/qq_21201143/article/details/79752377)		
参考：
	http://jiongks.name/blog/vue-code-review/
	https://www.cnblogs.com/aaronjs/p/7274965.html
结论：
	Vue.js的组成是由core+对应的平台补充代码构成
		(独立构建和运行时构建只是platforms下web平台的两种选择)
benchmarks
	测试性能
src
	/core : 目录是Vue.js的核心(重点)
		/components
			模版编译的代码
		/global-api
			最上层的文件接口
		/instance
			生命周期->init.js(生命周期都封装到init.js里)
		/observer
			数据采集与订阅
		/util
			常用工具方法类
		/vdom
			虚拟DOM
		/config.js
		/index.js
	/compiler
		目录是编译模版
	/platforms
		目录是针对核心模块的'平台'模块
		/web
		/weex
			Weex是一套简单易用的跨平台开发方案，web的开发体验构native应用，与Vue合作，使用Vue作为上层框架
	/server
		目录是处理服务端渲染
	/sfc
		目录是处理单文件.vue
	/shared
		目录提供全局用到的工具函数
双向数据绑定 MVVM
	双向绑定（响应式原理）所涉及到的技术
		Object.defineProperty
			能够观察数据的变化，能够设置get和set
		Observer
			观察者模式
		Watcher
			相当于订阅者，也就是接收观察者的消息
		Dep
			保持观察者模式的依赖
		Directive
			指令

vue不支持IE8以下，因为一些ES5的新方法
vue的小特性
	vue/src/core/components/keep-alive.js
		Vue的内置组件，复用组件(缓存组件),避免多次加载相应的组件,减少性能消耗
			将首次触发请求写在created钩子函数中,就能实现缓存,
				比如列表页,去了详情页 回来,还是在原来的页面
	vue/src/core/instance/init.js
	状态机的深入运用
	缓存机制 异步队列
