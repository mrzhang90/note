# 单页面SPA
## rendertron
1. 全局安装rendertron
    ```js
    sudo cnpm install rendertron -g
    ```
1. 运行rendertron
    ```js
    rendertron
    ```
## pm2
1. 安装pm2
    ```js
    cnpm install pm2 -g
    ```
1. 启动程序
    ```js
    pm2 start build/rendertron.js
    ```
## nginx
1. 添加nginx配置
    rendertron服务的地址为：http://本地IP:3000
    门户网站访问的地址为：http://***/realtime_test
    ```js
    location /realtime_test {
        root /Users/zhang/haoweilai/realtime/dist/;
        index  index.html index.htm;
        if ( $http_user_agent ~* "(Baiduspider|360Spider|Bingbot|Googlebot)"){
            rewrite  ^/(.*)$  http://本地IP:3000/render/http://***/realtime_test break;
        }
    }
    ```
1. 使用crul测试访问
    ```JS
    curl -I -A "Baiduspider" http://***/realtime_test
    ```
    可看到输出的信息中有：
    ```JS
    Location: http://本地IP:3000/render/http://***/realtime_test
    ```
## 其他
1. npm install --save chromium
