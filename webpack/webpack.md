模块(import和require)打包器
## 单页应用
    每个页面都是一个components
    单页的核心在直出，runtime一定要打到页面，减少页面请求量，提升移动端首屏加载速度
## 多页应用
    多页面即多entry,一个view对应一个entry
    entry管理资源(index.enntry.js管理index.html里所有的资源,index.html管理layout等模板)，
    最终entry交给webpack
## webpack
1. entry
    ```js
    //自动收集entry,扩充output 
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        const entrykey = RegExp.$1
        _entry[entrykey] = item;
        const [dist, template] = entrykey.split(“-");
    }
    ``` 
1. webapck最核心的四个包
    * main.bundles.js
        主包
    * runtime.bundles.js
        webpack运行时
        ```js
            optimization:{
                // 生成runtime.bundles.js-
                    // webpack运行时
                runtimeChunk:{
                    name:"runtime"
                }
            },
        ```
    * common.bundles.js
        公共包
        ```js
            optimization:{
                // 生成common.bundles.js-
                    // 公共包
                splitChunks:{
                    // 以前用commensChunks,现在用这个
                    cacheGroups:{
                        commons:{
                            chunks:"initial",
                            name:"common",
                            minChunks:1,
                            // 最大请求出
                            maxInitialRequests:5,
                            minSize:0
                        }
                    }
                },
            },
        ```
    * magin-commonent-async.bundle.js
        异步包，动态引入的，使用魔法注释会生成这个文件
1. Magic Comments
    魔法注释,动态引入
    ```js
        import(/* webpackChunkName: "my-chunk-name" */ 'module');
        // 伪代码 按条件加载模块
        if(page === 'subpageA') {
            import(/* webpackChunkName:'subpageA' */'./subPageA').then(function(subPageA){
                console.log(subPageA);
            })
        } else if (page === 'subpageB') {
            import(/* webpackChunkName:'subpageB' */'./subPageB').then(function(subPageB){
                console.log(subPageB);
            })
        }
    ```
1. Scope Hoisting
    打包慢的原因：webpack在打包时会把每个模块用单独的闭包封装起来，这些闭包会减速代码的执行过程
    解决方案：打通了所有模块的作用域，将文件打包到一个闭包函数中，提高了代码的执行速度
    ```js
        //作用域提升，把一样的代码合并一起，减小转换后的es5代码
        new webpack.optimize.ModuleConcatenationPlugin(),
    ```
1. Tree Shaking
1. Code Spliting
    webpack2，Async的新方法import()，用于动态引入ES Module，webpack将传入import方法的模块打包到一个单独的代码块（chunk），但是却不能像require.ensure一样，为生成的chunk指定chunkName
    因为webpack3引入Magic Comments解决这个问题
1. webpack-dev-server
热启，修改代码-实时刷新，开发环境用
	```js
	"scripts": {
		"serve": "webpack-dev-server --mode development"
	}
	```
1. devServer
    指定启动端口、自己做接口-可以在mock数据的时候用
    ```js
    module.exports={
        devServer:{
            // 指定要监听的端口号
            port:3000,
            // 启用 webpack 的模块热替换特性
            // hot:true,
            // 接口-可以做mock数据
            before(app){
                app.get('/api/test',(req,res)=>{
                    res.json({'code':200,'name':'john'})
                })
            }
        },
    }
    ```
## 开发插件
1. webpack-dashboard
    开发面板更清晰
1. progress-bar-webpack-plugin
    打包进度条
1. webpack-parallel-uglify-plugin
    webpack官方推荐的**多核压缩**(webpack4.0+);
    同类型产品还有：uglifyjs-webpack-plugin
1. speed-measure-webpack-plugin
    监控面板
    这个是**webpack性能优化前一定要配置的**，只有他你才知道webpack慢在哪里
1. **webpack-deep-scope-analysis-plugin**
	让webpack tree-tracking增效的插件
	深度tree-shaking,深度分析scope
	假如：import lodash from "lodash-es";那整个包都会引入很慢了，所以引入这个包就好了，打包又小又快
	假如：使用import {isArray} from "lodash-es，webpack正常压缩，可以不用引包
1. webpack-merge
    webpack的合并，合并配置，合并对象
    ```js
        const merge=require("webpack-merge");
        ...
        module.exports=merge(_mergeConfig,WebpackConfig)
    ```
1. yargs-parser
    解析命令行参数，返回键和值的简单映射。参数，表示要解析的选项的字符串或字符串数​​组。
    ```js
            // { _: [], mode: 'development' }
        var argv = require('yargs-parser')(process.argv.slice(2))
        const _mode = argv.mode || "development";
        //引入开发 或者 生产环境的特定配置
        const _mergeConfig=require(`./config/webpack.${_mode}.js`);
    ```
1. clean-webpack-plugin
    用于在构建之前删除/清除构建文件夹
    ```js
        new CleanWebpackPlugin(['dist']),
    ```
1. html-webpack-plugin
    产出html
    ```js
    // 创建一个HTML文件，为html文件引入外部资源,将script和link打入进来。
    // 可以将script、link动态添加compile后的hash，防止引入缓存的外部文件问题
    // 可以生成创建html入口文件，比如单页面生成1个HTML入口文件，配置N个html-webpack-plugin生成N个入口文件
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    plugins:[
        // 创建一个HTML文件，将script和link打入进来
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:"src/index.html"
        }),
    ] 
    ```
1. webpack-build-notifier
    通知消息，当npm run 时，会在系统界面上提示消息
