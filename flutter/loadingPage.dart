import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import '../Utils/formatSize.dart';

class LoadingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //计算自适应尺寸-初始化FormatSize实例
    // FormatSize formatSize = FormatSize(context);
    return Container(
      color: Colors.white,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center, //主轴
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          new SpinKitWave(color: Colors.blueAccent, size: 34.0),
          SizedBox(
            height: FormatSize.getSize('fontSize', 20),
          ),
          Text(
            '正在加载中…',
            style: TextStyle(
              fontSize: FormatSize.getSize('fontSize', 22),
              color: Color(0xff343D54),
              decoration: TextDecoration.none,
            ),
          )
        ],
      ),
    );
  }
}
