$(function(){
	var carousel = $('.carousel');
	var ul_carousel=carousel.children('ul');
	var lists=carousel.find('img');
    var length=lists.length;
    // var width=192*length;
    var width=0,imgCount=0,currentData=new Date().getTime();
    var ul_left=0,newUl_left=0,new_ul='',timer=null;
    lists.each(function(){
        var img=new Image();
        img.onload=function(){
            imgCount++;
            width+=Number(this.width)+12;
        }
		img.src=$(this).attr('src');
	});
    var timer2 = setInterval(function(){
		if(imgCount==length || new Date().getTime()-currentData > 2 * 60 * 1000){//图片加载完 或者 时间超过2分钟
            ul_carousel.width(width).show();
            new_ul=ul_carousel.clone(true);
            newUl_left=width;
            carousel.append(new_ul.css('left',width));
			timer=setInterval(setCarousel,50);
			clearInterval(timer2);
		}
	},100);
	function setCarousel(){
		ul_carousel.css('left',ul_left-=2);
		new_ul.css('left',newUl_left-=2);
		if(ul_left<=-width){
			ul_left=width;
		}
		if(newUl_left<=-width){
			newUl_left=width;
		}
	}
	carousel.on('mouseover','li',function(){
		clearInterval(timer)
	})
	carousel.on('mouseout','li',function(){
		timer=setInterval(setCarousel,50)
	})
})
var userAgent = navigator.userAgent.toLowerCase();
jQuery.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: (/msie/.test(userAgent)||/rv:/.test(userAgent)) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
};