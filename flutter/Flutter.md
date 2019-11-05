### 方法
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
    // 延时1s执行返回
    Future.delayed(Duration(seconds: 4), (){
        _validateLogin();
        print('延时4s执行');
    });
    //异步 async await
    getData().then((result) {
      print("接口返回的数据是:${result}");
    }).whenComplete((){
      print("异步任务处理完成");
    }).catchError((){
      print("出现异常了");
    });
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
### Memoize缓存
1. Memoization缓存函数的返回值，并在再次调用该函数时重用它
    Memoization主要用于函数式语言，其中函数是确定性的（它们总是为相同的输入返回相同的输出）
    ```dart
    final AsyncMemoizer _memoizer = AsyncMemoizer();
    _getData() {
      //只运行一次该函数，并在再次调用时返回缓存的Future
      return _memoizer.runOnce(() async {
        return await HttpUtil()
            .get('http://api.douban.com/v2/movie/top250', data: {'count': 15});
      });
    }
    ```
### 解决问题
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
1. 遍历Map-报错
    ```dart
    var map=[
      {'name': "北京北京1"},
    ];
    map.forEach((item) {
      //这里是关键，如果写成item.name会报错
      item['name'];//北京北京1      
    })
    ```
### 泛类型
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
### 函数
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
### EdgeInsets
1. EdgeInsets.all
1. EdgeInsets.fromLTRB
1. EdgeInsets.only
    ```dart
    padding: EdgeInsets.all(20)
    padding: EdgeInsets.fromLTRB(0,30,20,40)
    padding: EdgeInsets.only(top: 30)
    ```
### shape
**shape用来设置按钮的形状**，其接收值是ShapeBorder类型，ShapeBorder是一个抽象类:
1. BeveledRectangleBorder 带斜角的长方形边框
1. CircleBorder 圆形边框
1. StadiumBorder 两端是半圆的边框
1. **RoundedRectangleBorder 圆角矩形**
    1. side 用来设置边线（颜色，宽度等）
        side接收一个BorderSide类型的值,属性有：color、width、style
    1. borderRadius 用来设置圆角,分为上下左右四个方向
        1. all 配置所有方向
        1. cricular 环形配置，跟all效果差不多，直接接收double类型的值
        1. horizontal 只配置左右方向
        1. only 可选左上，右上，左下，右下配置
        1. vertical 只配置上下方向
```dart
shape: RoundedRectangleBorder(//圆角矩形
  side: BorderSide(
    color: Color(0xff848FA9),
    width: 1,
  ),
  //borderRadius: BorderRadius.circular(4),
  borderRadius: BorderRadius.all(Radius.circular(10)),
)
```
### 字符串
```dart
//StringBuffer可以特别高效的构建多个字符串
StringBuffer sb=new StringBuffer();
sb.write('use a string');
sb.writeAll(['for','aa','bb']);
print(sb.toString());//use a stringforaabb
sb.clear();
```
### Set、List、Map
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
1. 在Flutter中，**事件流是“向上”传递的，而状态流是“向下”传递的**（译者语：这类似于React/Vue中父子组件通信的方式：子widget到父widget是通过事件通信，而父到子是通过状态），重定向这一流程的共同父元素是State
1. 变量
    ```
    'Count: $count'
    ```
1. 变量以下划线（_）开头，在Dart语言中使用下划线前缀标识符，会强制其变成私有的
    例如：final _suggestions = <WordPair>[];
1. Material
    ```
    import 'package:flutter/material.dart';
    ```