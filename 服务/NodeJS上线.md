#### 部署NodeJS上线步骤
在**生产环境**的服务进程和日志管理领域，**pm2** 是当之无愧的首选，功能很强大，使用简单，**开发环境常用的是 nodemon。**
1. https://brew.sh/index_zh-cn.html
1. brew search nginx
1. brew install nginx
1. brew info nginx
1. nginx -v
1. 启动sudo brew services start nginx（默认端口8080）
  备注：如果安装jenkins这里会失败
  sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist
  systemctl start jenkins
1. 关闭
  sudo brew services stop nginx/nginx
1. nginx重启、停止
  nginx -s reload
  nginx -s stop
1. 打开nginx具体安装目录
  查看配置文件/usr/local/nginx
  cat star_nginx.conf //查看nginx配置
1. 验证配置文件
  nginx -t 查看配置
  nginx -t -c 自己的配置文件地址
1. 拷贝配置文件至Node项目目录 重新修改
1. 服务器端的nginx地址
  /usr/local/nginx/sbin
1. 三条盖世绝学
    ```code
    ps aux | grep node
    lsof -i tcp:8081
    kill -9 pid
    ssh 用户名@地址(免密登录)
    scp course-map.json root@IP地址:/路径
    scp -r advance/ root@101.200.185.250:/opt/node-publish/www/static/
    ```
1. npm install --production
  上线环境
1. pm2 动态监测文件
  1. 能够动态监控文件的上传 0秒热启动
  1. **也能够负载均衡CPU**
  1. 内存的使用 过多了 CPU调度太频繁 重启
  1. PM2性能优化
    keymetrics平台监控 https://app.keymetrics.io/#/ 注册登陆上去就能连上自己的pm2 就能界面化 监控,查看cpu情况
      ```js
      //pm2.json
      {
        "name": "app",
        "script"    : "./app.js",
        "instances" : "max",    //让node占满cpu
        //cluster可以启4个独立的进程，
        //fork只启动一个进程往剩下的CPU里复制
        "exec_mode" : "cluster" //exec_mode以主线程方式启动，
      }
      ```
  1. 命令 
    sudo pm2 start pm2.json
    sudo pm2 restart pm2.json
    sudo pm2 list 查看pm2
    sudo pm2 stop all
    sudo pm2 reload all
    sudo pm2 monit  监控
    sudo pm2 logs
    sudo pm2 plus     监视和诊断Web界面
    sudo pm2 link xxx web监控平台
#### cluster和fork的区别