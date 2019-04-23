##XSS
定义：
通过嵌入一段远程或第三方域上的JS代码，在目标网站的作用域下执行。

攻击方式：
反射性XSS：非持久型，通过url请求，作为参数提交到服务器，服务器解析并相应。响应中包含XSS代码，最终浏览器解析并执行。
存储型XSS：持久型，主要是讲XSS代码送到服务器（数据库、内存或者文件系统），最典型的的攻击是留言板XSS，用户提交一条包含XSS代码的留言到数据库。当目标用户查询留言是，那些留言内容就会从服务器解析之后加载出来，浏览器再当做正常的JS解析XSS的内容，XSS攻击就发生了

危害：
1. 通过document.cookie盗取cookie
1. 使用js或css破坏页面正常的结构与样式
1. 流量劫持（通过访问某段具有window.location.href定位到其他页面）
1. Dos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应。
1. 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户的身份执行一些管理动作，或**执行一些一般的如发微博、加好友、发私信等操作。**
1. 利用可被攻击的域受到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，**如进行不当的投票活动**。

防御：
我们不能原样的将用户输入的数据直接存到服务器，需要对数据进行一些处理
1. 过滤危险的DOM节点。如具有执行脚本能力的script, 具有显示广告和色情图片的img, 具有改变样式的link, style, 具有内嵌页面的iframe, frame等元素节点。
1. 过滤危险的属性节点。如事件, style, src, href等
1. 对重要的**cookie设置httpOnly**, 防止客户端通过document.cookie读取cookie。服务端可以设置此字段
1. 对用户输入数据的处理
    * 编码：不能对用户输入的内容都保持原样，对用户输入的数据进行字符实体编码。对于字符实体的概念可以参考文章底部给出的参考链接。
    * 解码：原样显示内容的时候必须解码，不然显示不到内容了。
    * 过滤：把输入的一些不合法的东西都过滤掉，从而保证安全性。如移除用户上传的DOM属性，如onerror，移除用户上传的Style节点，iframe, script节点等。

总结：
1. DOM XSS的发生主要是在JS中使用eval造成的，所以应当避免使用eval语句。
1. XSS代码的预防主要通过对数据解码，再过滤掉危险标签、属性和事件等。
1. XSS危害有盗取用户cookie，通过JS或CSS改变样式，DDos造成正常用户无法得到服务器响应。

[参考](https://www.cnblogs.com/unclekeith/p/7750681.html)