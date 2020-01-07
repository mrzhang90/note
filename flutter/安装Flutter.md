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
  flutter upgrade          //同时更新Flutter SDK和你的依赖包
  flutter packages get     //获取pubspec.yaml文件中列出的所有依赖包
  flutter packages upgrade //获取pubspec.yaml文件中列出的所有依赖包的最新版本（在IntelliJ中点击Upgrade dependencies）
  //查看Flutter SDK 分支
  flutter channel
  //切换Flutter分支到稳定版
  flutter channel stable
  //flutter 运行，默认指向mart.dart
  flutter run
  //fltter 运行 dev环境
  flutter run --target=./lib/main_dev.dart

  //创建一个项目
  flutter create xx
  
  //修改文件后，再次启动项目报错说找不到文件，是因为缓存
  flutter clear

  //打包 - 最后生成的apk在 build\app\outputs\apk
  //参考：https://www.jianshu.com/p/888ac3b7df01
  flutter build apk --target-platform android-arm,android-arm64 --split-per-abi
```
#### 版本
^1.0.0
'1.0.0'
'^0.1.2'
'>=0.1.2 <0.2.0'
**VSCode 命令面板(cmd+shift+p)支持搜索所以一般输入flutter 就可以方便找到我们需要的命令**

1. 安装包失败
  * 安装成功，引用提示找不到包
    * 重启编辑器
  * 安装失败，提示Flutter SDK低
    * 降低包版本
1. EventBus引用未生效
  * 项目停止再启动