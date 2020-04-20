# MAC下docotr
### 查看本地镜像
1. 查看镜像
docker images node
docker images -a
1. 删除本地一个或多个镜像
docker rmi -f c31fbeb964cc
### 容器
1. 容器IP
docker inspect --format '{{ .NetworkSettings.IPAddress }}' c882805648e4
1. 列出容器
doctor ps -a
1. 启动/停止容器
docker start/stop 362d7b21f4ee
1. 删除停止的容器
docker rm -f 7bf77cb92445
1. 创建并启动容器 ubuntu 15.10
docker run -t -i ubuntu:15.10 /bin/bash
    ```
    -t: 在新容器内指定一个伪终端或终端。
    -i: 允许你对容器内的标准输入 (STDIN) 进行交互。
    ```
1. 在运行的容器中执行命令
docker exec -t -i c882805648e4 /bin/bash
1. 容器拷贝
docker cp /www/runoob 96f7f14e99ab:/www/
### node
1. 安装最新node
docker pull node:latest
1. 安装指定node版本
docker pull node:11.4.0
1. 运行node
docker run -itd --name node-test node
1. 安装指定node版本
docker run -t -i node:7.10.1 /bin/bash
docker exec -t -i node:7.10.1 /bin/bash
### 退出容器
exit 或者 CTRL+D


### 配置node
1. 创建项目、进入项目
mkdir docker_demo && cd docker_demo
1. 创建node启动文件
    * npm init
    * vim app.js
      ```js
      const Koa = require('koa');
      const app = new Koa();
      app.use(async ctx => {
          ctx.body = 'hello docker';
      });
      app.listen(3000);
      ```
    * npm i koa --save
    * vim package.json
      ```js
      "scripts": {
        "start":"node app.js",
      }
      ```
1. 创建Dockerfile文件
vim Dockerfile
    ```js
    FROM node:7.10.1
    # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
    RUN mkdir -p /usr/src/app
    ADD . /usr/src/app
    # cd到app文件夹下
    WORKDIR /usr/src/app
    # 对外暴露的端口号
    EXPOSE 3000
    RUN npm install
    # 容器启动时执行的命令，类似npm run start
    CMD ["npm","start"]
    ```
1. 创建build忽略文件
vim .dockerignore
    ```js
    logs
    node_modules
    ```
1. **构建项目镜像**
docker build -t docker_demo .
    * PS:最后一个参数点，代表的是当前路径
1. images命令查看镜像
docker images
    * 找到docker_demo项表示成功
1. **运行node项目镜像**
docker run -d -p 9000:3000 docker_demo
1. 查看运行中的docker容器
docker ps
    * 查看运行中的docker容器
    * 看到docker_demo项即可，如果看不到运行docker ps -a
1. 查看运行中的容器
    docker logs -f 容器ID
#redis
1. 下载redis
docker pull redis:latest
1. 启动redis
docker run -itd --name redis-test -p 6379:6379 redis
1. 查看redis的IP
docker inspect --format '{{ .NetworkSettings.IPAddress }}' 0f768fe4b34f