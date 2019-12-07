// Karma configuration
// Generated on Fri Aug 18 2017 21:48:13 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({
    //默认情况下（没设置basePath），里面所有的路径，其实都是相对于 karma.config.js 的所在目录，也就是karma目录
    //如果设置了 basePath，那 basePath 就是相对于 karma.config.js 的所在目录（karma目录），而 files 和 exclude 里的路径则相对于 basePath
    //basePath 相对目录，这里如果填了，files和exclude里的文件路径都会相对于它
    basePath: '',


    // frameworks 需要用到的断言库 这里我们只用jasmine（mocha chai）
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    //因为我要测试baseCls.min.js，所以我的files列表里，包含了它以及所有相关的测试脚本
    //files 测试时，浏览器需要加载的文件aa
    files: ['*.js'],


    //exclude 测试时，浏览器会忽略掉这个list里面的文件，不加载它们
    exclude: ['karma.conf.js'],

    // 配置测试报表 覆盖率
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // 生成报表
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // 是否要检测文件的变化 enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    //无头浏览器 方便与未来的自动化测试
    //browsers 测试浏览器，有IE，Chrome，ChromeCanary，FireFox，Opera，Safari，PhantomJS
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    //要独立的运行在PhantomJS
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
