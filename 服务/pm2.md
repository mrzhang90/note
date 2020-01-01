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

express
gulp
