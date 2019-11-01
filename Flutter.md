## 方法
1. 跳到跟路由，不显示返回
  ```dart
  Navigator.of(context).pushAndRemoveUntil(new MaterialPageRoute(builder: (context) => HomePage())
  ```
1. 防止自动返回
    ```dart
    AppBar(
      automaticallyImplyLeading: false, // 防止自动出现返回键
    )
    ```
1. 设置文本内容-可动态删除
    ```dart
    TextField(
      controller: TextEditingController.fromValue(TextEditingValue(
      // 设置内容
      text: inputText,
      // 保持光标在最后
      selection: TextSelection.fromPosition(TextPosition(
          affinity: TextAffinity.downstream,
          offset: inputText.length)))),
    )
    ```
1. 方法
    ```dart
    setState
    //强制撑满
    width: double.infinity
    //isNotEmpty 是否为空
    print(str.isNotEmpty);
    //runTimeType 获取类型 ，但|-|-|我用switch判断类型List<String>报错，目前用is解决|-|-|
    x.runTimeType
    ```
1. 操作符
    [参考：Dart运算符](https://www.cnblogs.com/upwgh/p/11173472.html)
    ```dart
    //is 检测类型-对象是定义类型则返回 true，当对象是定义类型的子类或者实现类时，也返回 true
    x is List<String>
    //is! 与is相反
    x! is List<String>

    //as：类型转换（也用来作为 library 前缀）
    (emp as Person).firstName = 'Bob';//as 方式，注意当 emp 为 null 或者不是 Person类型时，会抛出异常
    
    b ??= value    //??= 表示当左边变量为 null 时，将右边的值赋给左边变量
    expr1 ?? expr2 //expre1 不为 null时返回 expre1，否则返回 expre2

    //级联操作符（..）
    //条件成员访问符（?.） 和. 类似，但是左边的操作对象不能为 null，例如 foo?.bar 如果 foo 为 null 则返回 null，否则返回 bar 成员
    ```  
## 解决问题
1. Column 提示高度溢出
    如果子list非Expanded或Flexible，就可能会提示
    **解决方案：最后一个子组件用Expanded包一下**
    例如:
    ```dart
    Column(
      children: <Widget>[
        SizedBox(...),
        SizedBox(...),
        Expanded(//这里包一下就好
          child:Column(
            ...//这里的最后一个也要包一下
          )
        )
      ]
    )
    ```
## 泛类型
```dart
class ZRouter {
  // SPA 路由表
  static Map<String, Widget> get routerStore => {
    '/': SplashPage(),
    '/main_page': NavPage(),
    '/login': LoginPage(),
    '/product_detail': ProductDetailsPage()
  };
  /*
    获取页面参数
    @context
    @defaultData
   */
  static T getPageArguments<T>(context, defaultData) {
    RouteArguments<T> _args = ModalRoute.of(context).settings.arguments ?? RouteArguments<T>(defaultData);
    return _args.args;
  }
}
//调用
Product _pro = ZRouter.getPageArguments(context, new Product());
print(_pro.id);
print(_pro.name);
print(_pro.rate);
print(_pro.rateTime);
```
## 封装
1. 屏幕适配
    ```dart
    import 'package:flutter_screenutil/flutter_screenutil.dart';

    class FormatSize{
      
      FormatSize(context){
        //全局初始化UI适配
        ScreenUtil.instance = ScreenUtil(width: 1366, height: 768)..init(context);
      }
      getSize([String type,double size]){
        print('type:$type,size:$size');
        switch(type){
          case 'width':
          case 'left':
          case 'right':
            return ScreenUtil.getInstance().setWidth(size);
          case 'height':
          case 'top':
          case 'bottom':
            return ScreenUtil.getInstance().setHeight(size);
          case 'fontSize':
            return ScreenUtil.getInstance().setSp(size);
        }
      }
    }
    //使用
    import '../../Utils/formatSize.dart';

    Widget build(BuildContext context) {
        //初始化
        FormatSize formatSize = FormatSize(context);
        ...
        //调用
        formatSize.getSize('width',75)
        formatSize.getSize('left',40)
        formatSize.getSize('fontSize',20)
    }
    ```
## 插件
1. 全局状态管理机 
1. 屏幕适配 flutter_screenutil flutter_redux
    ```js
    //入口初始化
    ScreenUtil.instance = ScreenUtil(width: 1366, height: 768)..init(context);
    //配置宽高
    ScreenUtil.getInstance().setWidth(300)
    ScreenUtil.getInstance().setHeight(300)
    //配置字体
    ScreenUtil.getInstance().setSp(24)
    ```
1. dio是Dart Gttp请求库
    ```js
    import 'package:dio/dio.dart';
    Dio dio = new Dio();
    Response response=await dio.get("/test",data:{"id":12,"name":"wendu"});
    print(response.data);
    ```
#### 路由
```dart
//***********路由轻量级框架FRouter***********

//**********命名导航**********
return new MaterialApp(
  home: new Scaffold(
    body: new Center(
        child: _currentPage
    ),
    bottomNavigationBar: bottomNavigationBar,
  ),
  theme: GlobalConfig.themeData,
  routes: {
    "nameRoute":(BuildContext context)=>new EditUser(),
  },
);
//使用
Navigator.of(context).pushNamed('/new');
//**********跳转**********
Navigator.push(
  context,
  new MaterialPageRoute(
    builder: (context) => new CustomButton('测试跳转'),
  ),
);
//********返回上一页********
Navigator.pop(context)
//*******ios 侧滑退出 CupertinoPageRoute*******
定义一个NavigatorUtils 类
class NavigatorUtils {

 ///搜索
  static Future goSearchPage(BuildContext context) {
    return NavigatorRouter(context, new SearchPage());
  }

 ///公共打开方式
  static NavigatorRouter(BuildContext context, Widget widget) {
    return Navigator.push(context,
        new CupertinoPageRoute(builder: (context) => pageContainer(widget)));
  }

  ///Page页面的容器，做一次通用自定义
  static Widget pageContainer(widget) {
    return MediaQuery(

        ///不受系统字体缩放影响
        data: MediaQueryData.fromWindow(WidgetsBinding.instance.window)
            .copyWith(textScaleFactor: 1),
        child: widget);
  }
}
//外部调用 比如按钮点击事件 直接调用此方法 就可以
NavigatorUtils.goSearchPage(context);
```
#### 函数
```dart
//构造函数-参数传递
class Point{
  num x;
  Point(this.x,y){}//构造函数的参数前可加this关键字，传参改变属性x
  Point.addList(var list)://参数后加：(冒号)再赋值
    this(list[0],list[1])  
}
//构造函数 get和set
class Calculation{
  num left;
  num width;
  Calculation(this.left,this.width);
  num get right=>width-left;
  set right(num v)=>left=width-v;
}
//构造函数 abstract抽象类、抽象方法、extends集成
abstract class Shape{
  num permieter();//抽象方法
}
class Rectangle implements Shape{
  final num height;
  Rectangle(num this.height);
  nun permieter()=>2*height;//实现了抽象方法
}
class Square extends Rectangle{//extends继承类
  Square(num size) : super(size);//super超类，调用父类构造方法
}
//传参默认值 ":" "="
Function Obj(a,{b,c:3})//a必填，b不填为null，{}默认值:
Function Arr(a,[b,c=3,d=4])//a必填，b不填为null，[]默认值=
//箭头函数的默认参数num,这里也可以用int
Function makeSubstract=(num n)=> (num i) => n - i;
//定义箭头函数
String sayHello(String name)=>'hello $name';
//is-是否数据类型一样
print(sayHello is Function);//true
//typedef-定义add类型
typedef int Add(int a, int b);
int aa(int a,int b)=>a-b;
print(aa is Add);//true 所以aa和Add数据类型是一样的
print
assert
  断言函数assert()，Debug模式下，当表达式的值为false时抛出异常。
  在SDK 1.22.0中，assert()添加了第二个参数message，用于在抛出异常的时候，输出具体信息
new DateTime.now()
```
#### 布局
1. 无状态的StatelessWidget
1. 有状态的StatefulWidget,widget需要管理一些状态
1. widget主要主要是实现一个build函数，构建自身
1. 基础widget
    ```
    Text
    Row、Column
    Stack
    Container:height,margin,padding,child
    Image
    样式
      Padding(
        padding: EdgeInsets.all(8.0),
        child: const Card(child: Text('Hello World!')),
      )
    主题
      theme: new ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.lightBlue[800],
        accentColor: Colors.cyan[600],
      )
    ```
```js
//********************Stack使子组件堆叠 浮动********************
//***********************InkWell给widget添加点击事件***********************
InkWell(
  onTap: () {
),
//***********************Offsetage控制显示隐藏***********************
Offstage(
  offstage: isShow, //控制显示隐藏
}
//**********************Container**********************
// Container是一个widget，允许您自定义其子widget。设置填充，边距，边框或背景色
// 使用其color属性设置图标的颜色。使用Text的style属性来设置字体，颜色，粗细等
new Container(
  padding: const EdgeInsets.all(32.0),
  decoration: new BoxDecoration(color: Colors.white),
  child: new Center(
    child: new Text('Hello World',
        textDirection: TextDirection.ltr,
        style: new TextStyle(fontSize: 40.0, color: Colors.black87)),
  ),
)
//*****************Image*****************
//引入本地图片
//1.在工程根目录创建一个 images 文件夹.
//2.添加  lake.jpg. (请注意，wget不能保存此二进制文件。)
//3.更新 pubspec.yaml 文件以包含 assets 标签. 这样才会使您的图片在代码中可用
new Image.asset(
  'images/lake.jpg',
  height: 240.0,
  fit: BoxFit.cover,
),
//Image
new Image.network(
  'https://**.com/lake.jpg',
)
//FadeInImage适用于任何类型的图片：内存、本地Asset或来自网上的图片
new FadeInImage.memoryNetwork(
  placeholder: kTransparentImage,
  image: 'https://**.com/lake.jpg?raw=true',
);
//缓存图片
new CachedNetworkImage(
  placeholder: new Placeholder(),//可以使用占位符，可以使用任何的Widget作为占位符
  imageUrl: 'https://**.com/lake.jpg?raw=true',
);
//淡入图片
new FadeInImage.memoryNetwork(
  placeholder: kTransparentImage,
  image: 'https://github.com/flutter/website/blob/master/_includes/code/layout/lakes/images/lake.jpg?raw=true',
)
//******************Container******************
new Container(
  padding: const EdgeInsets.all(32.0),
  child:new Column(
    children:[]
  }
)
//*****************Column Row*****************
Column(
  mainAxisAlignment: MainAxisAlignment.center,//主轴
  //在Row（水平排列）控件中，CrossAxisAlignment的方向就是垂直的
  //在 Column（垂直排列）控件中，CrossAxisAlignment的方向就是水平的
  crossAxisAlignment: CrossAxisAlignment.center,
  children:<widget>[]
)
enum MainAxisAlignment {
 //将子控件放在主轴的开始位置
  start,  
   //将子控件放在主轴的结束位置
  end,
  //将子控件放在主轴的中间位置
  center,
  //将主轴空白位置进行均分，排列子元素，手尾没有空隙
  spaceBetween,
  //将主轴空白区域均分，使中间各个子控件间距相等，首尾子控件间距为中间子控件间距的一半
  spaceAround,
  //将主轴空白区域均分，使各个子控件间距相等
  spaceEvenly,
}
enum CrossAxisAlignment {
 //将子控件放在交叉轴的起始位置
  start,
 //将子控件放在交叉轴的结束位置
  end,
 //将子控件放在交叉轴的中间位置
  center,
//使子控件填满交叉轴
  stretch,
//将子控件放在交叉轴的上，并且与基线相匹配（不常用）
  baseline,
}
//********************Center********************
new Center(
  child: new Text('Hello World', style: new TextStyle(fontSize: 32.0)
)
// *********************ListView********************* 
// widget放置到ListView中，而不是列中，因为在小设备上运行应用程序时，ListView会自动滚动
new ListView(
  scrollDirection: Axis.horizontal,//水平的ListView
  children: <Widget>[
    new Container(
      width: 160.0,
      color: Colors.red,
    ),
  ],
)
//******处理包含大量数据的列表，最好使用ListView.builder构造函数******
//创建一个数据源
final items = new List<String>.generate(10000, (i) => "Item $i");
//将数据源转化为Widgets
new ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return new ListTile(
      title: new Text('${items[index]}'),
    );
  },
);
// Expanded 弹性布局
new Expanded(
  flex: 2,//弹性系数设置为2
  child: new Image.asset('images/pic2.jpg'),
)
//Column
//Row
new Row(
  children:[...]
)
//Text
new Text('CALL',style:new TextStyle(
  color:Colors.blue,
  fontSize: 12.0
))
//Icon
new Icon(
  Icons.router,
  color: Colors.blue,
)
//*******SizedBox能强制子控件具有特定宽度、高度或两者都有,使子控件设置的宽高失效*******
SizedBox(
  width: 99,
)
```
#### 字符串
```dart
//StringBuffer可以特别高效的构建多个字符串
StringBuffer sb=new StringBuffer();
sb.write('use a string');
sb.writeAll(['for','aa','bb']);
print(sb.toString());//use a stringforaabb
sb.clear();
```
#### Set、List、Map
Set、List、Map都继承自Iterable，是可以迭代的
```dart
//********************数组********************
var arr = {
  'oahu' : ['waikiki', 'kailua', 'waimanalo'],
  'big island' : ['wailea bay', 'pololu beach'],
  'kauai' : ['hanalei', 'poipu']
};
arr.add(i); //数组追加
arr.forEach((item)=>print(item));//数组forEach遍历
arr.forEach((k,v)=>print('$k,$v')); //forEach循环遍历
print(arr['oahu'].any((v) => v.indexOf('waikiki') != -1)); //any-其中一个元素return true，那么return true，否则false
print(arr['oahu'].every((v) => v.indexOf('waikiki') != -1)); //every-所有元素return true，那么return true，否则false
//***********************对象***********************
var teamAssignments = {};
teamAssignments.putIfAbsent('Catcher', () => 'Catcher'.length);//putIfAbsent(K key, Function V ifAbsent())函数，通过Key来查找Value;当Key不存在执行第二个参数追加Value
print(teamAssignments['Catcher']);
//**********************list**********************
var nl=new List<String>();//指定类型为String
var v=new List();
v.add(123); //添加一个
v.addAll([456,'789']);//添加多个
v.removeAt(v.indexOf('789'));//indexOf获取索引 remoteAt删除指定索引
v.sort((a,b)=>b.compareTo(a));//sort排序 compareTo比较函数,这里倒序
print(v.toString());//打印数组，toString获取数组的内容
v.clear();//clear删除数组，长度为1
//*********************SET集合*********************
var s=new Set();
s.add('a');
s.addAll(['a', 'b', 'c']);
s.remove('a');
s.contains('a');//是否包含某个元素
s.containsAll(['a','b']);//是否包含多个元素
print(s1.intersection(s));//获取两个SET的交集

```
#### 类
```dart
class Person{
  String name;
  String country;
  void setCountry(String country){
    this.country=country;
  }
  String toString()=>"Name:$name\nCounry:$country";//默认调用方法
}
//级联调用类
Person p=new Person();
    p ..name='Wang'
      ..setCountry('country');
print(p);//这里调用的类的toString方法
//*************************Logger类********************
class Logger{
  final String name;//final正常来说，定义类型不能在修改name属性，下面通过_add可以修改name
  static Map _cache={};//static定义静态私有变量
  // 使用了factory工厂方法，就可以return
  factory Logger(String name){
    if(_cache.containsKey(name)){
      return _cache[name];
    }else{
      final logger=new Logger._add(name);//调用方法
      _cache[name]=logger;
      return _cache[name];
    }
  }
  add(name){
    final logger=new Logger._add(name);
    _cache[name]=logger;
    return _cache[name];
  }
  Logger._add(this.name);//自定义方法-设置name属性
  Map log(){//获取私有属性
    return _cache;
  }
}
//调用
var logger=new Logger('zhang');
logger.add('guang');
var log=logger.log();
print(log.toString());
```
#### 库
```dart
//**********************import语句用来导入一个库**********************
import 'dart:math';  //dart:前缀表示Dart的标准库，如dart:io、dart:html
import 'package:args/args.dart'; //Pub包管理系统中有很多功能强大、实用的库，可以使用前缀 package:
import 'lib/student/student.dart' as Stu; //as关键字来使用命名空间
Stu.Student s = new Stu.Student(); //使用as的命名空间
import 'lib/student/student.dart' show Student, Person;//show关键字可以显示某个成员
import 'lib/student/student.dart' hide Person;//hide关键字可以隐藏某个成员
//***********************library定义这个库的名字***********************
library person;//library定义库的名字,但库的名字并不影响导入，因为import语句用的是字符串Uri
//**************************export关键字导出库**************************
export 'random.dart';//导出库
export 'random.dart' show Random;//导出部分库
export 'random.dart' hide Random;//导出部分库
```
**利用pub管理自己的库**
1. 新建库student
    * 在根目录创建文件夹，命名为”库名-版本号“
      pubspec.yaml中，name:库名,version:版本号
      lib文件夹:
        * dart文件，命名为student.dart
        * src文件夹中包含一个文件person.dart
          ```dart
            library student.src.person;
            class Person {
                String name;
                Person(this.name);
                String toString() => name;
            }
          ```

1. 引用库student
  ```dart
  import 'dart:math';
  import 'package:student/student.dart';
  ```
**对于非Material应用程序，您可以将Center widget添加到应用程序的build()方法中：**
**请注意，默认情况下，非Material应用程序不包含AppBar，标题或背景颜色。 如果您想在非Material应用程序中使用这些功能，您必须自己构建它们。此应用程序将背景颜色更改为白色，将文本更改为深灰色以模仿Material应用程序。**
```dart
// 这个App没有使用Material组件,  如Scaffold.
// 一般来说, app没有使用Scaffold的话，会有一个黑色的背景和一个默认为黑色的文本颜色。
// 这个app，将背景色改为了白色，并且将文本颜色改为了黑色以模仿Material app
import 'package:flutter/material.dart';

void main() {
  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Container(
      decoration: new BoxDecoration(color: Colors.white),
      child: new Center(
        child: new Text('Hello World',
            textDirection: TextDirection.ltr,
            style: new TextStyle(fontSize: 40.0, color: Colors.black87)),
      ),
    );
  }
}
  ```
## Material
1. 使用
    ```
    import 'package:flutter/material.dart';
    ```
## Dart
数据类型：Function、String、Numbers(num,int)、Boolean(bool)、List、Maps
**Dart有两种运行模式：**
1. 检查模式(checked):进行类型检查，如果发现实际类型与声明或期望的类型不匹配就报错
1. 生产模式(production):不进行类型检查，忽略声明的类型信息，忽略assert语句
**PS:**
    Dart VM 和 Dartium 默认在生产模式下运行，而我们用 Dart Editor 开发时默认在检查模式下运行，通过选项可以设置使用不同的模式
    **在checked模式下，如果非bool的判断条件会抛异常**
    **在production模式下，非bool的判断条件会被翻译成false**
**定义变量**：var、const、final
**const和final:**
相同点：定义的都是常量，值不能改变；声明的时候必须初始化
不同点：const定义的必须是常量，final则可以用变量来初始化
```dart
const c=new DateTime.now();//Error，const必须是常量
final c=new DateTime.now();//2019-10-22 15:46:27.000191
```
```dart
//打印、字符串和变量连接
print("str1:$str1");
//三个单引号 声明换行字符串
var str3="""Dart Lang
            Hello ,test3""";
//字符串转义
String str2='It\'s str2';
//字符串前加“r”声明原始字符串；可以避免“\”的转义作用
print(r"换行符:\n换行符");
//校验
assert(str1 == "str1");
//转换进制
var hex = 0xDEADBEEF;
print("整型转换为16进制：$hex —> 0x${hex.toRadixString(16).toUpperCase()}");
```
## 安装Flutter
1. 下载Flutter
  git clone -b beta https://github.com/flutter/flutter.git
  添加Flutter的bin目录路径，例如：D:\Android\flutter\bin
1. 配置国内镜像
  FLUTTER_STORAGE_BASE_URL: https://storage.flutter-io.cn
  PUB_HOSTED_URL: https://pub.flutter-io.cn
1. Android SDK
  当遇到报错：**X Unable to locate Android SDK**，
  那么需要一个name为ANDROID_HOME的系统变量，值就是你的sdk的路径位置
1. 安装Android证书
  当遇到报错：**提示没有安装证书**
  flutter doctor --android-licenses
1. 模拟器 可以安装**雷电模拟器**
1. 安装依赖和环境检测
```js
  // 查真机
  adb devices
  // 查模拟器
  emulator -list-avds

  flutter doctor
  flutter packages get
  flutter run

  flutter create
```

**VSCode 命令面板(cmd+shift+p)支持搜索所以一般输入flutter 就可以方便找到我们需要的命令**

1. 在Flutter中，**事件流是“向上”传递的，而状态流是“向下”传递的**（译者语：这类似于React/Vue中父子组件通信的方式：子widget到父widget是通过事件通信，而父到子是通过状态），重定向这一流程的共同父元素是State
1. 变量
    ```
    'Count: $count'
    ```
1. 变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的
    例如：final _suggestions = <WordPair>[];