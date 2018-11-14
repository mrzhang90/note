##CSS HINT
1. 不要使用多个class选择元素，如a.foo.boo，这在ie6及以下不能正确解析
2. 移除空的css规则，如a{}
3. 正确的使用显示属性，如display:inline不要和width，height，float，margin,padding同时使用，display:inline-block不要和float同时使用等
4. 避免过多的浮动，当浮动次数超过十次时，会显示警告
5. 避免使用过多的字号，当字号声明超过十种时，显示警告
6. 避免使用过多web字体，当使用超过五次时，显示警告
7. 避免使用id作为样式选择器
8. 标题元素只定义一次
9. 使用width:100%时要小心
10. 属性值为0时不要写单位
11. 各浏览器专属的css属性要有规范，
例如.foo{-moz-border-radius:5px;border-radius:5px}
12. 避免使用看起来像正则表达式的css3选择器
13. 遵守盒模型规则
##CSS Reset
	reset.css 重置
	normalize.css 修复
	neat.css 融合-基于normalize
##移动端：
	html{box-sizing:border-box;}
	*,*:befor,*.after{box-sizing:inhert;}//继承html
##flex
	display: flex
		容器指定为Flex
	display: inline-flex;
		行内元素也可以使用 Flex 布局
	PS:设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效
	容器属性
		flex-direction
			排列方向
			参数：row | row-reverse | column | column-reverse
				row（默认值）：主轴为水平方向，居左水平排列。
				row-reverse：主轴为水平方向，倒叙。
				column：主轴为垂直方向，垂直排列。
				column-reverse：主轴为垂直方向，倒叙垂直排列
		flex-wrap
			如何换行
			参数：nowrap | wrap | wrap-reverse
				wrap-reverse：换行，第一行在下方。
		flex-flow
			flex-direction和flex-wrap的简写形式，默认值为row nowrap
			参数：<flex-direction> || <flex-wrap>
		justify-content
			水平排列方式
			参数：flex-start | flex-end | center | space-between | space-around;
				flex-start（默认值）：左对齐
				flex-end：右对齐
				center： 居中
				space-between：两端对齐，平均分布。
				space-around：居中、平均 的分布。
		align-items
			定义项目在交叉轴上如何对齐,stretch（默认值）
			参数：flex-start | flex-end | center | baseline | stretch
				flex-start：上对齐，交叉轴的起点对齐。
				flex-end：底部对齐，交叉轴的终点对齐。
				center：交叉轴的中点对齐。
				baseline: 项目的第一行文字的基线对齐。
				stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
					PS:stretch会拉伸，如果父标签高度过高，其孩子元素的高度就有多高，那么等高布局不用愁了
		align-content
			定义多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
			参数：align-content: flex-start | flex-end | center | space-between | space-around | stretch
				flex-start：与交叉轴的起点对齐。
				flex-end：与交叉轴的终点对齐。
				center：与交叉轴的中点对齐。
				space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
				space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
				stretch（默认值）：轴线占满整个交叉轴
	容器儿子的属性
		order
			数值越小，排列越靠前，默认为0
		flex-grow
			放大比例，默认为0
		flex-shrink
			缩小比例，默认为1
		flex-basis
			固定尺寸，浏览器根据这个属性，计算其他项目是否有多余空间
			参数：350px | auto(默认)
		flex
			flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
			参数：none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
			该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)
		align-self
			允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
			默认值为auto,继承父元素的align-items属性
			参数：auto | flex-start | flex-end | center | baseline | stretch;
			参数含义等同于align-items
	参考：http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?^%$
**Flexbox**
1. display: box;box-{*}
    2009年旧版本的Flexbox
1. display: flexbox;
    2011年的一个令人尴尬的中间阶段。
1. display: flex;和flex-{*}属性
    当前最新的Flexbox
##实用技巧:
1. CSS透视
	开启3D只针对子元素
    ```css
		-webkit-transform-style:preserve-3d;
		-webkit-perspective:300;//视点
		-webkit-perspective-origin:25% 75%;
    ```
1. 3D加速
	开启GPU加速，让2D动画在手机上的性能更好
    ```css
	.cube{
		-webkit-transform:translate3d(0,0,0);
		-moz-transform:translate3d(0,0,0);
		-ms-transform:translate3d(0,0,0);
		transform:translate3d(0,0,0);//用了3d,默认就会让盒子有个背面，这个背面也会相应的造成浏览器卡顿
		//所以如果是为了让2d加速，那么把背面设置hidden即可
		-webkit-backface-visibility:hidden;
		-moz-backface-visibility:hidden;
		-ms-backface-visibility:hidden;
		backface-visibility:hidden;
		-webkit-perspective:1000;
		-moz-perspective:1000;
		-ms-perspective:1000;
		perspective:1000;
	}
    ```
