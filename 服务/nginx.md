#本机下配置hosts
1. vim /etc/hosts
	编辑hosts
2. ip **.**.com
	添加一条hosts地址

#window下安装
1. 进入[nginx官网](https://nginx.org/en/download.html)
1. 命令启动nginx
	```
		cd nginx-1.14.2
		start nginx
	```
1. 访问http://localhost
	PS:如果失败，输入netstat -ano命令，查看80端口是否占用
1. 命令
	启动：start nginx
	停止：nginx.exe -s quit
	重新载入：nginx.exe -s reload
	重新打开日志：nginx.exe -s reopen
1. 查看配置
	cd ~
	cat start_nginx.sh 可以看到nginx指向的配置
#mac
1. 超管
	sudo su
1. 安装、启动、停止、重启
	brew install nginx
	brew services start nginx
	brew services stop nginx
	brew services restart nginx
	brew uninstall nginx
1. 重新加载配置（不会stop，只是重新加载配置）
	sudo nginx -s reload
1. nginx配置
	vim /usr/local/etc/nginx/nginx.conf
1. 测试配置是否有语法错误
	nginx -t -c /usr/local/etc/nginx/nginx.conf
1. 查看nginx的进程  进程ID号比较小的是主进程
	ps aux | grep nginx
1. 热启动，服务器不中断
	nginx -r
1. 启动 nginx服务
	sudo nginx
1. nginx版本
	nginx -v
1. 常用命令 重启|打开日志|强制停止|退出
	nginx -s reload|reopen|stop|quit
1. 测试配置是否有语法错误
	nginx -t
1. 启动 nginx
	sudo nginx -c /usr/local/etc/nginx/nginx.conf
1. nginx配置
	/usr/local/etc/nginx/sites-enabled
1. log日志
	/usr/local/var/log/nginx/access.log

### Nginx配置
1. vue-router的mode为history
1. **二级目录设为站点**
	```
	http {
		server {
			listen       9000;
			server_name  localhost;
			location /realtime_test {
				alias /Users/zhang/haoweilai/realtime/dist/;
				try_files $uri $uri/ /realtime_test/index.html;//二级目录设为站点
			}
		}
		include servers/*;
	}
	```
### NGINX 配置本地HTTPS(免费证书)
1. 命令创建证书文件
	```js
	//生成秘钥key,运行:
	$ openssl genrsa -des3 -out server.key 2048
	//会有两次要求输入密码,输入同一个即可
	//然后你就获得了一个server.key文件

	//以后使用此文件(通过openssl提供的命令或API)可能经常回要求输入密码,如果想去除输入密码的步骤可以使用以下命令:
	$ openssl rsa -in server.key -out server.key

	//创建服务器证书的申请文件server.csr,运行:
	openssl req -new -key server.key -out server.csr
	//其中Country Name填CN,Common Name填主机名也可以不填,如果不填浏览器会认为不安全.(例如你以后的url为https://abcd/xxxx….这里就可以填abcd),其他的都可以不填.

	//创建CA证书:
	openssl req -new -x509 -key server.key -out ca.crt -days 3650
	//此时,你可以得到一个ca.crt的证书,这个证书用来给自己的证书签名.

	//创建自当前日期起有效期为期十年的服务器证书server.crt：
	openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
	
	//ls你的文件夹,可以看到一共生成了5个文件:
	ca.crt   ca.srl    server.crt   server.csr   server.key
	//其中,server.crt和server.key就是你的nginx需要的证书文件
	```
1. 配置nginx
	```
	server {
		listen 8443 ssl;
		server_name local.liuxue.com;
		ssl_certificate /usr/local/etc/nginx/conf/server.crt;
		ssl_certificate_key /usr/local/etc/nginx/conf/server.key;
		location / {
			root   /vue-crp/dist/;
			index  index.html index.htm;
		}
	}
	```
1. nginx -t 检测是否有配置问题
	nginx -s reload 重启服务
### 问题解决
1. **nginx: [error] invalid PID number**
	在Mac上用brew安装Nginx，然后修改Nginx配置文件，再重启时报出如下错误：
	```
	nginx: [error] invalid PID number "" in "/usr/local/var/run/nginx/nginx.pid"
	```

	解决办法1：
	```js
	rm -rf /usr/local/var/run/nginx/nginx.pid //删掉错误文件
	nginx -s reload
	//如果reload失败，则杀掉nginx进程，然后再重启nginx
	ps aux | grep nginx
	kill -9 进程ID
	nginx -s reload
	```
	解决办法2：
	```js
	sudo nginx -c /usr/local/etc/nginx/nginx.conf
	sudo nginx -s reload
	```