### Rollup 与 Webpack
webpack主要用于应用打包，rollup专注于Javascript类库打包，我们熟知的Vue、React就是通过rollup打包的
webpack对于代码分割和静态资源导入有先天优势，支持热模块替换(HMR)，而rollup不支持，**所以开发应用时应优先选择webpack**
webpack与rollup都支持Tree-shaking和es6 module打包，不过rollup有简单的API，被许多知名库用来作为构建工具

### Rollup
1. 安装
    ```
    npm i rollup -g
    ```
1. 打包
    ```js
    rollup src/index.js -f umd -o dist/bundle.js
    ```
    参数说明 - [完整rollup命令](https://rollupjs.org/guide/en/#command-line-flags)
    ```js
    -f。-f参数是--format的缩写，它表示生成代码的格式，amd表示采用AMD标准，cjs为CommonJS标准，esm（或 es）为ES模块标准。-f的值可以为amd、cjs、system、esm（'es’也可以）、iife或umd中的任何一个。
    -o。-o指定了输出的路径，这里我们将打包后的文件输出到dist目录下的bundle.js
    -c。指定rollup的配置文件。
    -w。监听源文件是否有改动，如果有改动，重新打包。
    ```
1. 使用配置文件
    在项目中创建一个名为rollup.config.js文件，增加代码：
    ```js
    export default {
        input: ["./src/index.js"],
        output: {
            file: "./dist/bundle.js",
            format: "umd",
            name: "experience",
        },
    };
    ```
    执行
    ```js
    rollup -c
    ```
### 插件
1. resolve插件
    * 为什么要使用resolve？
        因为项目开发中，大多会通过npm下载远程的库，而不是本地库
    * 插件使用
        ```js
        //安装resolve
        npm i -D @rollup/plugin-node-resolve
        //修改配置文件rollup.config.js
        import resolve from "@rollup/plugin-node-resolve";
        export default {
            input: ["./src/index.js"],
            output: {
                file: "./dist/bundle.js",
                format: "umd",
                name: "experience",
            },
            plugins: [resolve()],
        };
        //package.json
        scripts:{
            "build": "rollup -c -w"
        }
        //执行代码
        npm run build
        ```
1. external属性
    有些场景下，虽然我们使用了resolve插件，但可能我们仍然想要某些库保持外部引用状态，这时我们就需要使用external属性，来告诉rollup.js哪些是外部的类库
    ```js
    import resolve from "@rollup/plugin-node-resolve";
    export default {
        input: ["./src/index.js"],
        output: {
            file: "./dist/bundle.js",
            format: "umd",
            name: "experience",
        },
        plugins: [resolve()],
        external: ["the-answer"],
    };
    ```
1. commjs插件
    * 为什么需要commonjs插件
        * rollup编译源码默认只支持ES6+的模块方式import/export。然后大量的npm模块基于CommonJS模块方式，这就导致这些npm模块不能直接编译使用。
        * 所以使得rollup.js编译支持npm模块和Commonjs模块方式的插件应运而生：@rollup/plugin-commonjs
    * common插件使用
        ```js
        //安装
        npm i -D @rollup/plugin-commonjs
        //然后修改rollup.config.js文件：
        import resolve from "@rollup/plugin-node-resolve";
        import commonjs from "@rollup/plugin-commonjs";
        export default {
        input: ["./src/index.js"],
        output: {
            file: "./dist/bundle.js",
            format: "umd",
            name: "experience",
        },
        plugins: [resolve(), commonjs()],
        external: ["the-answer"],
        };
        ```
1. bebel插件
    * 为什么需要babel插件
        当编译代码时，ES6+代码需要转换成ES5，因此需要在rollup打包的过程中使用babel完成转换
    * babel插件的使用
        ```js
        //安装
        npm i -D @rollup/plugin-babel
        //安装@babel/core @babel/core是babel的核心
        npm i @babel/core
        // 创建.babelrc文件
        {
            "presets": [
                [
                "@babel/preset-env",
                {
                    "modules": false,
                    // "useBuiltIns": "usage"
                }
                ]
            ]
        }
        // 在.babelrc配置了preset env所以需要安装这个插件
        npm i @babel/preset-env
        //同样修改配置文件rollup.config.js：
        import resolve from "@rollup/plugin-node-resolve";
        import commonjs from "@rollup/plugin-commonjs";
        import babel from "@rollup/plugin-babel";

        export default {
        input: ["./src/es6.js"],
        output: {
            file: "./dist/esBundle.js",
            format: "umd",
            name: "experience",
        },
        plugins: [resolve(), commonjs(), babel()],
        external: ["the-answer"],
        };
        ```
1. json插件
    为什么使用json插件？
    ```js
    // 此时需要引入json插件
    import json from "../package.json";
    console.log(json.author);
    //安装
    npm i -D @rollup/plugin-json
    ```
1. tree-shaking机制
    rollup已经引入了tree-shaking
