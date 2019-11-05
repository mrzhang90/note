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