1. 解决在scale为0.5的情况下，p的字体被浏览器自动放大
```css
    width:100%;display:table;height:1px;
```
1. css计算top距离
```css
    top:-webkit-calc(100vh * 0.3873);top:calc(100vh * 0.3873);
```    
1. <base target="_blank" href="http://www.sina.com.cn" />
    定义页面上所有链接的打开方式 默认的链接地址
1. 去掉默认边框-解决输入框获取焦点后,显示的蓝色边框
```css
input,input:focus{ outline:none;}
/* 兼容火狐-- */
::-moz-focus-inner{border:0px;}
```
1. 元素浮动之后，父级如果可以设置固定高度，就给父级加固定高度.如果父级不能设置高度，就给父级清浮动
    ```css
        after{content:""; display:block;clear:both;}
    ```
1. 不设宽高居中:
    ```html
        <div id=”abc” style=”display:table;text-align:center;width:100%;height:100%;”>
        <span style=”background:#f00; display:table-cell; vertical-align:middle;”>
            <input type=”button” value=”item1″ />
        </span>
        </div>
    ```
1. 表格不被撑开:
    ```css
        table-layout: fixed; word-break: break-all;;border-collapse: collapse
    ```
1. 超出显示省略号
    ```css
        display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    ```
1. 多行超出省略号：（webkit浏览器）
    -webkit-line-clamp 用来限制在一个块元素显示的文本的行数。
    -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
    display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
    ```css
    width:200px;height: 32px;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;font-size: 14px
    ```
1. fixed高度100%，超出部分滚动条：
    ```css
    { top: 0;bottom:0;position:fixed;overflow-y:scroll;}
    ```
1. 垂直水平居中：（参考地址：http://www.cnblogs.com/zhangzhu/p/3958676.html）
    ```css
    div{display: table-cell;vertical-align:middle;*display: block; *font-size: 115px;*font-family:'arial';width:193px;height:129px;text-align:center;}
    div img{width:100%;vertical-align:middle;}
    ```
1. 定位居中：(css3技巧)
    ```css
    position: fixed; top: 50%; left: 0; width: 80px; height: auto; transform: translate3d(0,-50%,0);
    ```
1. img自适应 - 充满父元素
    第一种办法使用背景图，soeasy
    第二种办法-
    ```css
        .parent{
            position:relative;width:100px;height:100px;overflow:hidden;
        }
        .parent img{
            display: block;position: absolute;
            top: 50%;left: 50%;
            min-width: 100%;min-height: 100%;
            transform: translate(-50%,-50%);
        }
        @media \0screen\,screen\9 {
            .parent img{top: 0;left: 0;}
        }
    ```
1. 文字间距调整-居中有问题解决：
    ```css
    text-indent: 10px; letter-spacing: 10px;
    ```
1. select美化
    参考：http://ourjs.com/detail/551b9b0529c8d81960000007
    ```css
    #parent {
        background: url('http://ourjs.github.io/static/2015/arrow.png') right center no-repeat;
        width: 100px;
        height: 30px;
        overflow: hidden;
    }
    #parent select {
        /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
        border: solid 1px #000;

        /*很关键：将默认的select选择框样式清除*/
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;

        /*在选择框的最右侧中间显示小箭头图片*/
        background: url("http://ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center transparent;


        /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        padding-right: 14px;
    }
    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    select::-ms-expand { display: none; }
    ```
##table
    ```css
    border-collapse:collapse
        用于使用合并的边框来绘制表格
        table{
            border-collapse:collapse;
        }
        table,td{
            border:solid 1px #000;
        }
    ```
##font
    排版
        typo.css 、 Entry.css 、Type.css
    font-family: sans-serif;系统默认，字体多个单词组成加引号。
    宋体非宋体
        WIndows下的宋体叫中易宋体SimSun，Mac是华文宋体STSong
    黑体非黑体
        WIndows下的黑体叫中易黑体SimHei，Mac是华文黑体STHeiti。
    不要只写中文字体名，保证西文字体在中文字体前面
        Mac->Linux->Windows
    切忌不要直接使用设计师PSD的设计font-family,关键时刻再去启动font-face


