// Karma configuration
// Generated on Fri Aug 18 2017 21:48:13 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    //相对目录 这里填了files和exclude里的文件夹都相对于我们的basePath
    basePath: '',


    // frameworks to use 需要用到的断言库 jasmine（mocha chai）
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    //测试具体的文件是哪些
    files: ['./aa.js','./System.js'],


    //哪些文件不能被测试
    exclude: ['karma.conf.js'],


    // 插件preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // 报告 进度条test results reporter to use
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


    // 选择测试的浏览器 有IE chrome
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
