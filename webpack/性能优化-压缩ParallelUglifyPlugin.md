### 背景
webpack默认提供了UglifyJS插件来压缩JS代码，但使用的是单线程压缩代码，所以正式环境打包压缩速度会很慢(因为压缩JS需要先把代码解析成用Object抽象表示的AST语法树，再去应用各种规则分析和处理AST，导致这个过程耗时大)
使用UglifyJS压缩代码如下：
```js
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
  ]
}
```

### 解决方案
HappyPack的思想是使用多个子进程去解析和编译JS,CSS等，这样就可以处理多个子任务，多个子任务完成后，再将结果发到主线程中，有了这个思想，**ParallelUglifyPlugin 插件就产生了**，当webpack有多个JS文件需要输出和压缩的时候，**原来会使用UglifyJS去一个个压缩并且输出，但是ParallelUglifyPlugin插件则会开启多个子进程，把对多个文件压缩的工作分别给多个子进程去完成，但是每个子进程还是通过UglifyJS去压缩代码。**

### 使用方式
1. 安装
    ```js
    npm i -D webpack-parallel-uglify-plugin
    ```
1. 配置
    ```js
    // 引入 ParallelUglifyPlugin 插件
    const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

    module.exports = {
      plugins:[
        new ParallelUglifyPlugin({
            //使用正则去匹配哪些文件需要被 ParallelUglifyPlugin 压缩，默认是 /.js$/.
            test:'', 
            //使用正则去包含被 ParallelUglifyPlugin 压缩的文件，默认为 [].
            include:'',
            //使用正则去不包含被 ParallelUglifyPlugin 压缩的文件，默认为 [].
            exclude:/\.min\.js/,//不包含.min.js的文件
            //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1。
            workerCount: os.cpus().length,//电脑性能还可以，那么开启所有的CPU 
            //用于压缩 ES5 代码时的配置，Object 类型，直接透传给 UglifyJS 的参数。
            uglifyJS: {},
            //用于压缩 ES6 代码时的配置，Object 类型，直接透传给 UglifyES 的参数。
            uglifyES: {},
            //缓存压缩后的结果，下次遇到一样的输入时直接从缓存中获取压缩后的结果并返回，cacheDir 用于配置缓存存放的目录路径。默认不会缓存，想开启缓存请设置一个目录路径。
            cacheDir: '',
            //是否为压缩后的代码生成对应的Source Map, 默认不生成，开启后耗时会大大增加，一般不会将压缩后的代码的sourceMap发送给网站用户的浏览器
            sourceMap: false
        })
      ]
    }
    ```
* **使用 ParallelUglifyPlugin 并行压缩输出JS代码,然后传递给UglifyJS**
    ```js
    // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
    new ParallelUglifyPlugin({
      // 传递给 UglifyJS的参数如下：
      uglifyJS: {
        output: {
         // 最紧凑的输出，默认为输出可读性较强的代码（保留空格和制表符）
          beautify: false,
          // 删除所有的注释，默认为保留
          comments: false
        },
        compress: {
         // 在UglifyJs删除没有用到的代码时不输出警告，默认为输出警告
          warnings: false,

         // 删除所有的 `console` 语句，可以兼容ie浏览器，默认为不删除
          drop_console: true,

          // 内嵌定义了但是只用到一次的变量(比如将 var x = 1; y = x, 转换成 y = 5), 默认为不转换
          collapse_vars: true,

          /*
           是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
           var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
          */
          // 提取出出现多次但是没有定义成变量去引用的静态值（比如将 x = 'xxx'; y = 'xxx'  转换成 var a = 'xxxx'; x = a; y = a），默认为不转换
          reduce_vars: true
        }
      }
    }),
    ```