##选择器:
    nth-child(odd) 与 :nth-child(even) -- (参数可以接受odd|even-偶数行|奇数行)
    p:first-child   相当于 p:nth-child(1) ;;; p:last-child 相当于 nth-last-child(1)
    p:first-of-type 相当于 p:nth-of-type(1);;;p:last-of-type 相当于 nth-last-of-type(1)
    .box:first-letter 找到元素中的第一个字符
    .box::first-line 找到元素中的第一行
    p[miaov] 找到p标签 并且必须具备 miaov这个属性
    p[miaov="leo"] 找到p标签 并且必须具备miaov属性 并且属性值必须是leo
    p[miaov~="pangzi"] 找到p标签 并且必须具备miaov属性 此属性值是一个词列表，并且以空格隔开，其中词列表中包含了一个value词，而且等号前面的“〜”不能不写
    E[attr^="value"]指定了属性名，并且有属性值，属性值是以value开头的
    E[attr$="value"]指定了属性名，并且有属性值，而且属性值是以value结束的
    E[attr*="value"]指定了属性名，并且有属性值，而且属值中包含了value
    E[attr|="value"]指定了属性名，并且属性值是value或者以“value-”开头的值（比如说zh-cn）
##CSS3
1. 3D变形函数
	rotateX、rotateY、rotateZ，旋转XYZ轴
	translateX、translateY、translateZ 在XYZ轴上移动
	scaleZ(sz) Z轴缩放
	matrix3d()函数则牵扯到线性代数、立体几何、三角学等的各种知识
##CSS:
1. a:l-v-h-a
    a标签在一行显示,不支持宽高,不继承父级的字体颜色,默认下划线;l-v-h-a===link{} 此链接未被访问过,:visited{} 此链接已访问,:hover{} 鼠标移入,:active{} 鼠标按下
1. box-sizing
    (盒模型解析模式 border-box 怪异盒模型 content-box 标准盒模型)
1. white-space:nowrap;overflow: hidden;
    强制不换行
1. letter-spacing
    字母间距
1. word-spacing
    单词间距
    normal  默认，即强制不换行。定义单词间的标准空间。
    length  定义单词间的固定空间。
    inherit 规定应该从父元素继承 word-spacing 属性的值。
1. cursor:url(img/iCur.cur),move;
1. vertical-align
    垂直对齐方式(top/middle/bottom),用在两个以上的内嵌，或者内嵌块元素之间的垂直方式的对齐,vertical-align可以消除inline-block元素下方的空隙
1. border
    (border-width border-style border-color);
    border-color不写，则默认使用color色
1. font
    font-weight font-style font-size/line-height font-family;属性说明:font-size 文字大小,chrome 下能接收的最小字体 12px,font-weight 加粗(bold加粗/normal正常),font-style 倾斜(italic倾斜/normal正常),文字在一行里上下居中的,宋体下 英文字符和数字 所占宽度是字体大小的一半
1. text
    1. text-overflow: 
    clip     修剪文本。
    ellipsis 显示省略符号来代表被修剪的文本
    string   使用给定的字符串来代表被修剪的文本。
    1. text-indent
    首行缩进 (em:1em = 1个文字大小)
    1. text-decoration
    文本修饰(underline下划线/overline 上划线/ine-through删除线/none)
1. dislay
    display:block(显示为块),
    inline(显示为内嵌),
    inline-block(内联块),
    none(隐藏),
1. overflow:溢出--hidden 溢出隐藏,auto  溢出时显示滚动条,scroll 滚动条,visible 溢出可见(默认值)
1. clear:(left/right/both/none)
    元素的某个方向上不能有浮动元素,clear样式,只能加给具有块属性的元素;
    br的clear属性(left/right/all/none)-元素的某个方向上不能有浮动元素
1. position
    1. position:relative
    1.相对于元素初始位置设置 left(right)/top(bottom)坐标;
    2.不脱离文档流(元素移走之后，原始位置会被空出来);
    3.提升层级;
    4.元素只加相对定位，不设置坐标偏移，元素本身不会有任何变化
    1. position:absolute
    1.脱离文档流;
    2.提升层级;
    3.根据有定位的父级，来计算坐标，父级没有定位的时候，根据document来计算;
    4.使内嵌元素支持宽高;
    5.不设置宽度的时候，宽度由内容撑开
    1. position:fixed;
    1.脱离文档流;2.提升层级;3.固定在可视区的某个位置上;4.不设置宽度，宽度由内容撑开;5.使内嵌元素支持宽高;6.在IE6下不支持固定定位
    1. position:static;
    静态定位 无定位(默认值),inherit 继承(IE6,7不支持)
    1. z-index层级,元素定位之后，后边的层级高于前边的;1.数值越大层级越高,2.层级在同级元素之间作比较
