1. vendor.js: 默认将node_modules里require的依赖都打包在这里
1. manifest.js: 在vendor.js的基础上，主要将一些异步加载等打包在这里
1. app.js: 默认将所有你自己写的js打包在这里

### 拆解业务代码，将vue-router 改为异步路由
```js
// router/index.js
//同步路由
import OverseasList from '@/components/overseasList'
//异步路由
const OverseasList = () => import('@/components/overseasList')

//导入路由
{
  // Subscribeto
  path: '/subscribeto',
  name: 'Subscribeto',
  component: Subscribeto
}
```
### CommonsChunkPlugin拆包
**将大的vendor，拆解为小的模块，避免单一vendor过大,从而多个脚本同步加载**
思路：因为verdor单包1.4M，将echarts拆出后，verdor-793K,vendor-717K
```js
// webpack.prod.js
function getModuleName(module) {
  var sign = 'node_modules';
  var signIndex = module.resource.indexOf(sign);
  var pathSeparator = module.resource.slice(signIndex - 1, signIndex);
  var modulePath = module.resource.substring(signIndex + sign.length + 1);
  var moduleName = modulePath.substring(0, modulePath.indexOf(pathSeparator) );
  moduleName = moduleName.toLowerCase();
  return moduleName
}
// 需要chunks的包列表，支持正则
let chunksPackage = {
  'echarts':['echarts'],
}

new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  ...
}),
...Object.keys(chunksPackage).map(packageName => {
  return new webpack.optimize.CommonsChunkPlugin({
    name: packageName,
    filename: utils.assetsPath('js/[name].js'),
    chunks: ['vendor'],
    minChunks: function (module, count) {
      return module.resource && chunksPackage[packageName].filter(item => new RegExp(item).test(getModuleName(module)))[0] && count >= 1
    }
  })
}),
new webpack.optimize.CommonsChunkPlugin({
  name: 'manifest',
  ...
}),
```
## webpack配置CDN
1. 确定CDN资源URI
  第三方免费CDN：bootcdn https://www.bootcdn.cn
  按照规律，得出cdn资源路径规则为
    ```
    https://cdn.bootcss.com + 模块名 + 版本号 + 具体路径
    ```
1. 打包前的处理
    1. 添加cdn根地址
        ```js
        // build/utils.js 国内免费cdn镜像源
        exports.cdnBaseHttp = 'https://cdn.bootcss.com';
        ```
    1. 添加cdn模块
        ```js
        //  build/utils.js external配置
        exports.externalConfig = [
          // { name: 'swiper', scope: 'Swiper', js: 'js/swiper.min.js',css:'css/swiper.min.css' },
          // { name: 'echarts', scope: 'echarts', js: 'echarts.min.js' },
          { name: 'lodash', scope: 'lodash', js: 'lodash.min.js' },
          { name: 'vue', scope: 'Vue', js: 'vue.min.js' },
          // { name: 'vuex', scope: 'Vuex', js: 'vuex.min.js' },
          // { name: 'vue-router', scope: 'VueRouter', js: 'vue-router.min.js' },
          // { name: 'axios', scope: 'axios', js: 'axios.min.js' },
        ];
        ```
    1. 添加获取版本号方法
        ```js
        // build/utils.js 获取模块版本号
        exports.getModulesVersion = () => {
          let mvs = {};
          let regexp = /^npm_package_.{0,3}dependencies_/gi;
          for (let m in process.env) { // 从node内置参数中读取，也可直接import 项目文件进来
            if (regexp.test(m)) { // 匹配模块
              // 获取到模块版本号
              mvs[m.replace(regexp, '').replace(/_/g, '-')] = process.env[m].replace(/(~|\^)/g, '');
            }
          }
          return mvs;
        };
        ```
    1. 导出不需要被打包的cdn模块配置
        ```js
        // build/utils.js
        exports.getExternalModules = config => {
          let externals = {}; // 结果
          let dependencieModules = this.getModulesVersion(); // 获取全部的模块和版本号
          config = config || this.externalConfig; // 默认使用utils下的配置
          config.forEach(item => { // 遍历配置
              if (item.name in dependencieModules) {
              let version = dependencieModules[item.name];
              // 拼接css 和 js 完整链接
              if(item.name=='lodash'){ //https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js
                item.name='lodash.js'
              }
              item.css = item.css && [this.cdnBaseHttp, item.name, version, item.css].join('/');
              item.js = item.js && [this.cdnBaseHttp, item.name, version, item.js].join('/');
              externals[item.name] = item.scope; // 为打包时准备
            } else {
              throw new Error('相关依赖未安装，请先执行npm install ' + item.name);
            }
          });
          return externals;
        };

        ```
1. webpack.dev.conf.js添加cdn配置
    1. 获取cdn配置
        ```js
        // build/webpack.dev.conf.js 大概在15行
        const externalConfig = JSON.parse(JSON.stringify(utils.externalConfig));  // 读取配置
        utils.getExternalModules(externalConfig); // 获取到合适的路径（引用类型，自动改变）

        // const devWebpackConfig = merge ....... 
        ```
    1. HtmlWebpackPlugin插件中导出cdn
        cdnConfig和onlyCss自定义属性，在**html上通过htmlWebpackPlugin.options**
        ```js
        //我们可以往里面添加点自定义属性，方便在index.html中调用
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: 'index.html',
          inject: true,
          cdnConfig: externalConfig, // cdn配置
          onlyCss: true, //dev下只加载css
        }),
        ```
1. webpack.prod.conf.js添加cdn配置和忽略模块
    1. 获取cdn配置
        ```js
        // build/webpack.prod.conf.js 大概在15行
        const externalConfig = JSON.parse(JSON.stringify(utils.externalConfig)); // 读取配置
        const externalModules = utils.getExternalModules(externalConfig); // 获取到合适路径和忽略模块
        // const webpackConfig = merge(baseWebpackConfig.... 
        ````
    1. webpck配置加多个属性externals
        externals代表构建时不需要被处理的模块，也就是前面说的scope需要注意的地方
        ```js
        // build/webpack.prod.conf.js
        const webpackConfig = merge(baseWebpackConfig, {
          externals: externalModules, // 构建时忽略的资源
          // 其他属性
        }
        ```
    1. HtmlWebpackPlugin插件中导出cdn
        ```js
        new HtmlWebpackPlugin({
          // 其他默认配置
          cdnConfig: externalConfig, // cdn配置
          onlyCss: false, //加载css
        }),
        ```
1. index.html插入相关链接
webpack配置已经完成，在html-webpack-plugin中已经添加了相关参数
通过<% %> 和 htmlWebpackPlugin.options 用js遍历插入link标签和script标签。
    ```html
    <!DOCTYPE html>
    <html>
      <head>
      <!-- 其他标签 -->
        <% htmlWebpackPlugin.options.cdnConfig.forEach(function(item){ if(item.css){ %>
        <link href="<%= item.css %>" rel="stylesheet" />
        <% }}) %>
      </head>
      <body>
      <!-- 其他标签 -->
        <% htmlWebpackPlugin.options.cdnConfig.forEach(function(item){ if(item.js && !htmlWebpackPlugin.options.onlyCss){ %>
        <script type="text/javascript" src="<%= item.js %>"></script>
        <% }}) %>
        <!-- built files will be auto injected -->
      </body>
    </html>
    ```
