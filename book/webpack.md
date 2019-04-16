webpack四个关键点：入口、出口、loader、插件
1. entry 入口，指向项目的主代码文件
```js
module.exports={
  entry:'./src', //单入口
  entry:[ //多入口
    './src1',
    '/src2'
  ],
  entry:{ //对象写法的单入口
    main:src
  },
  entry:{ //对象写法的第三方库写法
    app:'./src',
    vendors:'./src/script/moment.js',
  },
  entry:{
    page1:'./src/pages1.js',
    page2:'./src/pages2.js'
  }
}
```
1. output 出口，项目主代码被webpack打包后，输出到output指定的地址
```js
module.exports={
  output:{
    filename:'[name].js',
    path:path.reslove(__dirname,'/dist')
  },
}
```
1. loader 以这个ts为例，webpack会把项目中的typescript转换成javascript
```js
module.exports={
  module:{
    rules:[
      {test:'/\.ts$/',use:'ts-loader'}
    ]
  }
}
```
1. plugin 插件，项目中可以自己写插件，解决项目中遇到的问题
```js
module.exports={
  plugins:[
    new HtmlWebpackPlugin()
  ]
}
```