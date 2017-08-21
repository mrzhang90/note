class PraiseButton{
}
class Thumb extends PraiseButton{
	constructor(finger){
	  super();
	  this.finger=finger;
	}
	clFinger(){
		this.finger.on('click',function(){
			let add1=$('<span class="add1">+1</span>');
			$(this).append(add1);
			animate(add1)(-100,3)
		})
	}
}
function animate(element){
	return function(y,scale){
		let t=0,s=0;
		let timer=setInterval(function(){
			if(t>y && s<scale){
				t-=2,s+=0.06
				element.css({'transform':'scale('+s+') translateY('+t+'px)'})
			}else{
				clearInterval(timer);
			}
		},20)
	}
}
$.extend({
	'Thumb':Thumb
})