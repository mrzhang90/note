### Chrome 浏览器查看内存占用

1. 打开开发者工具，选择 Performance 面板。
1. 在顶部勾选 Memory。
1. 点击左上角的录制按钮。
1. 在页面上进行各种操作，模拟用户的使用情况。
1. 一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况。

* > 如果内存占用基本平稳，接近水平，就说明不存在内存泄漏。
* > 反之，就是内存泄漏了。

### 命令行可以使用 Node 提供的`process.memoryUsage`方法。
`process.memoryUsage`返回一个对象，包含了 Node 进程的内存占用信息。该对象包含四个字段，单位是字节，含义如下：
* rss（resident set size）：所有内存占用，包括指令区和堆栈。
* heapTotal："堆"占用的内存，包括用到的和没用到的。
* heapUsed：用到的堆的部分。
* external： V8 引擎内部的 C++ 对象占用的内存。
> 判断内存泄漏，以heapUsed字段为准。

参考链接：
	* [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
	* [在Node.js找到一个JavaScript内存泄漏的简单指南](https://www.alexkras.com/simple-guide-to-finding-a-javascript-memory-leak-in-node-js/)
	* [调试Node.js应用程序内存泄漏](https://www.toptal.com/nodejs/debugging-memory-leaks-node-js-applications)
	* [认识Node.js的垃圾收集和狩猎的内存泄漏](https://www.dynatrace.com/blog/understanding-garbage-collection-and-hunting-memory-leaks-in-node-js/)