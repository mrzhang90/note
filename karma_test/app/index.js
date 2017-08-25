class PraiseButton {
    constructor(){
		this.count=0;
		this.y=-100;
		this.scale=3;
    }
    fabulous(){
		let add1=$('<span class="add1">+1</span>');
		this.element.append(add1);
		return this.animation(add1,this.count,this.y,this.scale);
	}
    animation(element,count,y,scale){
        element.text('+'+count);
        $('title').text('点赞'+count);
        let t=0,s=0;
        let timer=setInterval(function(){
            // console.log(t,y , s,scale)
            if(t>y && s<scale){
                t-=2;
                s+=0.06;
                element.css({'transform':'scale('+s+') translateY('+t+'px)'})
            }else{
                clearInterval(timer);
            }
        },20)
    }
}
class Thumb extends PraiseButton{
		constructor(element){
		  super();
        this.element=element;
		}
		plus1(){
            ++this.count;
            super.fabulous();
            return this.count;
		}
}

$.extend({
    thumb:Thumb
})
