1. input 垂直不居中-兼容IE7+,Safari及标准浏览器
	首先.行高28px,那么label和input浮动，以设置两元素垂直居中
	然后设置input的padding的上下内边距，然后加高度和行高，最后设置边框线，相加正好就是28px
	```css	
	label{
		float:left;
		line-height:28px;
	}
	input[type=text]{
		float:left;
		padding:6px 0 6px 7px;width:165px;height:14px;line-height:14px;
		border:solid 1px #c4c4c4;
	}
	```
1. [IE9 Filter bug:由于IE9识别filter和css3](参考：https://www.bokeyy.com/post/tag/ie9-filter)
	解决方法：
	1. 利用ie9识别root和filter，而ie6/7/8都不识别root
		```css		
		input{background:rgba(38,141,183,.8);filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#dd298fb8,endColorStr=#dd298fb8);}
		:root input{filter:progid:none;}
		```
	1. 条件注释法：
		```css
		<!--[if IE 9 ]><![endif]-->
		```
1. *推*荐*识别ie6-8/ie9+
	注释条件-ie6-8黑色,ie9 yellow,ie10以上浏览器blue,其他浏览器红色
	```css
	//+识别IE5/6/7 \9识别6-8
	.aa{background:red;+background:#000;background:#000 \9;}
	@media screen and (min-width:0\0){
		background:yellow;
	}
	@media all and (-ms-high-contrast:none) {
		background:blue;
	}
	```
1. opacity兼容IE6,7,8
	```css
	//透明度：
	//写法1.
	filter:alpha(opacity=)  0-100
	//写法2.
	-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
	//背景透明：
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#aa000000,endColorstr=#aa000000);
	```
1. background渐变兼容IE
	```css
	background: linear-gradient(45deg, red 20%, blue 60%, yellow 100%);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='red',endColorstr='yellow',GradientType='1');
	```
1. IE7/8使用特殊字体造成文字出现锯齿等问题
	h2, p {filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src=hIEfix.png,sizingMethod=crop);zoom:1;}
	参考：http://www.zhangxinxu.com/wordpress/2009/12/%E7%BF%BB%E8%AF%91-ie78font-face%E5%B5%8C%E5%85%A5%E5%AD%97%E4%BD%93%E4%B8%8E%E6%96%87%E5%AD%97%E5%B9%B3%E6%BB%91/
1. 在IE6，7下inline-block不支持块标签;PS:input、select、button、textarea的默认display皆为inline-block,所以在布局时应加以注意
	第一种：专门为IE7写Hack
		display:inline-block;*display:inline;*zoom:1;//特别是 ZOOM:1 这个必须的
	第二种：//注意这两个 display要先后放在两个CSS声明中才有效果，这是IE的一个经典bug，如果先定义了display:inline-block，然后再将 display设回inline或block，layout不会消失
		.selector { display: inline-block }
		.selector { *display: inline }
1. li下间隙问题:在IE6，7下li本身没有浮动，但是内容浮动了，li下边会多出几PX的空隙。
	解决方案:1.给li加浮动,2.给li加vertical-align
1. IE8下，select垂直居中：{padding：8px  0};
line-height默认行高bug
	解决方法：line-height设值
1. img于块元素中，底边多出空白
	不考虑IE6解决方案：img{vertical-align:middle;}
	IE6下解决方案：父级设置overflow: hidden; 或 img { display: block; } 或 _margin: -5px; 
1. IE6下，只支持给a标签添加伪类，并且支持，l-v-h-a这四个伪类
1. IE6怪异解析之padding与border算入宽高
	原因：未加文档声明造成非盒模型解析,可视宽=width,content=width-padding-border
	解决方法：加入文档声明<!doctype html>
1. IE6下的双边距BUG
	问题1.在IE6，块元素有浮动，有横向的margin，横向的margin值会被放大成两倍
	问题2.假如一行有多个li,margin-left一行的左侧第一个元素有双边距,margin-right 一行的右侧第一个元素有双边距
	问题3.IE6在块元素、左右浮动、设定marin时造成margin双倍（双边距）
	解决：display:inline;
1. 以下三种其实是同一种bug，其实也不算是个bug，举个例子：父标签高度20，子标签11，垂直居中，20-11=9，9要分给文字的上面与下面，怎么分？IE6就会与其它的不同，所以，尽量避免。 
	1）字体大小为奇数之边框高度少1px 
	解决方法：字体大小设置为偶数或line-height为偶数 
	2）line-height，文本垂直居中差1px 
	解决方法：padding-top代替line-height居中，或line-height加1或减1 
	3）与父标签的宽度的奇偶不同的居中造成1px的偏离 
	解决方法：如果父标签是奇数宽度，则子标签也用奇数宽度;如果是父标签偶数宽度，则子标签也用偶数宽度
1. 在IE6下，内部盒模型超出父级时，父级被撑大
	解决方法：父标签使用overflow:hidden
1. 在IE6下元素的高度小于19px，会被当做19px来处理
	解决办法:1.设置font-size;2.加overflow
1. 在IE6下块元素中有文字及右浮动的行元素，行元素换行 
	解决方法：将行元素置于块元素内的文字前
