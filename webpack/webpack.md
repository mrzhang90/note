模块(import和require)打包器
###单页应用
    每个页面都是一个components
###css
    styled-components
    css tree-tracking
        一般用在多页,单页不要用这个，单页走的是CSS Module
    css-loader
        处理css
    style-loader
        css查到页面
### webpack
1. webpack1-2-3
    都需要有一个webpack.config.js，而4就不需要了，而是默认指向src的index.js
1. webpack2
    加入Tree-Shaking，清理引用但没有使用的代码，最早是Roullup.js提出，这一特性的支持是因为ES6 modules的静态特性
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
    - CommonsChunkPlugin
        - 通过将公共模块拆出来，最终合成的文件能在最开始的是加载一次，便于后续访问其余页面，直接使用浏览器缓存中的公共代码
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
### 打包优化：
1. 减少编译时间
1. 减少编译输出文件的大小
1. 提高页面的性能