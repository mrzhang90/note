**断言**
```js
function assert(expression,errorMessage){
    if(!!expression === false){
        throw new Error(errorMessage)
    }
}
```
**ajax中断请求 - jquery中断ajax（取消/abort）**
```js
//如果一个ajax请求过长，你可能会有取消之前发起的一次请求的需要
var r=true,nextClick=false;
if(nextClick){
    nextClick=false
    if(r&&r.readystate!=4){
        r.abort();
    }
}
r=ajax({
    url: 'update.json',
    complete:function(){r=null;},//请求成功后，把ajax返回值设为Null
    data: $("#form").serializeObject(),
    callback: function (result) {

    }
});
nextClick=true;
```
**图片加载失败，显示默认图片**
```js
$('img').each(function(){
    this.onerror=function(){
        console.log(this)
        $(this).hide().after('<div class="imgDiv"></div>');
        this.onerror=null;
    }
})
```
```css
.right_car li .imgDiv{
    width: 120px; height: 93px;background: url(../img/logo.jpg) center center no-repeat; background-size: 50% auto;
    display:inline-block; *zoom:1; *display: inline;vertical-align: middle;
    -ms-behavior: url(css/backgroundsize.min.htc);behavior: url(css/backgroundsize.min.htc);
}
```
**定位扎点-小图标依次展示(公元创译-发展历程)**
```js
function recursionAnimate(element){
    setStyle(0);
    function setStyle(index){
        var position=element.eq(index).position();
        if(index==element.length-1){
            return;
        }
        element.eq(index).css({top:position.top-80}).animate({opacity:1,top:position.top},{ duration: 200, complete: function() {
            setStyle(++index);
        }});
    }
}
```
**cookie记录滚动位置，解决回退或链接返回页面时，到达指定位置(申博列表页)**
```js
//条件：ajax渲染列表时需要此方法
//思路：
//    1.ajax渲染之后再根据cookie跳转页面
//    2.isScroll是为了首次执行render不执行scroll
//    3.滚动页面记录cookie
render(function(){
    var cookie=getCookie('scrollTop');
    if(cookie){
        $('body,html').scrollTop(cookie);
    }
});
var isScroll=false;
$(window).on('scroll', function () {
    if(!isScroll){
        isScroll=true;
        return;
    }
    setCookie('scrollTop',top,1)
})
```
**.表格头固定-transform**
```js
    //table绑定滚动事件，滚动时thead始终居于顶部
    $('.table').on('scroll', function () {
        $(this).children('thead').css('transform','translateY('+this.scrollTop+'px)');
    })
    //来源-http://blog.csdn.net/weixiangzhe/article/details/59108514
```
**.查找addEventListener绑定事件队列**
```js
    //解决团队内，多个人往一个元素上绑一样的事件，互相影响
    //利用proxy代理的方式，给绑定事件基础上做一些额外的事情，还有一种思路是aop切面编程(after、befor)
    /**
     * @fileoverview 查找addEventListener绑定事件队列
     * @author yuanzhijia@yidengxuetang.com
     * @date 2017/10/15
     */
    ((w)=>{
        w.listenerList = new Set();//set有一个作用是去重
        const handler = {//获执行的addEventListener
            apply: (target, thisBinding, args) =>{//target是代理的谁;this;参数
                listenerList.add(args[0]);//因为Set有去重的特点，所以这里直接add添加，有重复的就去了
                //Reflect.apply(_cache,w,args);//反射-w是this
                //需要返回参数可打开
                //return args[0];
            }
        };
        const _cache = w.addEventListener;
        //代理，走的addEventListener是代理的方法，因为addEventListener是引用类型，如果直接在addEventListener上写方法，那就循环引用了
        w.addEventListener = new Proxy((event,fn)=>{
            Reflect.apply(_cache,w,arguments);
        }, handler);//参数1.回调;参数2.要截获执行的addEventListener的事件
    })(window);

    //📒具体业务无需Care
    //window.addEventListener('resize',function(){console.log(1111);});
    //window.addEventListener('a',function(){});
    //for(const val of listenerList){
    //✏️打印所有addEventListener事件队列
    //    console.log(val);
    //}
```
**.Ajax请求默认的都是异步的，如果想同步 async设置为false,然后**
```js
    var html = $.ajax({
      url: "some.php",
      async: false
    }).responseText; 

    //或者在全局设置Ajax属性
    $.ajaxSetup({
      async: false
      });
    //再用post，get就是同步的了
```
**.传递多组参数(data传递利用上面的file_post方法):**
```js
    //传递多组数组给后端，后端要支持接受字符串数组
    var data=new FormData();
    $('input['type=checkbox']').each(function(){
        data.append('campusId',$(this).attr('data-campusId'))
        data.append('detailId',$(this).attr('data-detailId'))
    })
```
**.调用cookie:来源-https://my.oschina.net/crazymus/blog/425650**
```js
    //设置cookie，有效期为365天
    setCookie('username','123',365);
    //取回，若cookie失效，将返回空
    getCookie('username');
    //设置cookie
    function setCookie(c_name,value,expiredays)
    {
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    }
 
    //取回cookie
    function getCookie(c_name)
    {
        if (document.cookie.length>0)
        {
            c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
        { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
            } 
        }
        return ""
    }    
```
**.加载XML**
```js
    loadXML = function(xmlString){
            var xmlDoc=null;
            //判断浏览器的类型
            //支持IE浏览器 
            if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
                var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
                for(var i=0;i<xmlDomVersions.length;i++){
                    try{
                        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                        break;
                    }catch(e){
                    }
                }
            }
            //支持Mozilla浏览器
            else if(window.DOMParser && document.implementation && document.implementation.createDocument){
                try{
                    /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                     * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                     * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                     * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                     */
                    domParser = new  DOMParser();
                    xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
                }catch(e){
                }
            }
            else{
                return null;
            }

            return xmlDoc;
    }
```
**.判断数组中是否存在值**
```js
    intNum.contains(arr)
    Array.prototype.contains = function ( needle ) {
      for (i in this) {
        if (this[i] == needle) return true;
      }
      return false;
    }
```
**.PC页面自适应手机-思路是给body加一个固定的可以把内容完全展示的宽度，这样利用浏览器有等比例缩放页面的特性**
```js
    var width='1300';
    if($(document.body).width()<1180){
        $('body').css("width",width);
        // $(".phoneWidth").css("width",width);
    }
```
**[HTML5 实现手机拍照上传](https://my.oschina.net/zyxchuxin/blog/700381)**
```
上传图片有原生的方法<input type="file" accept="image/*">，如果只想要拍照上传，不希望用户选择图片上传，可以通过添加capture属性，该属性值有camcorder/microphone/camera...，此处选择camera。PS：该属性存在浏览器兼容性问题，不是所有的浏览器都支持。
```
```html
<input type="file" accept="image/*" capture="camera" >
```
```js
    if(typeof FileReader == 'undefined'){
        $('#xdaTanFileImg').setAttribute("disabled","disabled");  
    }
    $('#xdaTanFileImg').on('change',function(){
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function (e) {
            //调用图片压缩方法：compress();
            var fileSize = (this.files[0].size/1024/1024).toFixed(2);
            // console.log(this.files[0]);
            // console.log(this.files[0].size);
            // console.log(fileSize);
            // console.log(this.result)
            compress(this.result,fileSize,function(dataUrl){
                var data = new FormData();
                data.append('uploadFile', dataUrl);
                file_post('/img/userphoto/uploadImg.do',data,'',function(data){
                  data=JSON.parse(data);
                  data=JSON.parse(data);
                  imgUrl=data.url;
                  saveImage(imgUrl,function(){
                    // $('#photoUrl').attr('src',imgUrl)
                    // $('#photoUrl').css('background-image','url("'+imgUrl+'")')
                    imgCenter($('#photoUrl'),dataUrl)
                  })
                });
            })
        };
    })
    function compress(res,fileSize,callback) { //res代表上传的图片，fileSize大小图片的大小
        var img = new Image(),
            maxW = 640; //设置最大宽度

        img.onload = function () {
            //对上传的图片进行压缩，需要借助于canvas API
            var cvs = document.createElement( 'canvas'),
                ctx = cvs.getContext( '2d');
            //设置压缩后的最大宽度 or 高度
            if(img.width > maxW) {
                img.height *= maxW / img.width;
                img.width = maxW;
            }

            cvs.width = img.width;
            cvs.height = img.height;

            ctx.clearRect(0, 0, cvs.width, cvs.height);
            ctx.drawImage(img, 0, 0, img.width, img.height);

            var compressRate = getCompressRate(1,fileSize);

            var dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);//将图片按照一定的压缩比进行压缩，得到base64编码

            // document.body.appendChild(cvs);
            // console.log(dataUrl);
            callback && callback(dataUrl);
        }

        img.src = res;
    }
    //设置压缩比例，根据图片的不同size大小，设置不同的压缩比。
    function getCompressRate(allowMaxSize,fileSize){ //计算压缩比率，size单位为MB
          var compressRate = 1;
          if(fileSize/allowMaxSize > 4){
               compressRate = 0.5;
          } else if(fileSize/allowMaxSize >3){
               compressRate = 0.6;
          } else if(fileSize/allowMaxSize >2){
               compressRate = 0.7;
          } else if(fileSize > allowMaxSize){
               compressRate = 0.8;
          } else{
               compressRate = 0.9;
          }

          alert(fileSize/allowMaxSize,compressRate)
          return compressRate;
    }
```
**.预加载**
```js
//img.onload=img.onerror：是为了解决图片加载失败时，可以继续执行脚本
function progressBar(){
    var element='<div id="overlay-bar"><div id="progress"></div><div class="loadLogo"><img src="img/logo.png"/></div><div id="progressNum">0%</div></div>';
    $(document.body).append(element);
    var num=0,arr=$('img');
    arr.each(function(){
        var img=new Image();
        img.onload=img.onerror=function(){
            try{
                num++;
                var scale=Math.floor((num/arr.length)*100);
                $('#progress').width(scale+'%');
                $('#progressNum').text(scale+'%')
                if(scale==100){
                    $('#overlay-bar').animate({'opacity':0},{ duration: 300, queue: false, complete: function() {
                        $(this).hide();
                        $('#other-wrap').fadeIn();
                    }
                    });
                }
            }catch(e){
                console.log(e);
            }
        }
        img.src='http://shenbo.igalaxy.com.cn/'+$(this).attr('src');
    })
}
//img对象小例子-设置索引属性、读取属性
li.each(function(){
    var index=$(this).index();//遍历li索引并赋给img对象上
    var imgElement=$(this).children('img');
    var img=new Image();
    img.onload=function(){
        img.onload=null;//解决gif图多次出发onload的问题
        var index=this.getAttribute('data-index');
        var currentLi=li.eq(index);
        var currentImg=currentLi.children('img');
        currentLi.css({'left':'50%','margin-left':-(currentImg.width()/2),'top':'50%','margin-top':-(currentImg.height()/2)})
    };
    img.setAttribute('data-index',index);//放到img.src是为了兼容IE低版本
    img.src=imgElement.attr('src');//放到这里是为了兼容ie低版本
})
```
##utils
```js
function browser(){
	var userAgent = navigator.userAgent.toLowerCase();
	return {
	    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
	    safari: /webkit/.test(userAgent),
	    opera: /opera/.test(userAgent),
	    msie: (/msie/.test(userAgent)||/rv:/.test(userAgent)) && !/opera/.test(userAgent),
	    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
	};
}
//校验图片格式及大小 Add Date 2012-6-14 LIUYI
function validateImage(obj) {
    var file = obj;
    var tmpFileValue = file.value;
    //校验图片格式
    if(/^.*?\.(gif|png|jpg|jpeg|bmp)$/.test(tmpFileValue.toLowerCase())){
        //校验图片大小,这段代码需调整浏览器安全级别(调到底级)和添加可信站点(将服务器站点添加到可信站点中)
        var maxSize = 1024 * 1024 * 2; //最大2MB
        if(file.value != "" ){
            var size=obj.files[0].size;
            if(size<0 || size>maxSize){
                alertMesageAndHide("超出最大限制",4);
                return false;
            }else{
                return true;
            }
        }else{
            alertMesageAndHide("请选择文件!",4);
            return false;
        }
    } else {
        alertMesageAndHide("图片格式有误!",4);
        return false;
    }
}
function ajax(config){
    var obj={
        type:'post',
        data:'',
        contentType: 'json',
        // contentType: false,    //不可缺-传图必填
        // processData: false,    //不可缺-传图必填
        error:function(){
            alert('系统获取异常');
        }
    }
    $.ajax($.extend(obj,config));
}
/**
 * 消息弹出框-并且自动隐藏
 * @returns
 */
function alertMesageAndHide(str,state){
    var style=state==4?'iconError':'iconSuccess';
    var elemnt=$('#alertMessage');
    if(elemnt.length>0){
        elemnt.show().find('p').text(str);
    }else{
        $('body').append('<div id="alertMessage"><div class="'+style+'"></div><p>'+str+'</p></div>');        
    }
    setTimeout(function(){
        $('#alertMessage').hide();
    },2000)
}
```
## 能力
**javascript获取 CPU/GPU/memory 信息**
```html
<!-- 参考：https://ask.helplib.com/others/post_12581088 -->
<html>
<body>
 <canvas id="glcanvas" width="0" height="0"></canvas>
 <script>
 var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
 document.write("<br>");
 for (var value in performance) {
 document.write(value +"<br>");
 }
 document.write("<br><br><br>");
 var canvas;
 canvas = document.getElementById("glcanvas");
 var gl = canvas.getContext("experimental-webgl");
 document.write(gl.getParameter(gl.RENDERER) +"<br>");
 document.write(gl.getParameter(gl.VENDOR) +"<br>");
 document.write(getUnmaskedInfo(gl).vendor +"<br>");
 document.write(getUnmaskedInfo(gl).renderer +"<br>");
 function getUnmaskedInfo(gl) {
 var unMaskedInfo = {
 renderer: '',
 vendor: ''
 };
 var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");
 if (dbgRenderInfo!= null) {
 unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
 unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
 }
 return unMaskedInfo;
 }
 </script>
</body>
```