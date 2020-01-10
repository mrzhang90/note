### 方法
1. 高度撑满，滚动
    ```dart
    Container(
      height: double.infinity,//高度撑满
      child: SingleChildScrollView(//滚动
        child:
      ),
    ),
    ```
1. 数字键盘
    ```dart
    import 'package:flutter/services.dart';
    TextField(
      maxLength: 2,
      keyboardType: TextInputType.number,   //数字键盘
      inputFormatters: <TextInputFormatter>[
          WhitelistingTextInputFormatter.digitsOnly,//只输入数字
          LengthLimitingTextInputFormatter(6)//限制长度
      ],
    )
    ```
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
### 方法
1. 类型转换
    ```dart
    var a = int.parse('1234');         //把字符串 1234 转换成 数值 1234
    print(a is int);                   //输出 ture，判断是否转换成功
    
    var b = double.parse('1234.12');  //把字符串 1234.12 转换成 数值 1234.12
    print(b is double);               //输出 ture ，判断是否转换成功
    
    var str = 1234.toString();        //把数值 1234 转换成 字符串 1234
    print(str  is String);            //输出 ture ，判断是否转换成功

    //字符串与日期相互转换
    DateTime.parse(string) //字符串转DateTime
    ```
1. 泛型
    ```dart
    //Map
    Map<String,dynamic> map={'userName':1,'password':123456}
    //List
    List list=[
      {'userName':1,'password':123456},
    ]

    //定义一个Base数据结构
    class baseModel<T>{
      int code=0;
      T result;//result可能是数据 也可能是对象
      baseModel(this.code,this.result);
    }
    //定义一个Model数据结构
    class UserModel={
      String userName='';
      UserModel(this.userName);
    }
    //定义一个Map或List数据
    baseModel<List<UserModel>> response= list;
    baseModel<UserModel> response= map;
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
1. 获取元素宽高尺寸
    ```dart
    GlobalKey popTopKey; //定义key
    popTopKey = GlobalKey(); //设置key
    Container(
      key: popTopKey,        //元素绑定key
    }
    //根据key获取元素
    RenderBox renderBox = popTopKey.currentContext.findRenderObject();
    //获取元素尺寸
    Size size = renderBox.size; //targetWidget的size
    //拿到width
    print('size.width${size.width}');
    ```
1. 时间 Date
    ```date
    //获取时间戳，并转换成字符串
    String TIMESTAMP=new DateTime.now().millisecondsSinceEpoch.toString();
    //10年后的日期
    parseTime(date: DateTime.now().add(Duration(days: 365*10)), format: "{y}-{m}-{d}")
    ```
1. JSON
    ```dart
    //jsonEncode 对象转字符串
    String data=jsonEncode(options.data);
    ```
1. 对象拷贝
    ```dart
    Map m={};
    Map _map = DeepCopy().copy(JSON_DATA);
    m.add(_map);
    ```
1. 定时器
    ```dart
    //*******伪代码 30s倒计时*******
    const count=30;
    //调用倒计时
    initState(count)
    initState(count){
      Timer _timer;
      if(count>0){
        _timer = Timer.periodic(
          Duration(seconds: 1),
          (Timer timer) => initState(--count),
        );
      }else{
        _timer?.cancel();
      }
    }    
    ```
1. 方法
    ```dart
    //获取元素高度
    MediaQuery.of(context).size.height
      //实例
      /*Container(
        height: MediaQuery.of(context).size.height,
        child: bodyList[this._index]
      )*/
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
1. 点击空白处隐藏键盘

    给Container添加一个点击隐藏子widget TextField隐藏键盘的操作，加上去后发现没有用，点击空白处并不能收起键盘。给container添加一个背景后才起作用。

    是因为默认清楚下透明区域不响应事件，给GestureDetector加上behavior: HitTestBehavior.translucent,这个参数就可以正常接受了。
    ```dart
    GestureDetector(
      behavior: HitTestBehavior.translucent,
      onTap: () {
          // 触摸收起键盘
          FocusScope.of(context).requestFocus(FocusNode());
      },
      child: *******
    }
    ```
1. TextField键盘显示和隐藏
    给TextField指定一个FocusNode.
    ```dart
    //要显示键盘调下面的代码：
    FocusScope.of(context).requestFocus(focusNode);
    //隐藏键盘：
    focusNode.unfocus();
    ```
1. TextField 禁用
    ```dart
    TextField(
      enabled: false,//只读不可编辑、也无法响应点击事件
      enableInteractiveSelection: false, //只读不可编辑
    )
    ```
1. 颜色
    ```dart
    0xaarrggbb Color(0xff00ffff); // 这个一定要注意前面两位是透明度
    argb Color.fromARGB(255, 150, 150, 150) 各值的范围都是0 - 255
    ```
1. 时间日期格式化
    ```dart
    DateTime date = joke.createdAt;
    // yyyy-MM-dd HH:mm:ss
    String timestamp = "${date.year.toString()}-${date.month.toString().padLeft(2,'0')}-${date.day.toString().padLeft(2,'0')} ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}";
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
    //类型转换
    BaseModel().code = json['code'] as num

    b ??= value    //??= 表示当左边变量为 null 时，将右边的值赋给左边变量
    expr1 ?? expr2 //expre1 不为 null时返回 expre1，否则返回 expre2

    //级联操作符（..）
    //条件成员访问符（?.） 和. 类似，但是左边的操作对象不能为 null，例如 foo?.bar 如果 foo 为 null 则返回 null，否则返回 bar 成员
    ```