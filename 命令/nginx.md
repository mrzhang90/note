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

#mac
1. 超管
	sudo su
1. 启动 nginx服务
	sudo nginx
1. nginx版本
	nginx -v
1. 常用命令 重启|打开日志|强制停止|退出
	nginx -s reload|reopen|stop|quit
1. 测试配置是否有语法错误
	nginx -t
1. 启动 nginx
	sudo ngixn -c /usr/local/etc/nginx/nginx.conf
1. 测试配置是否有语法错误
	nginx -t -c /usr/local/etc/nginx/nginx.conf
1. ngixn配置
	/usr/local/etc/nginx/sites-enabled
1. log日志
	/usr/local/var/log/nginx/access.log

#mysql
启动
/usr/local/Cellar/mysql/5.7.22/support-files/mysql.server start
停止
/usr/local/Cellar/mysql/5.7.22/support-files/mysql.server stop
重启
/usr/local/Cellar/mysql/5.7.22/support-files/mysql.server restart