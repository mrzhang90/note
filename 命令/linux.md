#环境变量
	export ANDROID_HOME=~/Library/Android/sdk
		添加环境变量
		~表示用户目录，即/Users/你的用户名/，而小数点开头的文件在Finder中是隐藏的，并且这个文件有可能并不存在
	source ~/.bash_profile
		使其立即生效（否则重启后才生效）
	echo $ANDROID_HOME
		检查此变量是否已正确设置
# scp
1. 拷贝远程文件到本地
	```js
	-P指定端口
	-r拷贝文件夹
	scp -P 指定端口 -r root@远程IP:远程路径 本地路径
	```
#select
	ifconfig
		查看IP
	iptables
		ubuntu下，管理防火墙
	ip
		ip addr
			本机ip
			老版本用ifconfig看本机IP
		ip route
			网卡
	home目录
		普通账户在home下
	open /usr
		打开文件夹命令：
	pwd命令
		显示当前的工作目录
	cat 文件名
		查看文件
	cd命令：
		cd 目录名  -切换到下级指定的目录里    
		cd ..     -切换到上级目录
		cd ../../ -切换两层上级目录
		cd ~/     -切换到用户目录下
	ls命令：
		ls 显示文件
		ls -s 显示文件及基础信息
		ls -l 显示文件及详细信息
			等同于ll命令
		ls -a 显示文件及隐藏文件
		ls -ah 查看所有文件,包括隐藏文件(只看文件名)
		ls -al 查看所有文件,包括隐藏文件(文件详细信息)
	tail -f mongodb.log
		查看日志
		
#insert
	yum update
		升级所有需要升级的软件
	useradd user1
		添加名为user1的用户，那么在home下添加一个user1
	touch 1.txt     
		-创建一个文件
	mkdir 201602git 
		-创建空目录
		mkdir -p a/b
			创建a和b文件夹，-p表示递归创建目录

#update
	cp命令：
		cp aa.txt bb/bb -把aa.txt文件复制到bb/bb目录下
		cp aa.txt bb/cc -把aa.txt文件复制到bb目录下，并重命名为cc
		cp -R aa bb     -把aa文件夹复制到bb目录下
	mv命令：
		mv dir1 dir2
			将dir1移动到dir2下
		mv file1 file2 dir
			将多个文件移动到dir下
#delete
	rm命令：
		删除文件:  rm test.txt
		删除文件夹: rm -r aa
#软连接
	ln -s 源文件 目标文件
		ln -s /bin/less /usr/local/bin/less
		
#远程连接
	ssh root@43.xxx.xxx.xxx
		root是用户名，@后面是IP地址

#进程命令
	1号进程是其他所有进程的祖先
	进程命令：
		lsof -i:80 -查看80端口是否占用
		kill 488   -杀掉PID为488的进程
		kill -9 489 -强制杀掉PID为488的进程
		pkill 程序名 -根据程序名杀掉进程
	查看进程
		ubuntu只能查看自己账户的进程
			那么 sudo ps aux，暂时提升为超级管理员，就可以查看其他管理员的进程了
	centos
		firewall
			firewalld
				守护进程
			firewall-cmd
				管理防火墙
				
#退出输入状态：
	command+d 或 command+c+c

#vi命令
	vi xxx.txt
		使用vi命令进入文件，然后输入每个字母都代表输入一个命令
		i
			insert编辑模式
		esc
			编辑模式退回到命令模式
		ZZ
			命令模式下保存当前文件所做的修改后退出vi
		:eq
			退出并保存
	参考：
		http://man.linuxde.net/vi