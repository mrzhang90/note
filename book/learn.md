##学习
##基于Redux/Vuex/MobX等库的通用化状态OOP
##前端构建
组件库自身就是一个大工程，需求按照模块化开发思想进行模块划分。通常，在一个组件库里，组件、组件的样式文件、配值文件…都是模块，而最终我们需要把这些模块组合成一个完整的组件库文件，承担这种组件工作的就是打包构建工具。当下主流的库构建工具主要有Rollup和Webpack等。
##JavaScript模块化解决方案
在ES6之前，业界流行的社区定制的一些模块加载方案，如CommonJS和AMD
ES6 Module作为官方规范，且浏览器和服务端通用，未来一定会一统天下，但是由于ES6 Module来的太晚，受限于兼容性等因素，可以预见的是今后一段时期内，多种模块化方案仍会共存。
1. ES6 Module规范：JavaScript语言标准化解决方案，浏览器和服务端通用，模块功能主要有export和import两个命令
1. CommonJS规范：主要用于服务端的JavaScript解决方案，Node.js采用的就是这种解决方案，通过request.js命令加载其他模块，通过module.exports或者exports对外暴露接口
1. AMD规范：异步模块定义规范，一种更主要用于浏览器端的JavaScript模块化方案，该方案的代表实现者是RequireJS,通过define方法定义模块，通过require方法加载模块
1. CMD规范：比较古老，它是SeaJS推广过程中的模块定义规范，只是SeaJS在2015年停止维护了，so算不上当前主流方案了
##Rollup
Rollup 可以直接对 ES6 模块进行打包，它率先提出并实现了 Tree-shaking 功能，即在打包时静态分析 ES6 模块代码中的 import，排除未实际使用的代码，这有助于减小构建包的体积。
##Webpack
Webpack**既能打包应用、又能打包库**。
1. Webpack 支持代码分割、模块的热更新（HMR）等功能，这让它看起来非常适合打包应用。
1. 而 Webpack 2 及后续版本陆续增加了对 ES6 模块、Tree-shaking、Scope Hoisting 的支持，大大增强了其库打包能力。

**打包应用推荐使用 Webpack ，而打包库的话， Rollup 和 Webpack 基本都能胜任。**
###Webpack打包Library(组件库)
如何用webpack打包组件库？

首先，虽然基于ES6模块规范开发，但考虑到浏览器兼容性，我们需要打包出来的组件库，既能兼容AMD等浏览器模块规范。同时，为了使组件能支持服务端渲染(SSR)等场景，它还需要支持CommonJS规范。此外，还有一种常见的库使用场景，即在页面上直接通过script标签引入，也就是非模块化环境也要考虑兼容。

Webpack 中，output.libraryTarget 选项用来配置如何暴露库，可配置以 commonJS 模块、AMD 模块，甚至全局变量形式暴露库。可是如何让这个库可以同时兼容 commonJS、AMD 和全局变量呢？

所幸，这个选项还支持一个可选值—— umd。UMD（Universal Module Definition，通用模块规范）可以同时支持 CommonJS 和 AMD 规范，以及非模块化引用。

综上，我们需要把 output.libraryTarget 的值设为“umd”。

**另外两个与库打包关系密切的Webpack配置项如下：**

1. output.library ，对外暴露的变量名或模块名，具体作用与 output.libraryTarget 选项的值有关。
1. output.umdNamedDefine ，当 output.libraryTarget 的值为“umd”时，设置该选项的值为 true 会对 UMD 的构建过程中的 AMD 模块进行命名，否则就使用匿名的 define，匿名的 AMD 模块。

