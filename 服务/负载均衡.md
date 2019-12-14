weight访问权重，数值越大，平均访问次数越多
#### HTTP Upstream模块
Upstream是nginx服务器一个重要的模块，实现轮询和客户端ip之间实现后端的负载均衡
1. ip_hash指令
 保证用户访问的服务器，不会变（负载均衡时，nginx根据服务器压力分配用户访问的服务器）
1. server指令
  weight访问权重，默认1:1
1. upstream指令
  upstrean指令主要用于设置一组可以在proxy_pass和fastcgi_pass指令中使用额外代理服务器，默认负载均衡方式为轮询。

#### nginx实现负载均衡
```
worker_processes 4;  //电脑是几核，就设置多少
events{
  worker_connections 1024; //并发连接
}
#error_ log logs/error.log;        //出错的日志
#error_ log logs/error.log notice; //警告
#error_ log logs/error.log info;   //基本信息
http{
  upstream firsttest {
    ip_hash;
    server 192.168.0.21 weight=2;  //访问权重
    server 192.168.0.31;
  }
  server {
    listen 8080;
    location / {
      proxy_pass http://firsttest;
    }
  }
}
```