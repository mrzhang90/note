##兼容写法
```css
 background-size兼容写法：
    /*Mozilla*/ 
    -moz-background-size: auto(原始图片大小) || number(数值) || percentage(百分比) || cover(放大铺满) || contain(缩小铺满) 
    /*Webkit*/ 
    -webkit-background-size: auto(原始图片大小) || number(数值) || percentage(百分比) || cover(放大铺满) || contain(缩小铺满) 
    /*Oprea*/ 
    -o-background-size: auto(原始图片大小) || number(数值) || percentage(百分比) || cover(放大铺满) || contain(缩小铺满) 
    /*W3c标准*/ 
    background-size: auto(原始图片大小) || number(数值) || percentage(百分比) || cover(放大铺满) || contain(缩小铺满)

background-color兼容写法：
    background: #d8d8d8;
    background: -webkit-gradient(linear, left top, left bottom, from(#fcfcfc), to(#d8d8d8));
    background: -moz-linear-gradient(top,  #fcfcfc,  #d8d8d8);
    filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#fcfcfc', endColorstr='#d8d8d8');

transform在不同浏览器内核下的书写规则:
    -moz-transform: rotate | scale | skew | translate ;//Mozilla内核浏览器：firefox3.5+
    -webkit-transform: rotate | scale | skew | translate ;//Webkit内核浏览器：Safari and Chrome
    -o-transform: rotate | scale | skew | translate ;//Opera
    -ms-transform: rotate | scale | skew | translate ;//IE9
    transform: rotate | scale | skew | translate ;//W3C标准
transform-origin:
    -moz-transform-origin: x y;//Mozilla内核浏览器：firefox3.5+
    -webkit-transform-origin: x y;//Webkit内核浏览器：Safari and Chrome
    -o-transform-origin: x y ;//Opera
    -ms-transform-origin: x y;//IE9
    transform-origin: x y ;//W3C标准
transition:
    -moz-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
    -webkit-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
    -o-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
    transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
@keyframes 规则
    @keyframes mymove{from {top:0px;}to {top:200px;}}
    @-moz-keyframes mymove /* Firefox */{}
    @-webkit-keyframes mymove /* Safari 和 Chrome */
    @-o-keyframes mymove {}/* Opera */
animation规则:
    animation: myfirst 5s linear 2s infinite alternate;
    -moz-animation: myfirst 5s linear 2s infinite alternate;/* Firefox: */
    -webkit-animation: myfirst 5s linear 2s infinite alternate;/* Safari 和 Chrome: */
    -o-animation: myfirst 5s linear 2s infinite alternate;/* Opera: */
```
##移动端：
	html{box-sizing:border-box;}
	*,*:befor,*.after{box-sizing:inhert;}//继承html
##实用技巧:
1. link
    * preload
        提前加载资源,在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载
        as 属性的作用是告诉浏览器被加载的是什么类型的资源
        这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能
        <link rel="preload" href="style.css" as="style">
        <link rel="preload" href="main.js" as="script">
    * prefetch
        预先加载,所有资源都加载完后，开始预加载这里指定的资源，有最低的优先级
        利用浏览器的空闲时间去先下载指定的内容,然后缓存起来
1. image-set根据屏幕分辨率和网速决定使用1倍图还是2倍图
    ```css
    background-image:url(/1x.png);
    background-image:-webkit-image-set(url(/1x.png) 1x,url(/2x.png) 2x);
    ```
1. a:any-link{color:red}
    上边的那些a没有写到的选择器，都适用于这一条规则
