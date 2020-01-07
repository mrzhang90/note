## Chrome小游戏破解
[来源](https://juejin.im/post/5e0f3bb75188253a7f15b22e?utm_source=gold_browser_extension)
1. 首先,访问chrome://dino/
1. 分析
  * 打印window对象，找到了全局对象Runner
  * typeof Runner是个函数，又以大写开头，这是构造方法
  * 打印Runner的原型，找到了gameOver和setSpeed
1. gameOver是停止游戏的逻辑
    ```js
    //干掉停止游戏的方法，让游戏停不下来
    Runner.prototype.gameOver=function(){}
    ```
1. 设置游戏速度
    * 已知，setSpeed是设置游戏速度，那么只需要找到Runner的实例，调用方法即可
    * 然后，通过控制台打印Runner，看到了instance方法，可知Runner的实例保存在自身的属性上，那么
    ```js
    Runner.instance_.setSpeed(100)
    ```