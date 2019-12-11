#### MAC下启动和停止jenkins的方式
1. 启动
sudo launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist
1. 停止
sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist

#### jenkins的配置
1.装插件 nodejs pubish over ssh gitplugin
2.系统的path + nodejs环境
3.增加构建后的项目
4.构建后写shell

#### 安装java
jre
jdk
tomcat

第一次访问jenkins,会给一个密码，从提示的路径找到密码，然后输入
进入左右没区别，都可以选择
然后所有插件都装上
然后输入信息，点击左边的continue,如果你点右边save会退出的

1. 系统管理
	* configure
		* global security
		* configur credentials
	* 插件管理
		* 过滤中-搜索nodejs
			* NodeJS Plugin-勾选安装
1. 系统属性
1. 负载统计
1. jenkins Cli
	* 到终端下运行命令
1. 脚本命令行
	* 相当于终端下运行命令

1. 新建一个任务
	* item name
		* 任务名称
	