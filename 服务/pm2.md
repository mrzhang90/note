# pm2.json
```js
{
  apps : [{
    name: "app",
    script: "./app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    log_date_format:"YYYY-MM-DD HH:mm Z",
    //设置错误日志地址，导出错误日志，通常用log4导出错误日志，pm2的日志用来命令实时查看一下，那样的话就不需要设置以下的日志地址
    error_file: 'err.log',//错误日志
    out_file: 'out.log',//其他日志
  }, {
     name: 'worker',
     script: 'worker.js'
  }]
}
```
## 十个PM2中冷门但实用的功能
PM2发布于2013年，是使用JavaScript开发，主要用于Node.js业务持久化的进程管理器。相对于Systemd、Supervisord等通用进程管理器，PM2对JavaScript的业务更为友好，且使用更为简单，有着丰富的可扩展性，对非JavaScript业务的管理同样出色。可惜的是许多PM2用户对PM2的了解并不多，大部分用户都只掌握了基础的进程管理，其实PM2的能力绝不止于此，充分使用PM2能够让业务开发和维护的效率大大提升。本文就来列举这样十个PM2中冷门但实用的功能，希望能够帮助读者对PM2有新的认识。
### 0x01 自动保存
通常我们希望PM2本身开机自启，需要执行pm2 startup让其注册到操作系统的服务管理工具中，如果我们还希望PM2中的进程能随着PM2启动而启动，就需要每次在新增或删除进程后执行pm2 save，但如果你是一个像笔者一样记性不好的人，很可能会忘记执行这一步，导致PM2重新启动后，一个业务都没启动。那么这『多余』的一步有没有办法能自动执行呢？答案是有的：
```js
pm2 set pm2:autodump true
```
在Shell中输入这一行命令，我们就开启了PM2的自动保存功能，这样子我们对进程的变更将会被即时保存到~/.pm2/dump.pm2中，无需手动执行pm2 save。

这里我们使用到了pm2 set这个命令，其实这个命令执行的是对~/.pm2/module_conf.json的修改。这个文件是PM2下各模块的通用配置文件，在安装其他PM2模块（如反向代理、负载均衡服务器等）同样也有可能接触到这个文件。但对于PM2本身来说，目前可供我们使用的配置项只有autodump、registry、docker这三个，且没有集中的文档对其进行描述，感兴趣的读者可以阅读这三个配置项在源码中的实现，此处不再赘述：