1. opacity:透明度0-1,元素透明，它里边所有的内容都会变成透明的,IE6,7,8透明度-filter:alpha(opacity=)  0-100
1. resize
    通过拖拽改变元素大小-horizontal水平方向;vertical垂直方向;both水平垂直;none;(resize必须配合overflow才会有效果)
1. inherit
    继承,IE6,7不支持;比如border:inherit;那么就会继承父级的border样式;
1. background
    1. background:background-color background-image background-repeat 1. background-position
    PS:一个backgrpund可以添加多张背景图，先写的在上边，后写的在下边
    PS:background: url(img/2.jpg) no-repeat 0 0 / 400px auto;说明:斜杠后的两个值是,background-size:宽 高;参数还可以选择:contain包含--等比放大,只要有一边撑满,另外一边可以空余,cover覆盖-等比放大,一边撑满区域,另外一边会超出
    1. background-clip:content-box;背景裁切,默认是border-box;border-box从边框区域显示背景;padding-box 从padding区域显示背景;content-box 从content区域显示背景
        background-clip: -webkit-text;
    1. background-attachment: fixed 背景图定位
##矩阵
在数学中，矩阵（Matrix）是一个按照长方阵列排列的复数或实数集合，最早来自于方程组的系数及常数所构成的方阵。
矩阵是高等代数学中的常见工具，也常见于统计分析等应用数学学科中。在物理学中，矩阵于电路学、力学、光学和量子物理中都有应用；计算机科学中，三维动画制作也需要用到矩阵。 矩阵的运算是数值分析领域的重要问题。
由m * n个数排成的m行n列的数表称为m行n列的矩阵，简称m*n矩阵。这m*n个数称为矩阵的元素，简称元

计算规则
矩阵第m行与第n列交叉位置的那个值，等于第一个矩阵第m行与第二个矩阵第n列，对应位置的每个值的乘积之和。线性代数是向量计算的基础，很多重要的数学模型都要用到向量计算。矩阵的本质就是线性方程式，两者是一一对应关系。如果从线性方程式的角度，理解矩阵乘法就毫无难度。

对于CSS属性来讲，默认的XY值为transform的中心点

matrix()和matrix3d()
前者是元素2D平面的移动变换(transform)，后者则是3D变换。2D变换为3*3的矩阵；3D变换则是4*4的矩阵

transform:matrix(a,b,c,d,e,f);
    无论是旋转拉伸缩放位移，本质上都是应用matrix()实现，只是类似transform:rotate这种便于理解,记忆与上手

transform:origin
    通过transform:origin属性进行设置的时候，矩阵相关计算也随之发生改变。实际图形效果上就是，旋转拉伸的中心点变了。
