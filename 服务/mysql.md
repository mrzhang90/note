1. 启动
  /usr/local/Cellar/mysql/5.7.22/support-files/mysql.server start
1. 停止
  /usr/local/Cellar/mysql/5.7.22/support-files/mysql.server stop
1. 重启
  /usr/local/Cellar/mysql/5.7.22/support-files/mysql.server restart
1. 登录mysql 
  	mysql -u root -p  //u是user登录然后用root用户登录,p是密码
1. 查证正在运行的mysql进程
		ps -ef | grep mysql
1. 设置默认数据库
	use ceshi； //把ceshi数据库设为默认数据库
1. 查看mysql的进程
  ps -ef |grep mysql
1. 查看mongodb的进程
  ps -ef |grep mongodb
1. 开机启动mysql
		mkdir -p ~/Library/LaunchAgents/
		cp /usr/local/Cellar/mysql/5.7.12/homebrew.mxcl.mysql.plist ~/Library/LaunchAgents/launchctl load -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
1. 设置修改root密码（设置过了可以不用设置，略过）、删除匿名访问、删除root网络访问、删除test数据库。指令执行完后，登陆mysql就需要密码验证了
		/usr/local//bin/mysql_secure_installation
1. mysqladmin


### PDO写法：
1. 链接数据库
  $pdo = new PDO("mysql:host=localhost;dbname=software_sharing","root",""); 
1. 插入数据
  $pdo -> exec("insert into db_demo(name,content) values('title','content')");
### SQL方法:
1. min()
  select min(dirthdate) form 表名 //查找最大年龄的人，因为年龄越大，出生越早，所以年龄越小
1. rand()
  select rand() * 100 //获取一个任意随机数，验证码
1. row()
  select now() //获取当前时间
1. concat()
  select concat('AAA','BBB') //AAABBB-字符串连接
  使用方法：select concat(id,'-',name) from 表明
1. between
  求两个值之间的值
  方法1：select * from aa where bir>=1 and bir<=3
  方法2(between用法)：select * from aa where bir between 1 and 3
1. like
  模糊查询
  select * from aa where name like '%赵%'
1. 联表查询
  mysql一般用join on,orcal一般用下面这种方法，都通用
  select * from aa,bb where aa.id=bb.id
1. limit
  select * from tablename limit m,n 
  其中m是记录开始的index,从0开始，表示第一条记录n是指从第m+1条开始，取n条
  例：select * from tablename limint 2,4即取出第3到6条，共4条
1. 查看当前服务器下有哪些数据库：
	show databases; //分号不能往
1. 数据库结构：
	性别设定：
  char(1)-男：M，女：F //国际通用性别表示
1. 事务处理：
	**set autocommit=0;**//开启事物，开启以后所有的sql语句都会当成事物来处理，直到commit或rollback结束事物，同时当结束事物时又会开启下一个新事物，所以实验最后还要set autocommit=1;来结束事物
    ```
    //以下为demo所用
    set autocommit=0;//开启事物
    start transaction

    update news set title='title' where id=40;
    update news set content='content' where id=41;
    select * from news where id=40 or id=41

    ROLLBACK //回滚事物
    COMMIT //提交事物
    ```