pm2:autodump [lib/API/Startup.js#L401](https://github.com/Unitech/pm2/blob/56ee2cde5fea3e886b66253c0118ed7b07e0d100/lib/API/Startup.js#L401)
pm2:registry [lib/API/Modules/TAR.js#L319](https://github.com/Unitech/pm2/blob/56ee2cde5fea3e886b66253c0118ed7b07e0d100/lib/API/Modules/TAR.js#L319)
pm2:docker [lib/API.js#L1551](https://github.com/Unitech/pm2/blob/56ee2cde5fea3e886b66253c0118ed7b07e0d100/lib/API.js#L1551)
###0x02 输出日志到文件
部分业务可能为了省事将日志直接输出到stdout和stderr，在Shell中直接运行时我们可以使用如Linux和MacOS的重定向符>来将stdout输出到文件，再使用2>&1将stderr输出到stdout。但假设这样一个『省事』的业务上了生产环境，我们需要使用PM2来运行之，应该怎样做才能看到日志呢？PM2同样为我们提供了日志重定向的功能：
```js
pm2 start --log [fille] ...
```
是的，只需要在启动进程时指定--log参数，并提供日志文件的路径（是否存在这个文件都没有关系），就可以将stdout和stderr输出到我们指定的日志文件了。接下来我们就可以使用如tail一类的工具来对日志进行跟踪，或者你也可以使用PM2自带的日志显示功能：
```js
pm2 logs [id]
```
这里的id是你在执行pm2 ps时候所看到的进程id。
### 0x03 设置内存限制
也许你需要在PM2中运行一个内存管理比较差劲的程序，但又不希望这个程序在发生内存泄漏后消耗掉所有资源，影响其他进程，这时候PM2的内存限制功能就可以派上用场了：
```js
pm2 start --max-memory-restart=1024M ...
```
这里的单位可以为K(iB)、M(iB)和G(iB)，使用该参数启动进程后，PM2就会在进程内存使用率超过限制时强制重启进程，对于一些存在内存泄漏问题但不便于解决（或没必要解决）的业务非常实用。
### 0x04 查看某个进程的信息
通常我们可以使用pm2 ps来查看当前正在运行的所有进程，但这一命令只显示了最基础的信息，如环境变量、运行入口、运行参数等信息并没有在列表中显示出来。那么我们应该如何查看这些信息呢？PM2提供了这样的方法：
```js
pm2 show [id]
```
PM2会输出关于这个进程的所有信息，如下图所示：
![pm2 show index](https://picb.zhimg.com/80/v2-065a79e04dc0f9ff3ac6f3e94be7490e_1440w.jpg)
### 0x05 使用总览面板监控所有进程
上一节我们提到了使用pm2 show来查看某个进程的详细信息，但在生产环境下我们更多时候需要监控所有进程，包括CPU、内存使用、日志输出等信息，PM2同样提供了如下的命令来帮助我们监控所有进程：
```js
pm2 monit
```
PM2会启动一个面板，如下图所示：
![pm2 monit](https://pic2.zhimg.com/80/v2-0ba5a250063528bfd219c008dc14bcb3_1440w.jpg)

该面板可以分为四部分：进程列表（左上角）、当前进程日志（右上角）、当前进程性能信息（左下角）、当前进程基础信息（右下角）。我们可以使用键盘左右方向键来切换面板，使用上下方向键在面板中滚动，对所有进程进行监控。

实际上[PM2 Plus](https://pm2.io/pricing)还额外提供了资源占用历史、内存/CPU详细分析(Profiling)等高级功能，但由于该功能需要付费使用，此处不再展开说明，如果愿意付费使用的读者可以查阅官方文档：[PM2 Plus documentation](https://pm2.io/docs/plus/overview/)。
### 0x06 使用SourceMap获取错误位置
刚刚我们谈了那么多『不规范』的业务（如日志输出到stdout、内存泄漏等），接下来我们举一个『规范』的例子，也就是使用Webpack（或其他构建工具）对JavaScript代码进行压缩后的线上业务。

如果这些业务在线上出现了错误，但由于代码被压缩，只能显示错误出现在第一行（本来就只有一行），我们要怎样才能在日志中看到更详细的信息呢？

PM2考虑到了这一点，并提供了自动加载SourceMap的功能：
```js
pm2 start --source-map-support ...
```
假设你加载的js文件是index.js，在开启SourceMap支持后，PM2会自动寻找同目录下的index.js.map，并在出现错误时加载之，在日志中输出更易读的错误日志。下面是一个例子：
```js
// error.js
setInterval(function() {
    triggerError();
}, 1000);

function triggerError() {
    throw new Error("Some error...");
}
```
这里笔者使用Webpack生成了对应的error.min.js和error.min.js.map文件：
```js
webpack ./error.js -o error.min.js --devtool source-map --output-source-map-filename error.min.js.map
```
然后使用pm2加载error.min.js（不开启SourceMap）：

官网的文档存在错漏，关闭SourceMap支持应该是--disable-source-map-support而非--disable-source-map，笔者提交了相关修订：pull/185。
```js
pm2 start ./error.min.js --disable-source-map-support
```
可以看到错误信息只显示出现在第一行（但显然问题并不是出在第一行）。
![pm2 logs 8](https://pic1.zhimg.com/80/v2-12682d176f8fc2a5a8f6238456c228df_1440w.jpg)

接下来我们开启SourceMap支持，再运行一遍：
```js
pm2 start ./error.min.js --source-map-support
```
![日志](https://pic3.zhimg.com/80/v2-dca0abcf16d28c0a415094cdb7939e92_1440w.jpg)
此时就能从日志中看到正常的调用栈信息了，帮助我们更高效的跟踪问题的来源。
### 0x07 业务更新时自动重启进程
在业务开发与测试过程中，我们经常会遇到文件更新后需要重启业务的情况。对于本地环境我们可以使用如[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)等工具监听文件变化，然后在文件发生改变后重新运行服务器。而PM2同样提供了类似的功能帮助我们实现这一需求：
```js
pm2 start --watch
```
这样只要当前目录下有任意文件发生改变，PM2都会尝试重启进程。

在使用这一参数的时候，有几个需要注意的地方：

请在程序所在的目录执行启动命令，否则将会监视的不是程序所在目录，而是你执行目录当前所在的目录。
开启--watch参数后，就算你手动停止进程（不删除），进程也会在文件发生改变后自动启动，解决该问题的方法是在停止进程的时候加入如下参数：
```js
pm2 stop [id] --watch
```
如果我们需要忽略一些目录的变化（如临时文件）或只监听某些目录的变化，就需要使用PM2的API：[PM2 Ecosystem](https://pm2.keymetrics.io/docs/usage/application-declaration/)，然后撰写如下配置文件到ecosystem.config.js（摘自官方文档）：
```js
module.exports = {
  apps: [{
    script: "app.js",
    watch: ["server", "client"],
    // Delay between restart
    watch_delay: 1000,
    ignore_watch : ["node_modules", "client/img"],
    watch_options: {
      "followSymlinks": false
    }
  }]
}
```
### 0x08 更聪明的失败重启策略
相信很多使用过PM2或Docker的读者都遇到业务出现运行时错误后不断自动重启的问题。但很多时候运行时错误并非来自于业务本身，比如数据库服务器中断、连接数过多、甚至是上文提到的--watch参数过于灵敏（很多IDE或编辑器支持自动保存，可能保存的版本尚未开发完成，存在语法错误）。那么有没有诸如延时重启、无缝重启等功能呢？PM2提供了大量的相关选项：

#### 1. 固定延时
```js
pm2 start --restart-delay=2000 ...
```
这里的2000单位为毫秒，即在需要重启的时候等待两秒钟。
#### 2. 灵活延时
更多时候我们需要的是不断延长的重启时间，比如Filezilla连接FTP客户端失败后的重试时间会随着重试次数增多不断延长。PM2也提供了这样的功能：
```js
pm2 start --exp-backoff-restart-delay=1000
```
此处的1000单位也是毫秒，PM2会在多次重启失败后以设定的时间为初始值，使用指数移动平均算法不断延长重试时间，最高为15000毫秒（即15秒），并在进程成功启动30秒后重置重试时间到到初始值。该算法的具体实现可以参考PM2的相关源码：
[lib/God.js#L456](https://github.com/Unitech/pm2/blob/6e9bb1ee01c0132c76511b605968187072e1a746/lib/God.js#L456)
[lib/Worker.js#L162](https://github.com/Unitech/pm2/blob/5ad2446636b989cb2fe7834f1118575d3009ea5f/lib/Worker.js#L162)
#### 3. 零延时高可用
重启总是需要耗时的，如果我们希望业务在重启的时候不中断，就像Kubernetes的滚动更新一样，那应该怎么做呢？PM2的集群模式可以帮助我们实现这一需求。

需要注意的是，这里我们所指的『集群』并非是Kubernetes这样逻辑独立的服务器集群，而是Node.js原生支持的Cluster组件。如果对Cluster组件不了解的读者可以阅读这篇Node.js官方文档：[Cluster | Node.js v14.2.0 Documentation](https://nodejs.org/api/cluster.html)。

简而言之，Cluster组件就类似于PHP中的FPM或是Nginx中的Worker，为单线程的JavaScript运行时增加了能在多CPU上并行接收请求的能力，即运行多个实例作为子进程，并由一个父进程负责请求的调度。

但就算你不懂Cluster组件或是不想为现有业务加入Cluster支持，也没有关系，因为PM2为你实现了它，这样我们无需对现有源码进行任何修改，也能充分利用Cluster组件的功能来实现高可用，任意一个进程的停止，不会对整个业务造成影响。这就是本节笔者要提到的『零延时高可用』。

这里笔者以一个非常简单的Web服务器为例：
```js
var http = require("http");

http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello World\n');
}).listen(8081);
```
然后我们使用如下命令启动包含四个进程的Cluster（因为笔者的电脑刚好是四个核心）：
```js
pm2 start ./server.js -i 4
```
这里的4就是进程数，也可以设置为max以匹配当前环境最大核心数。

接下来我们就能在**pm2 ps**的结果中看到如下四个子进程：
![pm2 start ./server.js -i 4](https://pic2.zhimg.com/80/v2-12204551c982c08c6f9e54a858076ac6_1440w.jpg)

需要注意，Cluster模式下重启业务需要使用reload，而且不能使用进程ID（因为我们需要重启的是一组进程而非一个），如下所示：
```js
pm2 reload server
```
这里的server是上面**pm2 ps**结果中进程组共有的name。这样就既能充分利用服务器性能，又能实现业务的高可用，而我们所需要耗费的只是额外添加一个-i参数。

#### 4. 关闭失败重启功能
有时候我们还会使用pm2来进行一些尽管耗时，但不需要一直在后台运行的业务，例如爬虫。PM2默认会在进程退出后重新启动，但也提供了参数帮助我们关闭此功能：

pm2 start --no-autorestart ...
使用这个参数后，在业务退出时，状态会直接变为stop，而不会自动重启。
### 0x09 一条命令操作一组业务
上一节我们提到了可以使用Cluster批量生成进程并对其进行管理，但Cluster只是生成了一批一模一样的进程。一个常规的业务（尤其是微服务当道的现在）可能会由多个进程组成。这里笔者假设有一个业务叫做吃乎，包含API（api.js）、服务端渲染（ssr.js）、数据库（db.js）、监控（monitor.js）四个组件，如何对它们进行批量管理（比如重启）呢？

细心的读者可能在上面pm2 ps的输出结果中看到了namespace的字段，默认为default，其实这就是本节要说的关键内容：命名空间。我们可以使用命名空间对同一类业务进行归类，然后按命名空间来对业务进行批量管理：
```js
pm2 start api.js --namespace chihu
pm2 start ssr.js --namespace chihu
pm2 start db.js --namespace chihu
pm2 start monitor.js --namespace chihu
```
![pm2 ps](https://picb.zhimg.com/80/v2-3b2f36cb2d5c9f22c7b9f68116251d23_1440w.jpeg)
这时候我们可以看到，这四个进程的namespace均为chihu。如果我们需要停止这四个业务，就不需要逐一停止，只需要执行一条命令：
```js
pm2 stop chihu
```
这样就能一次停止四个进程了。其他操作同样类似，只要在对应命令的--help面板中能看到namespace的参数就可以，如下所示：
![pm2 restart --help](https://picb.zhimg.com/80/v2-ceaa19050f3df4d896cdf7e53698622b_1440w.jpg)
### 0x10 PM2的内置HTTP服务器
最后笔者想介绍一个极为实用但极少有人提及的功能：HTTP服务器。之前和很多同学探讨大前端项目前后端分离的时候，发现他们大多都使用Nginx、Apache甚至Tomcat来托管前端的静态页面，然后使用PM2来托管后端API。但为了一个简单的前端页面专门撰写一堆配置文件，实在是太浪费时间了，PM2可能也发现了这一点，于是贴心的内置了HTTP服务器：
```js
pm2 serve [path] [port]
```
是的，就这么简单，一条命令就能启动一个HTTP服务器。由于这个HTTP服务器使用的是Node.js实现，因此性能同样非常优异，在大部分情况下足够使用。如果是负载非常大的业务，一般也不会考虑使用PM2，而会使用更具扩展性的Kubernetes。

以上是笔者所分享的十个PM2中冷门但实用的功能。其实这十个功能在阅读官方文档和源码的过程中都可以了解到，而在学习过程中总结、掌握这些小技巧对于实际使用过程中的效率提升有着非常大的帮助。

限于篇幅，一些更为高级的功能（如Load&Dump、PM2 Plus）等并未在本文中提及。如果读者们想了解更多相关内容，不要犹豫，马上去阅读文档和相关源码吧！相信大家在阅读完毕后，一定会有比本文更多的收获，静心阅读永远是最高效、最深刻、最细致的学习方式。