1. iphone兼容：
	[input输入框placeholder垂直不居中](http://www.cnblogs.com/xiaoxiao2014/p/5009599.html)
		不要input的line-height，即：line-height:nomrmal
1. 解决运动的圆不够圆的问题
    ```css
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    //不需要宽高
    // .px2rem(width, 8);
    // .px2rem(height, 8);
    background-color: #D34612;
    border:solid #D34612;
    //设置border宽度代替宽高
    .px2rem(border-width, 5);
    border-radius: 50%;
    //上下居中，并且利用GPU加速，提高性能
    transform:translate3d(-50%,-50%,0)
    ```
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
        //用了3d,默认就会让盒子有个背面，这个背面也会相应的造成浏览器卡顿
		transform:translate3d(0,0,0);
		//所以如果是为了让2d加速，那么把背面设置hidden即可
		backface-visibility:hidden;
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
1. 隐藏滚动条
    ```css
    .div::-webkit-scrollbar{
        display: none;
    }
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
1. 子元素的margin-top溢出
	在给没有margin-top-border父元素中的子元素添加margin-top时，发现没有直接表现出来，而是作用到父元素身上，就会导致子元素的margin-top溢出
	条件：1、父元素没有上边框；2、为第一个子元素设置上外边距时
	解决方案：
		1、为父元素增加上边框，但父元素会变高；
		2.通过为父元素设置上内边距来取代子元素的上外边距，但也会增加父元素的高度；
		3.在父元素中，增加一个空 <table>元素
			//给父元素设置：before
			#content:before{    
				content: "";    
				display: table;    
	        }
1. 清浮动完整版：
	```css
	.clearFix{zoom:1;}.clearFix:after{content:"";display:block;clear:both;}
	```
1. table
    ```css
    //border-collapse:collapse -- 用于使用合并的边框来绘制表格
    table{
        border-collapse:collapse;
    }
    table,td{
        border:solid 1px #000;
    }
    ```
##flex
    固定宽度
    ```css
        //方案1
        flex:0 0 60px;
        //相当于
        flex-basis:60px;
        //方案2
        //需要固定的元素
        width:65px;
        flex-shrink:0;
    ```
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
    3D变形函数
        rotateX、rotateY、rotateZ，旋转XYZ轴
        translateX、translateY、translateZ 在XYZ轴上移动
        scaleZ(sz) Z轴缩放
        matrix3d()函数则牵扯到线性代数、立体几何、三角学等的各种知识
    文本默认提示文字样式：
        :-moz-placeholder{color:#21a8e2}
        :-ms-input-placeholder{color:#21a8e2}
        ::-webkit-input-placeholder{color:#21a8e2}
    pointer-events:none
        特性是让元素不可点击，具有穿透性。顾名思意，就是鼠标事件拜拜的意思。元素应用了该CSS属性，链接啊，点击啊什么的都变成了“浮云牌酱油”。
    touch-acion: 规定用户能否以及如何操作页面上的指定区域; 当手指在屏幕上滑动时(MSPointerMove)连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以触发默认的手势操作：阻止页面滚动
        PS：这是IE11的属性，在IE10应使用-ms-touch-action，IE10之前的浏览器不支持
        auto默认值，允许浏览器给元素添加touch行为;
        none,不允许默认的touch行为;
        pan-x 允许水平轴触摸驱动的平移;
        pan-y 允许垂直轴触摸驱动的平移;
        pinch-zoom 允许拖拽缩放 ;
        manipulation 允许触摸驱动的平移和拖拽缩放;
        double-tap-zoom 允许整个页面双击缩放指定元素;
        inherit 继承父元素的值
    -webkit-user-select:用来指定文本的可选择性,需要加各自的前缀,
        参数:none-不允许用户选中文字
            auto——默认值，用户可以选中元素中的内容
            text——用户可以选择元素中的文本
            element——文本可选，但仅限元素的边界内(只有IE和FF支持)
            all——在编辑器内，如果双击或上下文点击发生在子元素上，该值的最高级祖先元素将被选中。
    -webkit-text-size-adjust: none;
        允许字体小于12
    -webkit-tap-highlight-color: rgba(0,0,0,0);
        点击链接高亮，覆盖颜色
    -webkit-appearance: none;
        改变按钮外观
    :after，:before{content:".";background:red;}
        给元素的内容的末尾添加东西，并且可以给加进去的东西加样式
        任何一个HTML元素都可以创造3个可以供我们操作的视觉元素，即三个矩形
    flex
        flex number
            宽度=弹性宽度 * (flex-grow/sum(flex-grows))
    border-radius-造就万千可能
        圆角(半径|x半径/y半径);x轴是从左往右改变px,y轴是从上往下改变;
        border-top-left-radius,border-top-right-radius,border-bottom-right-radiusborder-bottom-left-radius;border-radius:10px(四个角);border-radius:10px(左上，右下) 30px(右上、左下);border-radius:10px(左上) 30px(右上、左下)  50px(右下);
        border-radius:10px(左上) 30px(右上)  50px(右下) 70px(左下);
        PS: border-radius: 100px / 50px; 中有一个“/” 这个符号是很少出现在css样式中的。因为，圆角有水平方向也有垂直方向，所以"/"前面代表水平方向，后面代表垂直方向。
    box-shadow
        阴影;inset (可选参数) x偏移 y偏移 blur模糊半径 扩展半径(可选参数) color 颜色;阴影可以有多层，每层阴影中间以“,”隔开，先写的在上边有写的在下边;PS:扩展的边框阴影不占位置
        box-shadow是可以定义为任意颜色的，并且同一个元素可以投射出不同的box-shadow
    渐变:线性渐变
        linear-gradient(90deg, red 0, red 20px, #EEE 20px,#EEE 40px, red 40px, red 60px, #EEE 60px) repeating-linear-gradient(90deg, red 0, red 20px, #EEE 20px,#EEE 40px);
    径向渐变:
        背景基点设置-radial-gradient(circle, red 10%, blue 50%);ellipse、circle background-origin: content-box;
        例如:background: -webkit-radial-gradient(left top,100px 80px, red 10%, blue 100%);
            background: -ms-radial-gradient(left top,100px 80px, red 10%, blue 100%);
            background: -moz-radial-gradient(left top,farthest-corner, red 10%, blue 100%);
        1.要设置起点，必须需要加前缀,2.火狐的私有设置中，大小只支持关键字,关键字（最近端，最近角，最远端，最远角，包含或覆盖 (closest-side, closest-corner, farthest-side, farthest-corner, contain or cover)）
    animation
        应用在页面上已存在的DOM元素上;执行动画时,最后出现的权根是最大的;当动画结束后，样式回到默认效果;我们可以同时附几个animation给一个元素，我们只需要用逗号“，”隔开
        animation:move 2s 1s infinite cubic-bezier(0.825, -0.590, 0.320, 1.495);PS:在关键帧中没有 起始位置 或者 结束位置，默认会以元素的初始位置为准
        共六个属性:
        animation-name//动画属性名,其主要有两个值：IDENT是由Keyframes创建的动画名，none为默认值，当值为none时，将没有任何动画效果。
        animation-duration//动画持续时间,取值:<time>为数值，单位为s （秒.）其默认值为“0”
        animation-timing-function//动画频率,动画的播放方式,六种变换方式:linear匀速;ease逐渐变慢(默认值);ease-in加速;ease-out减速;ease-in-out先加速再减速;animation-delay延迟时间;cubic-bezier(n,n,n,n) 贝塞尔曲线;https://matthewlein.com/ceaser/
        animation-delay//动画延迟时间,取值为<time>为数值，单位为s(秒)，其默认值也是0
        animation-iteration-count//定义循环次数，其可以取值<number>为数字，其默认值为“1”；infinite为无限次数循环
        animation-direction//指定元素动画播放的方向，其只有两个值，默认值为normal，如果设置为normal时，动画的每次循环都是向前播放；另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放
        animation-play-state:paused; 控制元素动画的播放状态。其主要有两个值，running和paused其中running为默认值。paused暂停，running重新播放,这个属性目前很少内核支持
        animation-fill-mode:forwards;
            backwards 动画执行之前，位置停留在第一帧;forwards  动画执行之后，位置停留在最后一帧;both 动画执行之前，位置停留在第一帧,动画执行之后，位置停留在最后一帧
    transition
        允许css的属性值在一定的时间区间内平滑地过渡。这种效果可以在鼠标单击、获得焦点、被点击或对元素任何改变中触发，并圆滑地以动画效果改变CSS的属性值。
        特性:在移动端用transform记得加前缀;transform 不脱离文档流;transform 的层级比普通元素高，但是比定位元素低;transform 移走之后，原始位置一样会被保留;transform 不会影响元素的占位大小
        语法:transition: <transition-property> <transition-duration> <transition-timing-function> <transition-delay>,如果实现两个或者多个css属性的transition效果，那么我们只要把几个transition的声明串在一起，用逗号（“，”）隔开
        属性值：执行变换的属性：transition-property变换延续的时间：transition-duration在延续时间段，变换的速率变化,transition-timing-function运动形式,transition-delay延迟时间。
            transition-property:是用来指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；indent（某一个属性值）,其对应如下:
                1、color: 通过红、绿、蓝和透明度组件变换（每个数值处理）如：background-color,border-color,color,outline-color等css属性；
                2、length: 真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,padding,outline-width,margin,min-width,min-height,max-width,max-height,line-height,height,border-width,border-spacing,background-position等属性；
                3、percentage:真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,min-width,min-height,max-width,max-height,line-height,height,background-position等属性；
                4、integer离散步骤（整个数字），在真实的数字空间，以及使用floor()转换为整数时发生 如：outline-offset,z-index等属性；
                5、number真实的（浮点型）数值，如：zoom,opacity,font-weight,等属性；
                6、transform list:详情请参阅：《CSS3 Transform》
                7、rectangle:通过x, y, width 和 height（转为数值）变换，如：crop
                8、visibility: 离散步骤，在0到1数字范围之内，0表示“隐藏”，1表示完全“显示”,如：visibility
                9、shadow: 作用于color, x, y 和 blur（模糊）属性,如：text-shadow
                10、gradient: 通过每次停止时的位置和颜色进行变化。它们必须有相同的类型（放射状的或是线性的）和相同的停止数值以便执行动画,如：background-image
                11、paint server (SVG): 只支持下面的情况：从gradient到gradient以及color到color，然后工作与上面类似
                12、space-separated list of above:如果列表有相同的项目数值，则列表每一项按照上面的规则进行变化，否则无变化
                13、a shorthand property: 如果缩写的所有部分都可以实现动画，则会像所有单个属性变化一样变化
            transition-duration:用来指定元素,转换过程的持续时间，取值：<time>为数值，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的。
            transition-delay延迟时间,其使用和transition-duration极其相似
            transition-timing-function:1、ease：（逐渐变慢）默认值，2、linear：（匀速），3、ease-in：(加速)，4、ease-out：（减速），5、ease-in-out：（加速然后减速），6、cubic-bezier：初始默认值为default,特定的cubic-bezier曲线。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效。
    transform:含义是属性向元素应用 2D 或 3D 转换。字面上就是变形，改变的意思
        示例:transform: rotate(45deg) scale(0.8,1.2) skew(60deg,-30deg);PS:使用多个属性值时，其之间不能用逗号（“，”）分隔，必须使用空格分隔
        属性:旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。分别还有x、y之分，比如：rotatex() 和 rotatey() ，以此类推。
    transform:rotate(<angle>)：通过指定的角度参数对原元素指定一个2D rotation（2D 旋转），
        需先有transform-origin属性的定义,transform-origin定义的是旋转的基点，其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。
    transform:skew(x,y)
        使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）,同样是以元素中心为基点，我们也可以通过transform-origin来改变元素的基点位置。
    transform:scale()
        比例；“1.5”表示以1.5的比例放大，如果要放大2倍，须写成“2.0”，缩小则为负“-”。
    transform:translate(x,y)
        水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）；translateX(x)仅水平方向移动（X轴移动）；translateY(Y)仅垂直方向移动（Y轴移动）.同样其基点是元素中心点，也可以根据transform-origin改变基点位置
        transform:matrix(<number>, <number>, <number>, <number>, <number>, <number>) ：矩阵,以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素
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
