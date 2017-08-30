======================================================================
                         javascript:save2local.js
======================================================================
( http://unoh.net)(http://kujirahand.com)
======================================================================
目前流行的网络应用中，有不少应用涉及到保存数据到本地的功能，用于应付网络中断或上不了网的情况，例如Google Reader的Gears离线功能，今天我介绍一种通过Flash保存数据到本地的一个很简单的方法。
Flash程序目前有保存和载入外部文件的功能，我们可以在JavaScript中调用Flash，实现JavaScript的离线读取和写入数据到本地硬盘的功能，有个日本人写了一些代码实现了这个功能，我现在将其翻译一下，供大家参考。

　　首先点这里下载这个文件，将其解压缩到本地硬盘。

　　文件里面的test.html为演示文件，大家可以参照这个文件学习。

　　首先将下面三个文件复制到WEB目录下

　　swfobject.js ，save2local.swf ，save2local.js

　　然后将以下代码复制到你的HTML文件中。

<script type="text/javascript" src="swfobject.js"></script>
<script type="text/javascript" src="save2local.js"></script>

　　接着，就可以写自己相关的保存代码了，具体例子如下：

<script type="text/javascript"><!--
function test() {
  save2local.saveData("key","value");
  alert( save2local.loadData("key") );
}
--></script>
<a href="javascript:test()">williamlong test, click here .</a>

这种方法可以简单的实现JavaScript保存本地数据的功能。