**这几个选项配置完，就可以打包出一个基于 umd 规范库了。**
```js
    output: {
      path: path.resolve(__dirname, '../dist/'),
      filename: 'nutui.js',
      library: 'nutui',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
```
但是我们会发现构建出来的库在 Node.js 环境使用时会报错：
```js
window is not defined
```
是不是感到莫名其妙？说好的 UMD 兼容 commonJS 呢？查看 Webpack 构建出的包代码，我们会发现，UMD 部分的代码里的全局对象竟然是 window ！非浏览器环境哪有 window 对象，Node.js 中不报错才怪。
```js
(function webpackUniversalModuleDefinition(root, factory) {
 if(typeof exports === 'object' && typeof module === 'object')
 module.exports = factory(require("vue"));
 else if(typeof define === 'function' && define.amd)
 define("nutui", ["vue"], factory);
 else if(typeof exports === 'object')
 exports["nutui"] = factory(require("vue"));
 else
    root["nutui"] = factory(root["Vue"]);})(window, function(__WEBPACK_EXTERNAL_MODULE__2__) {
```
查阅 Webpack 文档，可以发现 output 对象还有一个属性叫 globalObject ，用来指定挂载这个库的全局对象，默认值是 window 。而这部分文档明确指出，当构建 UMD 包需要兼容浏览器和 Node.js 环境时，值应该设为 this 。
```js
output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: 'nutui.js',
        library: 'nutui',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        globalObject: 'this'}
```
我们将 globalObject 设置为 ‘this’ 后，构建出来的包中 UMD 部分的 window 被替换为了 this ，这样在 Node.js 环境就不会再报上面那个错了，这对实现组件库兼容服务端渲染功能来说非常重要。
```js
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require("vue"));
    else if(typeof define === 'function' && define.amd)
        define("nutui", ["vue"], factory);
    else if(typeof exports === 'object')
        exports["nutui"] = factory(require("vue"));
    else
        root["nutui"] = factory(root["Vue"]);})(this, function(__WEBPACK_EXTERNAL_MODULE__2__) {
```
这里吐个槽，个人感觉 Webpack 这部分设计欠妥，当 libraryTarget 值为 umd 时 globalObject 默认值应该为 this ，而不能是 window ，否则 umd 还有何意义？至少在文档中 libraryTarget: ‘umd’ 部分对此问题应该有所提及，不然还会有不少人踩此坑。
###外部依赖Vue.js
Vue 组件库不需要把 Vue.js 也打包进去，可在运行时从外部获取。Webpack 中可以通过 externals 配置外部依赖。我们不妨以 jquery 为例看下 externals 的配置方法：
```js
externals: {
    jquery: 'jQuery'}
```
这样 jquery 在构建时不会打到包内，而是在运行时需要 jquery 的时候去外部环境寻找 jQuery 这个模块（或属性）。照猫画虎，依葫芦画瓢，我们不需要打包 Vue.js ，那我们就这么写：
```js
externals: {
    vue: 'vue'}
```
这时候构建出来的包在各种模块化场景使用都没毛病，可唯独在非模块化场景会报错：
```js
vue is not defined
```
这是为什么呢？我们先来看下 Vue.js 的部分源码：
```js
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.Vue = factory());
```
从上面的 Vue.js 源码中，我们可以看到挂到全局对象上的 vue 属性名称是首字母大写的 Vue，而其 NPM 包名却是小写的 vue ，也就是说不同环境下 Vue 名称不尽一致，这可如何是好？
```js
{
  "name": "vue",
  "version": "2.6.10",
```
还好，externals 中属性的值除了字符串，还支持传一个对象，可针对各种场景单独设置模块名（或属性名），这样一来，我们就可以为非模块化环境配置 ‘Vue’，为模块化环境配置 ‘vue’。
```js
externals: {
        'vue': {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }}
```
Vue.js 就是这样被设置为组件库外部依赖的。
###Tree-shaking（摇树）
如前文所述，Tree-shaking 功能最早由 Rollup 提出并实现，曾是 Rollup 的杀手锏，后来 Webpack 等工具把它“借鉴”走了。

Tree-shaking 的原理是在打包时通过对代码进行静态分析将未使用的代码排除，从而减小包体积。对 JavaScript 进行静态分析，这在之前是不可能的。直到 ES6 模块化方案的提出，才使得 JavaScript 静态分析成为可能，因为 ES6 模块是编译时加载，不用等到代码运行时就可以知道加载了哪些模块。因此要使用 Tree-shaking 功能，就需要在代码中使用 ES6 模块方案，不管是用 Rollup 还是 Webpack 打包。

还有一个影响 Tree-shaking 施展的可能，那就是 Babel 在 Webpack 开始“摇”之前把你的 ES6 模块转成了 commonJS 模块，那就“摇”不了了。这种情况并不罕见，大部分前端开发者都乐于使用新语法，所以不止模块化方案要用 ES6 Module ，甚至整个项目的 JavaScript 代码都用 ES6+ 语法来写，为了兼容低版本环境，通常会使用 Babel 等工具把 ES6+ 语法转成 低版本语法。这当然没问题，只是如果想让 Tree-shaking 发挥作用，让我们构建出来的包体积更小，一定要注意，不要让 Babel 把ES6模块语法转成 commonJS ，Rollup 和较新版本的 Webpack 都支持直接处理 ES6 模块，可以也应该把 ES6 模块部分直接交给它们来处理。不使用 Babel 处理ES6模块，并不意味着最终打出来的包就是 ES6 模块，如前文所述，构建出来的包如何暴露，要兼容哪些模块规范打包工具就能搞定。
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]}
```
我们测试了一下，Tree-shaking 让 NutUI 2.0 的完整版的构建文件体积明显减小。

好了，关于构建工具我们先说到这里，具体实现细节可以参考 NutUI 2.0 的源码[2]。后续的文章我们还会谈组件库的按需加载、主题定制、国际化、单元测试、持续集成、基于Markdown文件生成静态文档网站、Vue公共组件开发等方面的探索实践经验，敬请关注。

链接
[来源地址](https://mp.weixin.qq.com/s/6lCZUw9DcDtOaTN4mHxc2g)