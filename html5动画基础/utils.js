if(!window.requestAnimationFrame){
	window.requestAnimationFrame=(
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			return window.setTimeout(callback,1000/60)
		}
	)
}
function addEvent(obj,ev,fn)    //obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
{
    if(obj.attachEvent)
    {
        obj.attachEvent("on" + ev,fn);
    }
    else
    {
        obj.addEventListener(ev,fn,false);
    }
}

var utils={};
utils.captureMouse=function(element){
	var mouse={x:0,y:0};
	addEvent(element,'mouseover',function(event){
		var x,y;
		if(event.pageX || event.pageY){
			x=event.pageX;
			y=event.pageY;
		}else{
			x=event.clientX + document.body.scrollLeft +document.documentElement.scrollLeft;
			y=event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		x-=element.offsetLeft;
		y-=element.offsetTop;
		mouse.x=x;
		mouse.y=y;
	})
	return mouse;
}