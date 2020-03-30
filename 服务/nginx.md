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