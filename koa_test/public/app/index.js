class PraiseButton {
    constructor(){
		this.count=0;
		this.y=-100;
		this.scale=3;
    }
    plus1(){
        var That=this;
        this.isDisabled=false;
        this.element.on('click',function(){
            if(That.isDisabled){
                return That.disabled();
            }
            That.fabulous();
            That.isDisabled=true;
        })
    }
    fabulous(){
        ajax(function(data){
            if(data.stats==-1){
                alert(data.msg);
                return false;
            }
            this.count=data.count;
            // if(this.count>10){
            //     this.count=0;
            //     return this.disabled();
            // }
            this.isDisabled=false;
            this.enabled();
            $('title').text('点赞'+this.count);
            let add1=$('<span class="add1">+'+this.count+'</span>');
            this.element.append(add1);
            return this.animation(add1,this.y,this.scale);
        }.bind(this));
	}
    animation(element,y,scale){
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
    disabled(){
        this.element.addClass('gray');
        return false;
    }
    enabled(){
        this.element.removeClass('gray');
        return true;
    }
}
class Thumb extends PraiseButton{
	constructor(element){
        super();
        this.element=element;
	}
}

function ajax(callback){
    axios.get('/clickFinger').then(function(response) {
        callback(response.data)
    });
}
export default Thumb;