[matrix3d-可视化生成器](http://ds-overdesign.com/transform/matrix3d.html)
[matrix-可视化生成器](http://meyerweb.com/eric/tools/matrix/)
[matrix-可视化生成器](www.f2e.name/case/css3/tools.html)  
[matrix3d工程化-自动把transform动画转成matrix](https://github.com/Zhangdroid/CSS-Matrix3d)
##BFC
(Block Formatting Contexts)块级格式化上下文
BFC的布局环境，会使元素，在页面中变成一个独立的布局容器，容器中的布局不会影响到容器外的布局,容器外的布局同样不会影响容器内的布局。
1. 阻止margin传递,
2. 不被浮动元素覆盖,
3. 包含浮动元素(清浮动)

触发BFC的条件：
1. float(值不为none的float。);
1. overflow (值不为visible的overflow。);
1. display (值为table-cell、table-caption、inline-block中的任何一个。）;
1. position (值不为relative和static的position)   

Box: CSS布局的基本单位
Box 是 CSS 布局的对象和基本单位， 直观点来说，就是一个页面是由很多个 Box 组成的。元素的类型和 display 属性，决定了这个 Box 的类型。 不同类型的 Box， 会参与不同的 Formatting Context（一个决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染。
让我们看看有哪些盒子：
    **block-level**
        box:display 属性为 block, list-item, table 的元素，会生成 block-level box。并且参与 block fomatting context；
    **inline-level**
        box:display 属性为 inline, inline-block, inline-table 的元素，会生成 inline-level box。并且参与 inline formatting context；
    **Formatting**
        context 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。
        最常见的 Formatting context 有：
            **Block fomatting context (简称BFC)
            Inline formatting context (简称IFC)**
**哪些元素会生成BFC?**
    根元素
    float属性不为none
    position为absolute或fixed
    display为inline-block, table-cell, table-caption, flex, inline-flex
    overflow不为visible
**BFC规则**
    BFC的区域不会与float box重叠
    同一个BFC的两个相邻的margin会发生重叠
总结：
    **BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此**
##IFC
IFC(Inline Formatting Contexts)直译为"内联格式化上下文"，IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)
## FFC
FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"，display值为flex或者inline-flex的元素将会生成自适应容器（flex container）
##GFC
GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"，当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间

**document**
html 的父级是 document,document的高度和可视区的高度一致
块:
1. 独占一行;
2. 支持所有的样式;
3. 不设置宽度，宽度撑满父级的宽度

内嵌：
1. 在一行显示  ;
2. 不支持宽高,不支持上下margin,对上下的padding支持的也有问题;
3. 宽度由内容撑开;
4. 换行会被解析出一个空格(通过字体和字体大小控制)

内联块(inline-block):
1. 在一行显示,
2. 支持宽高,
3. 换行会被解析出一个空格,
4. 不设置宽度宽度有内容撑开

float;
1. 在一行显示;
2. 支持所有的样式;
3. 在不设置宽度的时候,宽度有内容撑开;
4. 元素浮动之后，margin不叠加;
5. 脱离文档流(元素不占位置了);按照指定方向去移动,直到碰到了父级的边界,或者碰到了上一个浮动元素停止

**块标签**:div,p,h1-h6,section,header,footer,nav,ul,ol,li,dl,dt,dd
**内嵌标签**: a,span,time,strong,em--em和strong都有强调的作用
**div不设置宽度 宽度会跟随父级走;div不设置高度 高度会被内容撑开**
**在IE下,a标签抱img,img会有边框**
**inline-block:代码换行有空格,建议清掉空格用margin来控制距离;**
**选择器的优先级一致的情况下,后边的样式覆盖前边**
**form**
    form块,
    input内联块,
    label内嵌,
    select内联块,
    option 块,
    textarea 内联块
    disabled禁用;
    maxlength 最大输入长度;
    checked 单选或者复选的默认选中;
    selected 下拉菜单默认选中项;
    for="idName" label的for属性 里边写的label要辅助的input的id;
    thead、tbody、tr 没有padding和margin这两个属性;
    th,td 没有margin这个属性;
    border-spacing 单元格间距;
    border-collapse 边框合并(collapse合并/separate 不合并);
    table{border-collapse:collapse;};
    td,th{padding:0;}
    单元格设置宽度，一竖列宽度都会变;单元格设置高度，一横行高度都会变;单元格中的内容默认垂直对齐 ( vertical-align 在单元格 用来设置单元格的内容垂直方向的对齐方式)   
##盒模型:
padding:内边距(内填充),元素和它的内容之间距离,padding区域也会显示元素的背景(background-position的00点 从元素padding的左上角开始),
content=width||height;
可视宽高=content+padding+border;
margin:外边距,(margin用在两个元素之间的距离),margin的距离产生在元素的边框以外,margin的区域不显示元素的背景,margin传递-子元素的上下margin会传递给父级,同级元素的上下margin是叠加在一起的
margin-left:auto; 元素居右
padding-用在元素和内容之间,margin-用在两个同级元素之间的距离,同级元素之间的距离用margin,父子级之间的距离用padding
##OOCSS
**[参考]http://oocss.org**
1. 不要直接定义子节点，应把共性声明放到父类。
    ```css
    .mod .inner{}  //.mod下面的inner
    .inner{}       //不建议
    ```
2. 结构和皮肤相分离。
    ```html
    <div class=“container simpleExt”></div>   //html 结构
    .container {……}    //控制结构的class
    .simpleExt{……}      //控制皮肤的class
    ```
3. 容器和内容相分离。
    ```html
    <div class=“container”><ul><li>排行</li></ul></div>   //html 结构
    .container ul{……}    //ul依赖了容器
    <div class=“container”><ul class=“rankList ”><li>排行</li></ul></div>   
    .rankList ul{……}    //解除与容器的依赖，可以从一个容器转移到其他容器
    ```
4. 抽象出可重用的元素，建好组件库，在组件库内寻找可用的元素组装页面。
5. 往你想要扩展的对象本身增加class而不是他的父节点。
6. 对象应保持独立性。
    ```html
    <div class=“container”><div class=“mod”></div></div>   //html 结构
    .container {……} .container .mod{……} //控制结构的class
    <div class=“container mod”></div>//这种方案最佳，只要保证container和mod两个的独立性就好了
    ```
7. 避免使用ID选择器，权重太高，无法重用。
8. 避免位置相关的样式。
    ```css
    #header .container {……}, #footer .container{……} //头和尾都写了container容器
    .container{}//最佳方式是把container容器提炼出来

    header h1 {……}, #footer h1 {……} //头和尾都用了h1，这里就不好直接提炼h1出来
    h1.h1{}    h2.h2{}   <h1 class=“h1”></h1>//可以这样用，在h1标签定义h1的类名，然后h1.h1、h1.h2依次类推
    ```
9. 保证选择器相同的权重。
10. 类名 简短 清晰 语义化 OOCSS的名字并不影响HTML语义化。
##CSS分层
学习方向：
1.css next
2.bem + acss

1. SMACSS-https://smacss.com/
	SMACSS像OOCSS一样以减少重复样式为基础。然而SMACSS使用一套五个层次来划分CSS给项目带来更结构化的方法
	Base -设定标签元素的预设值  PS:html {} input[type=text] {}
	Layout -整个网站的「大架构」的外观  PS:#header { margin: 30px 0; }
	Module -应用在不同页面公共模块 PS:.button{}
	State -定义元素不同的状态 PS:.nav--main {  .active {} }
	Theme - 画面上所有「主视觉」的定义 PS: border-color、background-image
	修饰符使用的是--，子模块使用__符号。
	例:
    ```html
        <div class="container">
   		<div class="container-header">
	   		<div class="container-header__title">
		   		<div class="container-header__title--home">
    ```
1. BEM-推荐-https://en.bem.info/
	BEM和SMACCS非常类似，主要用来如何给项目命名。比如选项卡导航是一个块(Block)，这个块里的元素的是其中标签之一(Element)，而当前选项卡是一个修饰状态(Modifier)
	block -代表了更高级别的抽象或组件
	block__element -代表.block的后代，用于形成一个完整的.block的整体。
	.block--modifier -代表.block的不同状态或不同版本。
	修饰符使用的是_，子模块使用__符号。(不用一个-的原因是CSS单词连接)
	例:
    ```html
        <ul class="menu">
            <li class="menu__item"></li>
            <li class="menu__item_state_current"></li>
            <li class="menu__item"></li>
    ```
1. SUIT-https://suitcss.github.io/
	Suit起源于BEM，但是它对组件名使用驼峰式和连字号把组件从他们的修饰和子孙后代中区分出来:
		修饰符使用的是—，子模块使用__符号。(不用一个-的原因是CSS单词连接)
	例:
    ```css
		.ProductDetails {}
		.ProductDetails-price {}
		.ProductDetails-title--sale {}
    ```
	如果你不想使用如此严格或者复杂的命名规则，给每一个选择器加前缀同样可以达到这样的效果。
	例:
    ```css
		.s-product-details {}
		.t-product-details {}
		.js-product-details {}
    ```
	结构属性将会被应用到s-product-details选择器中。主题属性将应用于t-product-details选择器。
1. ACSS-http://patternlab.io/
	考虑如何设计一个系统的接口。
		原子(Atoms)是创建一个区块的最基本的特质，比如说表单按钮。
		分子(Molecules)是很多个原子(Atoms)的组合，比如说一个表单中包括了一个标签，输入框和按钮。
		生物(Organisms)是众多分子(Molecules)的组合物，比如一个网站的顶部区域，他包括了网站的标题、导航等。
		而模板(Templates)又是众多生物(Organisms)的结合体。比如一个网站页面的布局。而最后的页面就是特殊的模板。
		atoms -> molecules -> organisms -> templates -> pages
1. ITCSS-http://csswizardry.net/talks/2014/11/itcss-dafed.pdf
	```
    Settings — 全局可用配置，设置开关。$color-ui: #BADA55; $spacing-unit:10px
	Tools —通用工具函数。@mixin font-color() {font-color: $color-ui;}
	Generic — 通用基础样式。Normalize, resets, box-sizing: border-box;
	Base — 未归类的HTML元素。ul {list-style: square outside;}
	Objects —设计部分开始使用专用类。.ui-list__item {padding: $spacing-unit;}
	Components — 设计符合你们的组件。.products-list {@include font-brand();border-top: 1px solid $color-ui;}
	Trumps —重写，只影响一块的DOM。(通常带上我们的!important)
    ```