1. 在IE6下不支持1px的点线,解决办法:用背景平铺
1. 在IE6下,margin传递有问题,可以用haslayout解决,它是IE渲染引擎的一个内部组成部分,触发haslayout可以使元素根据自身内容的大小，来重新组织和计算自身的width和height
    *display:inline-block;*height:(任何值除了auto);*float:(left 或 right);*position:absolute;*width:(任何值除了auto);*zoom:(除normal外任意值);
1. 在IE6下两个浮动元素之间有注释或者内嵌元素，并且元素的宽度和父级相差小于3px，元素最后的一些文字会被复制3px空隙问题:当一个div浮动,另一个div用margin-left的方式,排到一排,会有3px的缝隙,
	解决方法:_position:relative; _left:-3px;
表格的内容可以撑开设置好的宽高,table-layout:fixed; 不让表格的内容撑开表格设定好宽高
在IE6,7下输入类型的表单控件,上下会有1px的空隙,解决办法:给元素加浮动
在IE6下，给输入类型的表单控件，加border:none无效,解决办法:1.border:0;2.重置控件背景;
在IE6,7下输入类型的表单控件, 输入文字的时候，背景图会跟着一块移动,解决办法,同上
左浮元素margin-bottom失效
	解决方法：显示设置高度 or 父标签设置_padding-bottom代替子标签的margin-bottom or 再放个标签让父标签浮动，子标签 margin- bottom，即(margin-bottom与float不同时作用于一个标签)
1. 定位：
	* 在IE6下，浮动元素和绝对定位元素是并列关系的话，绝对定位元素消失;
		解决方案：把绝对定位元素 用div包起来
	* 在IE6，7下，相对定位元素父级的overflow对相对定位元素本身不起效果,
		解决办法:给相对定位元素的父级也加相对定位
	* 在IE6绝对定位元素宽(高)是奇数的话，元素的right(bottom)有1px的偏差,IE6不支持固定定位,
		```css
		//解决方案:
		{position:fixed;left:50px;top:100px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop+100));}
		```
	* position下的left，bottom错位
		解决方法：为父级(relative层)设置宽高或添加*zoom:1
	* 子级中有设置position，则父级overflow失效
		解决方法：为父级设置position:relative

1. 条件注释兼容IE:
<!--[if IE 6]><link type="text/css" rel="stylesheet" media="screen" href="ie6.css"/><![endif]-->
<!--[if IE 7]><link type="text/css" rel="stylesheet" media="screen" href="ie7.css"/><![endif]-->
<!--[if IE 8]><link type="text/css" rel="stylesheet" media="screen" href="ie8.css"/><![endif]-->
1. 让IE8/9支持媒体查询，从而兼容栅格
	<!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
	<!--[if lt IE 9]>
	<script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
	<script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->
1. 如果大于IE8或者不是IE，那么使用最新jquery；如果是IE8及其以内的，使用jquery1.9.1版本
	html5,低版本不识别的问题,可以引用 html5shiv.min.js
	```html
	<!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
	<script src="https://cdn.bootcss.com/json2/20160511/json2.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
    <![endif]-->
	<!--[if gte IE 9|(!IE)]>
    <script src="https://cdn.bootcss.com/prefixfree/1.0.7/prefixfree.min.js"></script>
    <script src="https://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>
    <![endif]-->
	```
1. 把这段代码放到<head>里面，在IE8里面的页面解析起来就跟IE7一模一样的了，所以，基本上可以无视IE8，剩下的代码只需要这样写就可以了
	```html
	<metahttp-equivmetahttp-equiv="x-ua-compatible"content="IE=7"/> 	
	```
1. 兼容IE5/6/7
	height:63px;+height:62px;//只有IE5/6/7识别，其他浏览都不识别
方法:兼容IE6~IE8 "\9"
1. 兼容IE10/1E11
	```css
	@media all and (-ms-high-contrast:none)
    {
		.foo { color: green } /* IE10 */
		*::-ms-backdrop, .foo { color: red } /* IE11 */
    }
	```
1. 今天大拿直接一行代码把我之前的IE11兼容性问题全解决了。不服不行。小伙伴们下次遇到兼容性问题记得先加上这行代码试试:
	```css
	* {box-sizing: content-box;-moz-box-sizing: inherit;-webkit-box-sizing: inherit;}
	```
1. [使用@media实现IE hack的方法](http://blog.sina.com.cn/s/blog_6d208b470102v35u.html)
	```css
	//仅IE6和IE7识别：
	@media screen\9 {   
		.selector {  property: value; } 
	} 
	//仅IE6和IE7、IE8识别
	@media \0screen\,screen\9 {   
		.selector {  property: value; } 
	}
	//仅IE8识别：
	@media \0screen {   
		.selector {  property: value; } 
	}
	//仅IE8-10识别：
	@media screen\0 {   
		.selector {  property: value; } 
	}
	//仅IE9和IE10识别：
	@media screen and (min-width:0\0) {   
		.selector {  property: value; } 
	}
	//仅IE10识别：
	@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
		/* IE10-spe */　
	}
	//仅支持谷歌：
	@media screen and (-webkit-min-device-pixel-ratio:0) {
		.footer .layout-help { padding-bottom:357px; } 
	}　
	```