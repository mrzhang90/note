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
    var element=$(obj);
    var tips=tipsFn(element.parent());
    //校验图片格式
    if(/^.*?\.(gif|png|jpg|jpeg|bmp)$/.test(tmpFileValue.toLowerCase())){
        //校验图片大小,这段代码需调整浏览器安全级别(调到底级)和添加可信站点(将服务器站点添加到可信站点中)
        var maxSize = 1024 * 1024 * 0.1; //最大2MB
        if(file.value != "" ){
            var size=obj.files[0].size;
            if(size<0 || size>maxSize){
                tips("超出最大限制")
                return false;
            }else{
                return true;
            }
        }else{
            tips("超出最大限制")
            return false;
        }
    } else {
        tips("超出最大限制")
        return false;
    }
}
function tipsFn(element){
    console.log(element)
    var obj={
        side:1,  //1,2,3,4 分别代表 上右下左
        msg:'',//tips的文本内容
        color:'#FFF',//文字颜色，默认为白色
        bg:'#FD9720',//背景色，默认为红色
        time:3,//默认为2 自动关闭时间 单位为秒 0为不关闭 （点击提示也可以关闭）
        x:0,// 默认为0 横向偏移 正数向右偏移 负数向左偏移
        y:0 // 默认为0 纵向偏移 正数向下偏移 负数向上偏移
    }
    return function(msg){
        obj.msg=msg;
        element.tips(obj)
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