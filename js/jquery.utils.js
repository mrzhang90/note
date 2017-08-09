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