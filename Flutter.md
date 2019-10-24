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
## Material
1. 使用
    ```
    import 'package:flutter/material.dart';
    ```
## widget
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
      new Image.network(
        'https://github.com/flutter/website/blob/master/_includes/code/layout/lakes/images/lake.jpg?raw=true',
      )
      //缓存图片
      new CachedNetworkImage(
        placeholder: new CircularProgressIndicator(),
        imageUrl: 'https://github.com/flutter/website/blob/master/_includes/code/layout/lakes/images/lake.jpg?raw=true',
      )
      //淡入图片
      new FadeInImage.memoryNetwork(
        placeholder: kTransparentImage,
        image: 'https://github.com/flutter/website/blob/master/_includes/code/layout/lakes/images/lake.jpg?raw=true',
      )
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
## Dart
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
#### 类型
数据类型：Function、String、Numbers(num,int)、Boolean(bool)、List、Maps
```dart

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
#### 字符串
```dart
//StringBuffer可以特别高效的构建多个字符串
StringBuffer sb=new StringBuffer();
sb.write('use a string');
sb.writeAll(['for','aa','bb']);
print(sb.toString());//use a stringforaabb
sb.clear();
```
#### 数组
```dart
var nl=new List<String>();//指定类型为String

var arr=[];
arr.add(i); //数组追加
arr.forEach((item)=>print(item));//数组forEach遍历

var v=new List();
v.add(123); //添加一个
v.addAll([456,'789']);//添加多个
v.removeAt(v.indexOf('789'));//indexOf获取索引 remoteAt删除指定索引
v.sort((a,b)=>b.compareTo(a));//sort排序 compareTo比较函数,这里倒序
print(v.toString());//打印数组，toString获取数组的内容
v.clear();//clear删除数组，长度为1
//SET集合
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