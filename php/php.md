### 启动php环境
	php artisan serve
### 全局：
1. global $c -声明变量c为全局可用
1. session:
		session_start();//session开关，每个页面使用session前要加这么一句，也可以在全局设置
		$_SESSION['view']='你访问session了';
### 方法：
	include_once和require_once的区别
		前者包含或执行中遇错依然可以执行；后者则不执行
	json_encode($array)
		--数组编码
	__autoload()
		--自动加载类
		__autoload() 是专门为 类的不存在 而设计的,很多框架利用这个函数，实现 类文件的自动加载
	unset($ourfirstdog)
		--注销类
		$ourfirstdog = new dog("Rover",12,"Lisa and Graham");
		unset($ourfirstdog);//注销这个类
### 转换序列化
1. **serialize() -- 序列化**
	将对象为字符串
	$ourfirstdog = new dog("Rover",12,"Lisa and Graham");
	serialize($ourfirstdog);//序列化为字符串 O:3:"dog":3:
1. **unserialize() -- 反序列化**
	将字符串反序列化为对象
	$pet = unserialize($dogdisc); //此时的 $pet 已经是前面的 $ourfirstdog 对象了
	$old = $pet->getage();//获得属性
### 时间：
	time()
		服务器当前时间的时间戳
		$time()+2*3600
			得到当前时间延迟2小时候的时间戳
		time() - $_SERVER['REQUEST_TIME']
			计算当前页面执行时间的例子，$_SERVER['REQUEST_TIME'] 是 PHP 内置的当前页面开始运行时的时间戳，在当前页面运行结束时将 time() - $_SERVER['REQUEST_TIME'] 得到的就是当前页面运行的时间（秒）
	date("Y-m-d");
		将时间戳转换成我们需要的格式
			date("Y-m-d",$data);
### 判断存在
	defined('MYCONSTANT')
		判断常量是否存在
	isset($var_name)
		判断变量是否存在 ，变量未声明或声明时赋值为NULL，isset均返回FALSE
	empty($a)
		任何一个未初始化的变量、值为 0 或 false 或 空字符串"" 或 null的变量、空数组、没有任何属性的对象，都将判断为empty==true
		注意1：未初始化的变量也能被empty检测为"空"，适合用isset
		注意2：empty只能检测变量，而不能检测语句
	var == null功能：判断变量是否为"空"
		说明：值为 0 或 false 或 空字符串"" 或 null的变量、空数组、都将判断为 null
		注意：与empty的显著不同就是：变量未初始化时 var == null 将会报错。
	 is_null功能：检测变量是否为"null"
	 	说明：当变量被赋值为"null"时，检测结果为true
		注意1：null不区分大小写：$a = null; $a = NULL 没有任何区别
		注意2：仅在变量的值为"null"时，检测结果才为true，0、空字符串、false、空数组都检测为false
		注意3：变量未初始化时，程序将会报错
	var === null功能：检测变量是否为"null"，同时变量的类型也必须是"null"
		说明：当变量被赋值为"null"时，同时变量的类型也是"null"时，检测结果为true
		注意1：在判断为"null"上，全等于和is_null的作用相同
		注意2：变量未初始化时，程序将会报错
		总结PHP中，"NULL" 和 "空" 是2个概念。
		isset  主要用来判断变量是否被初始化过
		empty  可以将值为 "假"、"空"、"0"、"NULL"、"未初始化" 的变量都判断为TRUE
		is_null  仅把值为 "NULL" 的变量判断为TRUE
		var == null  把值为 "假"、"空"、"0"、"NULL" 的变量都判断为TRUE
		var === null  仅把值为 "NULL" 的变量判断为TRUE
		所以我们在判断一个变量是否真正为"NULL"时，大多使用 is_null，从而避免"false"、"0"等值的干扰。
	function_exists('fun_name')
		判断函数是否存在，注意待检测的函数名也需要使用引号
	filter_has_var(INPUT_GET, "name")
		检查是否存在指定输入类型的变量
		若成功，则返回 true，否则返回 false
### 乱码解决：
	header('Content-Type: json; charset=utf-8'); //添加报头
	mysql_query("set names 'utf8'"); //添加到数据库内容乱码时
### 面向对象：
	__get(),__set() ：获取赋值属性。这两个方法不是默认存在的，是我们手工添加到类里的
	__isset(),__unset() ：检查和删除属性
		一般来说，类的属性通常是private,PHP5中预定义了__get(),__set()，__isset(),__unset()
		PS:set和get是专门为类的私有属性（private和protected）设立的，对于public是可以直接访问，即不走set和get函数！！！
	__toString()
		在类里面定义了“__toString()”方法，在直接输出对象引用的时候，自动调用 了”__toString()”方法， 输出“__toString()”方法中返回的字符，所以
		“__toString()”方法一定要有个返回值（return 语句）
	parent::
		使用：parent::__construct($cl);
			在子类中使用parent::的方式调用父类中被覆盖的方法
		还有一种方法Car::run()
			使用父类的“类名::“来调用父类中被覆盖的方法
	self::
	final关键字
		使用final关键标记的类不能被继承
		使用findl关键标记的方法不能被子类覆盖，是最终版本，比如连接数据库方法，不需要重写，那么就会用到final
	静态成员-static
		使用方法-类名::静态属性
	静态方法-static
		使用方法-类名::静态方法
	self::
		在方法中访问静态成员
	const关键字
	abstract关键字-定义抽象类
		抽象类里的方法都要在子类实现，不然子类还是抽象类
	interface接口
		接口是一种特殊的抽象类，里面所有方法都是抽象方法，所以接口不能产生实例对象；它也可以作为一种规范，所有抽象方法需要子类实现
	implements-
		我们定义接口的子类去实现全部抽象方法使用的关键字是implements,而不用extends
	PS:
		PHP是单继承的，一个类智能有一个父类，但是一个类可以实现多个接口
			class four implemtns 接口1，接口2，……
		PHP中不仅一个类可以实现多个接口，也可以在继承一个类的同时实现多个接口，一定要继承类再去实现接口
			class four extends 类名1 implemtns 接口1，接口2……

