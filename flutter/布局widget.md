### 方法
1. Row和Column高度自适应
    ```dart
    Column(
      mainAxisSize: MainAxisSize.min,
    )
    ```
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
1. 左右布局 Row
    ```dart
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,//左右布局
      children: <Widget>[
        Container(
          alignment: Alignment.centerLeft,
          child: Text('账号')
        ),
        Container(
          alignment: Alignment.centerRight,
          child: Text('158')
        ),
      ],
    )
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
### decoration
背景设定（边框、圆角、阴影、形状、渐变、背景图像等）
```dart
decoration: new BoxDecoration(
  border: new Border.all(width: 2.0, color: Colors.red),
  color: Colors.grey,
  borderRadius: new BorderRadius.all(new Radius.circular(20.0)),
  image: new DecorationImage(
    image: new NetworkImage('http://h.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=0d023672312ac65c67506e77cec29e27/9f2f070828381f30dea167bbad014c086e06f06c.jpg'),
    centerSlice: new Rect.fromLTRB(270.0, 180.0, 1360.0, 730.0),
  ),
)
```
### container
Container是一个widget，允许您自定义其子widget。设置填充，边距，边框或背景色
使用其color属性设置图标的颜色。使用Text的style属性来设置字体，颜色，粗细等
```dart
//下边线
Container(
  padding: EdgeInsets.fromLTRB(l,t,r,b),
  decoration: new BoxDecoration(
    border: new Border(bottom: BorderSide(color: Color(0xFFDCDFE6))),
  ),
  child: Text('温馨提示',
    style: TextStyle(fontSize: 16,color:Color(0xff343D54)),
  ),
)

Container(
  //设置圆角
  foregroundDecoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(4),
  )
)

new Container(
  padding: const EdgeInsets.all(32.0),
  decoration: new BoxDecoration(color: Colors.white),
  child: new Center(
    child: new Text('Hello World',
        textDirection: TextDirection.ltr,
        style: new TextStyle(fontSize: 40.0, color: Colors.black87)),
  ),
)
```
### Flexible、Expanded
**主轴方向：Row在水平方向，Column在垂直方向**
Expanded会撑开Row、Column、Flex，充满主轴可用空间
**Flexible**可以使Row、Column、Flex等子组件在主轴方向有填充可用空间的能力，但与Expanded不同，它**不强制子组件填充可用空间**
```dart
// Expanded
new Expanded(
  flex: 1,//弹性系数设置
  child: new Image.asset('images/pic2.jpg'),
)
// Flexible
new Flexible(
  flex: 1,
  child: new Text('黄色按钮'),
)
```
### 布局
1. 无状态的StatelessWidget
1. 有状态的StatefulWidget,widget需要管理一些状态
1. widget主要主要是实现一个build函数，构建自身
1. 主题
    ```
    theme: new ThemeData(
      brightness: Brightness.dark,
      primaryColor: Colors.lightBlue[800],
      primarySwatch: Colors.blue,
      accentColor: Colors.cyan[600],
    )
    ```
1. SafeArea
    ```dart
    //解决IphoneX刘海屏、以及其他设备的状态栏高度
    SafeArea(
      child: ……,
    )
    ```
1. Wrap
    ```js
    //相当于web的div，高度可自己撑开
    Wrap(children: <Widget>[……],);
    ```
1. Stack
    ```dart
    //********************Stack使子组件堆叠 浮动********************
    Stack(
      children: <Widget>[……],
      Positioned(
        top:0,
        right:0,
      )
    )
    ```
1. Radio
  ```dart
  @override
  String _locale = '男';
  List _locales = ['男', '女'];
  @override
  Widget buildBody(BuildContext context) {
    List<Widget> radios = List<Widget>();
    _locales.forEach(
      (locale) {
        radios.add(
          Container(
            width: FormatSize.getSize('width', 18),
            height: FormatSize.getSize('height', 18),
            margin:EdgeInsets.only(left:FormatSize.getSize('right', 8),),
            child: Radio(
              value: locale,
              groupValue: _locale,
              onChanged: (value) {
                setState(() {
                  _locale = value;
                });
              },
            ),
          ),
        );
      },
    );
  }
  
  Wrap(direction: Axis.horizontal, children: radios)
  ```
```js
//***********************InkWell给widget添加点击事件***********************
InkWell(
  onTap: () {
),
//***********************Offsetage控制显示隐藏***********************
Offstage(
  offstage: isShow, //控制显示隐藏
}
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
ListView.builder(//ListView 30个
  itemCount: 30,
  itemBuilder: (BuildContext context, int index) {
    return ListTile(title: Text('当前 index = $index'), onTap: () => Navigator.of(context).pop(index));
})
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
//Column
//Row
new Row(
  children:[...]
)
//Text
new Text('CALL',style:new TextStyle(
  textAlign: TextAlign.center,//对齐方式
  color:Colors.blue,
  fontSize: 12.0,
  decoration: TextDecoration.none,//文本组件去下划线
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