##上线插件
1. es6不需要编译
1. polyfill
    * 加参数的形式，给你返回需要的polyfill方法，如果浏览器不支持该方法则不会返回
    例如：cdn.polyfill.io/v2/polyfill.min.js?features=Map,Set
    * PS:
    这种形式要比babel-polyfill更聪明，前者尽可能减少不必要的体积，后者的体积非常大
    * 用法：
    可以用node读这个文件然后吐出来这个js文件，然后前端引入这个js文件
1. **webpack-manifest-plugin**
    前端缓存小负载 webapp
    这个包会在dist下生成一个manifest.json文件，可以知道什么时候应该去更新文件，性能优化中非常重要的插件    
    a.js -> a.xx1.js 怎么计算a.js变化然后把文件变成a.xx1.js
    a.xxx.js -> 代码 后台每次计算出当前包
1. loading
    单页中用的，webpack的loading
    ```html
    <div id="app">
        <!-- webpack的loading -->
        <%= htmlWebpackPlugin.options.loading.html %>
    </div>
    ```
    ```js
    //在webpack.config.js中，加上loading即可
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template:"src/index.html",
        loading:{
            html:"加载中..."
        }
    }),
    ```
1.  单页的性能
    多页转单页时，webapp下，保证性能用直出，减少请求数量，**把runtime打到html里**
1. 分析打包结果
    监控打包大小
    * [bundlesize](https://github.com/siddharthkp/bundlesize)
        控制包的大小-[CI(持续集成)](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)里用的
        [size-limit](https://github.com/ai/size-limit)
        防止JS库臃肿。如果您不小心添加了大量依赖项，则大小限制将引发错误
    * webpack图标
        http://webpack.github.io/analyse/#/chunks
        https://alexkuz.github.io/webpack-chart/
1. test exculde include - 提升速度
    检测尾缀 干掉 除掉谁 ，这三个loader都设置，速度提升很快
1. 压缩JS CSS
    nano
        修复css
        happypack
    ts-loader
    optimize-css-assets-webpack-plugin
1. devtool eval
1. cache-loader
###css
    styled-components
    css tree-tracking
        一般用在多页,单页不要用这个，单页走的是CSS Module
    css-loader
        处理css
    style-loader
        css查到页面
1. mini-css-extract-plugin
    CSS提取到外部，轻量级CSS提取
    PS:WP4不支持extract-text-webpack-plugin，可以考虑装next版本，也可以用这个mini插件
    ```js
        const MiniCssExtractPlugin = require("mini-css-extract-plugin");
        module: {
            rules:[
                use:[
                    // 把css打到js里
                    // 'style-loader',
                    // 把css提到外部css文件里
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    // css类名 改成modules
                    {
                        loader:'css-loader'
                        // loader:'css-loader?modules&localIndetName=[name]_[local]-[hash:base64:5]'
                    }
                ]
            ]
        }
    ```
1. purifycss-webpack
    净化CSS,删除没有用到的CSS。要安装两个包-purifycss-webpack 和 purify-css
    ```js
        const PurifyCSSPlugin = require('purifycss-webpack');
        plugins:[
            // 净化css
            new PurifyCSSPlugin({
                // Give paths to parse for rules. These should be absolute!
                paths: glob.sync(join(__dirname, './src/*.html')),
            })
        ]
    ```
### 打包优化：
1. 减少编译时间
1. 减少编译输出文件的大小
1. 提高页面的性能 
### webpack
1. webpack1-2-3
    都需要有一个webpack.config.js，而4就不需要了，而是默认指向src的index.js
1. webpack2
    加入Tree-Shaking，清理引用但没有使用的代码，最早是Roullup.js提出，这一特性的支持是因为ES6 ES Module
        可以直接分析出ES Module之间的依赖关系
    动态import
1. webpack3
    - 3和2差别不大
    - 加入scope hoisng(作用域提升)，提高打包速度，减少打包文件的体积
        - 支持打包ESModule的模块语法
        - 不支持
            - 打包CommonJS的模块语法，以及
            - 使用了ProvidePlugin[3]
            - 使用了eva()函数
            - 项目有多个entry
        - 所以使用ComomnJS之后，还会回退到原来的打包模式
    - Magic Comments(配合动态import使用)
    - CommonsChunkPlugin
        - 打包公共代码。通过将公共模块拆出来，最终合成的文件能在最开始的是加载一次，便于后续访问其余页面，直接使用浏览器缓存中的公共代码
        - 结论：抽取公共代码到vender.js并缓存，但每次打包会修改hash值，即使公共代码没有修改。通过抽离runtime,可以持久化缓存。
    - DllPlugin
        - 使用思路是将我们项目中的公共的第三方库打包到一个dll文件中
        - 会打包出一个dll文件和mainfest.json模块，mainfest.json存储了通过id值映射值找到在dll文件中对应的库 js
    - DllReferencePlugin
        - 则是将映射值打包进我们的业务 js 了。这样就可以完完全全的提前抽离了第三方依赖库。之后，只会打包编译业务部分的代码，再也不用去重复构建第三方库 jjs
        - **结论：DllPlugin + DllReferencePlugin,可以很好的完成抽离公共代码，永久缓存这部分文件**
1. webpack4
    零配置.不需要config配置文件，它默认指向src的index.js文件
    但是webpack4自己的tree-tracking是有些净化不到的地方，比如回调的地方，webpack是不会净化的，因为不是纯函数
1. webpack5
    还没上线.
    多核编译.