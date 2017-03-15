// Garden Gnome Software - Skin
// Object2VR 3.0/10616
// Filename: skin.ggsk
// Generated 周三 一月 18 11:06:05 2017

function object2vrSkin(player,base) {
	var me=this;
	var flag=false;
	var nodeMarker=new Array();
	var activeNodeMarker=new Array();
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=new Array();
	this.elementMouseOver=new Array();
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	for(i=0;i<prefixes.length;i++) {
		if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
			cssPrefix='-' + prefixes[i].toLowerCase() + '-';
			domTransition=prefixes[i] + 'Transition';
			domTransform=prefixes[i] + 'Transform';
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=new Array();
		stack.push(startElement);
		while(stack.length>0) {
			e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=new Array();
		var stack=new Array();
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		this._logo=document.createElement('div');
		this._logo.ggId="logo";
		this._logo.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		this._logo.ggVisible=true;
		this._logo.className='ggskin ggskin_image';
		this._logo.ggType='image';
		hs ='position:absolute;';
		hs+='left: 5px;';
		hs+='top:  4px;';
		hs+='width: 140px;';
		hs+='height: 350px;';
		hs+=cssPrefix + 'transform-origin: 0% 0%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._logo.ggParameter) + ';';
		hs+='visibility: inherit;';
		this._logo.setAttribute('style',hs);
		this._logo__img=document.createElement('img');
		this._logo__img.className='ggskin ggskin_image';
		this._logo__img.setAttribute('src',basePath + 'images/logo.png');
		this._logo__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._logo__img.className='ggskin ggskin_image';
		this._logo__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._logo__img);
		this._logo.appendChild(this._logo__img);
		this.divSkin.appendChild(this._logo);
		this._text=document.createElement('div');
		this._text.ggId="text";
		this._text.ggParameter={ rx:0,ry:0,a:0,sx:0.7,sy:0.7 };
		this._text.ggVisible=true;
		this._text.className='ggskin ggskin_image';
		this._text.ggType='image';
		this._text.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-190 + w) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -190px;';
		hs+='top:  2px;';
		hs+='width: 184px;';
		hs+='height: 300px;';
		hs+=cssPrefix + 'transform-origin: 100% 0%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._text.ggParameter) + ';';
		hs+='visibility: inherit;';
		this._text.setAttribute('style',hs);
		this._text__img=document.createElement('img');
		this._text__img.className='ggskin ggskin_image';
		this._text__img.setAttribute('src',basePath + 'images/text.png');
		this._text__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._text__img.className='ggskin ggskin_image';
		this._text__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._text__img);
		this._text.appendChild(this._text__img);
		this.divSkin.appendChild(this._text);
		this._containerbt=document.createElement('div');
		this._containerbt.ggId="ContainerBT";
		this._containerbt.ggParameter={ rx:0,ry:0,a:0,sx:0.5,sy:0.5 };
		this._containerbt.ggVisible=true;
		this._containerbt.className='ggskin ggskin_container';
		this._containerbt.ggType='container';
		this._containerbt.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-211 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-98 + h) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -211px;';
		hs+='top:  -98px;';
		hs+='width: 422px;';
		hs+='height: 97px;';
		hs+=cssPrefix + 'transform-origin: 50% 100%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._containerbt.ggParameter) + ';';
		hs+='visibility: inherit;';
		this._containerbt.setAttribute('style',hs);
		this._erweima=document.createElement('div');
		this._erweima.ggId="erweima";
		this._erweima.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._erweima.ggVisible=true;
		this._erweima.className='ggskin ggskin_button';
		this._erweima.ggType='button';
		hs ='position:absolute;';
		hs+='left: 216px;';
		hs+='top:  -2px;';
		hs+='width: 100px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._erweima.setAttribute('style',hs);
		this._erweima__img=document.createElement('img');
		this._erweima__img.className='ggskin ggskin_button';
		this._erweima__img.setAttribute('src',basePath + 'images/erweima.png');
		this._erweima__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._erweima__img.className='ggskin ggskin_button';
		this._erweima__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._erweima__img);
		this._erweima.appendChild(this._erweima__img);
		this._erweima.onclick=function () {
			me._erweidi.style[domTransition]='none';
			me._erweidi.style.visibility='inherit';
			me._erweidi.ggVisible=true;
			me._erwei.style[domTransition]='none';
			me._erwei.style.visibility='inherit';
			me._erwei.ggVisible=true;
			flag=me._erwei.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me._erwei.style[domTransition]='none';
			} else {
				me._erwei.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._erwei.style.opacity='0';
				me._erwei.style.visibility='hidden';
			} else {
				me._erwei.style.opacity='1';
				me._erwei.style.visibility=me._erwei.ggVisible?'inherit':'hidden';
			}
			me._erwei.ggOpacitiyActive=!flag;
		}
		this._containerbt.appendChild(this._erweima);
		this._fanhui=document.createElement('div');
		this._fanhui.ggId="fanhui";
		this._fanhui.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fanhui.ggVisible=true;
		this._fanhui.className='ggskin ggskin_button';
		this._fanhui.ggType='button';
		hs ='position:absolute;';
		hs+='left: 107px;';
		hs+='top:  -2px;';
		hs+='width: 100px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._fanhui.setAttribute('style',hs);
		this._fanhui__img=document.createElement('img');
		this._fanhui__img.className='ggskin ggskin_button';
		this._fanhui__img.setAttribute('src',basePath + 'images/fanhui.png');
		this._fanhui__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._fanhui__img.className='ggskin ggskin_button';
		this._fanhui__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._fanhui__img);
		this._fanhui.appendChild(this._fanhui__img);
		this._fanhui.onclick=function () {
			me.player.openUrl("..\/..\/list.html","_self");
		}
		this._containerbt.appendChild(this._fanhui);
		this._dikuan=document.createElement('div');
		this._dikuan.ggId="dikuan";
		this._dikuan.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._dikuan.ggVisible=true;
		this._dikuan.className='ggskin ggskin_button';
		this._dikuan.ggType='button';
		hs ='position:absolute;';
		hs+='left: 324px;';
		hs+='top:  -2px;';
		hs+='width: 100px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._dikuan.setAttribute('style',hs);
		this._dikuan__img=document.createElement('img');
		this._dikuan__img.className='ggskin ggskin_button';
		this._dikuan__img.setAttribute('src',basePath + 'images/dikuan.png');
		this._dikuan__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._dikuan__img.className='ggskin ggskin_button';
		this._dikuan__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._dikuan__img);
		this._dikuan.appendChild(this._dikuan__img);
		this._dikuan.onclick=function () {
			me._dikuandi.style[domTransition]='none';
			me._dikuandi.style.visibility='inherit';
			me._dikuandi.ggVisible=true;
			me._dikuantu.style[domTransition]='none';
			me._dikuantu.style.visibility='inherit';
			me._dikuantu.ggVisible=true;
			flag=me._dikuantu.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me._dikuantu.style[domTransition]='none';
			} else {
				me._dikuantu.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._dikuantu.style.opacity='0';
				me._dikuantu.style.visibility='hidden';
			} else {
				me._dikuantu.style.opacity='1';
				me._dikuantu.style.visibility=me._dikuantu.ggVisible?'inherit':'hidden';
			}
			me._dikuantu.ggOpacitiyActive=!flag;
		}
		this._containerbt.appendChild(this._dikuan);
		this._yuyin=document.createElement('div');
		this._yuyin.ggId="yuyin";
		this._yuyin.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._yuyin.ggVisible=true;
		this._yuyin.className='ggskin ggskin_button';
		this._yuyin.ggType='button';
		hs ='position:absolute;';
		hs+='left: -2px;';
		hs+='top:  -2px;';
		hs+='width: 100px;';
		hs+='height: 100px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		hs+='cursor: pointer;';
		this._yuyin.setAttribute('style',hs);
		this._yuyin__img=document.createElement('img');
		this._yuyin__img.className='ggskin ggskin_button';
		this._yuyin__img.setAttribute('src',basePath + 'images/yuyin.png');
		this._yuyin__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._yuyin__img.className='ggskin ggskin_button';		
		
		
		
		
		
		
		
		window.yuyinAudioImg = this._yuyin__img;
		
		
		
		
		
		
		this._yuyin__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._yuyin__img);
		this._yuyin.appendChild(this._yuyin__img);
		
		
		
		
		
		
		
this._yuyin.onclick=function () {
	if( typeof window.vrpieAudio == 'undefined') 
	{
		window.vrpieAudio = new Audio("jieshao.mp3");
		window.vrpieAudio.currentTime = 0; 
		window.vrpieAudio.loop = true; 
	}
	if( typeof window.vrpieAudioClick == 'undefined' )
	{
		window.vrpieAudioClick = 0;
	}
	else 
	{
		window.vrpieAudioClick++;
	}
	window.vrpieAudio.volume = 0.8;
	
	if( window.vrpieAudioClick % 2 == 0)
	{
		window.vrpieAudio.play();
		window.yuyinAudioImg.src = basePath + 'images/yuyin2.png';
		
	}
	else 
	{
		window.vrpieAudio.pause();
		window.yuyinAudioImg.src = basePath + 'images/yuyin.png';
	}
}
		
		
		
		
		
		
		
		this._containerbt.appendChild(this._yuyin);
		this.divSkin.appendChild(this._containerbt);
		this._erweidi=document.createElement('div');
		this._erweidi.ggId="erweidi";
		this._erweidi.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._erweidi.ggVisible=false;
		this._erweidi.className='ggskin ggskin_rectangle';
		this._erweidi.ggType='rectangle';
		this._erweidi.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-2711 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-2740 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -2711px;';
		hs+='top:  -2740px;';
		hs+='width: 4999px;';
		hs+='height: 4999px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		hs+='background: #000000;';
		hs+='border: 1px solid #000000;';
		this._erweidi.setAttribute('style',hs);
		this.divSkin.appendChild(this._erweidi);
		this._erwei=document.createElement('div');
		this._erwei.ggId="erwei";
		this._erwei.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._erwei.ggVisible=false;
		this._erwei.className='ggskin ggskin_image';
		this._erwei.ggType='image';
		this._erwei.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-137 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-163 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -137px;';
		hs+='top:  -163px;';
		hs+='width: 280px;';
		hs+='height: 280px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='opacity: 0;';
		hs+='visibility: hidden;';
		this._erwei.setAttribute('style',hs);
		this._erwei__img=document.createElement('img');
		this._erwei__img.className='ggskin ggskin_image';
		this._erwei__img.setAttribute('src',basePath + 'images/erwei.png');
		this._erwei__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._erwei__img.className='ggskin ggskin_image';
		this._erwei__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._erwei__img);
		this._erwei.appendChild(this._erwei__img);
		this._erwei.onclick=function () {
			me._erwei.style[domTransition]='none';
			me._erwei.style.visibility='hidden';
			me._erwei.ggVisible=false;
			me._erweidi.style[domTransition]='none';
			me._erweidi.style.visibility='hidden';
			me._erweidi.ggVisible=false;
			flag=me._erwei.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me._erwei.style[domTransition]='none';
			} else {
				me._erwei.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._erwei.style.opacity='0';
				me._erwei.style.visibility='hidden';
			} else {
				me._erwei.style.opacity='0';
				me._erwei.style.visibility='hidden';
			}
			me._erwei.ggOpacitiyActive=!flag;
		}
		this.divSkin.appendChild(this._erwei);
		this._dikuandi=document.createElement('div');
		this._dikuandi.ggId="dikuandi";
		this._dikuandi.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._dikuandi.ggVisible=false;
		this._dikuandi.className='ggskin ggskin_rectangle';
		this._dikuandi.ggType='rectangle';
		this._dikuandi.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-2714 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-2742 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -2714px;';
		hs+='top:  -2742px;';
		hs+='width: 4999px;';
		hs+='height: 4999px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: hidden;';
		hs+='background: #000000;';
		hs+='border: 1px solid #000000;';
		this._dikuandi.setAttribute('style',hs);
		this.divSkin.appendChild(this._dikuandi);
		this._dikuantu=document.createElement('div');
		this._dikuantu.ggId="dikuantu";
		this._dikuantu.ggParameter={ rx:0,ry:0,a:0,sx:0.6,sy:0.6 };
		this._dikuantu.ggVisible=false;
		this._dikuantu.className='ggskin ggskin_image';
		this._dikuantu.ggType='image';
		this._dikuantu.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-300 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-300 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -300px;';
		hs+='top:  -300px;';
		hs+='width: 600px;';
		hs+='height: 600px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+=cssPrefix + 'transform: ' + parameterToTransform(this._dikuantu.ggParameter) + ';';
		hs+='opacity: 0;';
		hs+='visibility: hidden;';
		this._dikuantu.setAttribute('style',hs);
		this._dikuantu__img=document.createElement('img');
		this._dikuantu__img.className='ggskin ggskin_image';
		this._dikuantu__img.setAttribute('src',basePath + 'images/dikuantu.png');
		this._dikuantu__img.setAttribute('style','position: absolute;top: 0px;left: 0px;-webkit-user-drag:none;');
		this._dikuantu__img.className='ggskin ggskin_image';
		this._dikuantu__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._dikuantu__img);
		this._dikuantu.appendChild(this._dikuantu__img);
		this._dikuantu.onclick=function () {
			me._dikuantu.style[domTransition]='none';
			me._dikuantu.style.visibility='hidden';
			me._dikuantu.ggVisible=false;
			me._dikuandi.style[domTransition]='none';
			me._dikuandi.style.visibility='hidden';
			me._dikuandi.ggVisible=false;
			flag=me._dikuantu.ggOpacitiyActive;
			if (me.player.transitionsDisabled) {
				me._dikuantu.style[domTransition]='none';
			} else {
				me._dikuantu.style[domTransition]='all 500ms ease-out 0ms';
			}
			if (flag) {
				me._dikuantu.style.opacity='0';
				me._dikuantu.style.visibility='hidden';
			} else {
				me._dikuantu.style.opacity='0';
				me._dikuantu.style.visibility='hidden';
			}
			me._dikuantu.ggOpacitiyActive=!flag;
		}
		this.divSkin.appendChild(this._dikuantu);
		this._loading_text=document.createElement('div');
		this._loading_text__text=document.createElement('div');
		this._loading_text.className='ggskin ggskin_textdiv';
		this._loading_text.ggTextDiv=this._loading_text__text;
		this._loading_text.ggId="loading text";
		this._loading_text.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_text.ggVisible=true;
		this._loading_text.className='ggskin ggskin_text';
		this._loading_text.ggType='text';
		this._loading_text.ggUpdatePosition=function() {
			this.style[domTransition]='none';
			this.style.width=this.ggTextDiv.offsetWidth + 'px';
			this.style.height=this.ggTextDiv.offsetHeight + 'px';
			if (this.parentNode) {
				w=this.parentNode.offsetWidth;
				this.style.left=(-24 + w/2) + 'px';
				h=this.parentNode.offsetHeight;
				this.style.top=(-11 + h/2) + 'px';
			}
		}
		hs ='position:absolute;';
		hs+='left: -24px;';
		hs+='top:  -11px;';
		hs+='width: 43px;';
		hs+='height: 19px;';
		hs+=cssPrefix + 'transform-origin: 50% 50%;';
		hs+='visibility: inherit;';
		this._loading_text.setAttribute('style',hs);
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 43px;';
		hs+='height: 19px;';
		hs+='background: #595959;';
		hs+='border: 1px solid #a6a6a6;';
		hs+='border-radius: 5px;';
		hs+=cssPrefix + 'border-radius: 5px;';
		hs+='color: #ffffff;';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 1px 2px 1px 2px;';
		hs+='overflow: hidden;';
		this._loading_text__text.setAttribute('style',hs);
		this._loading_text.ggUpdateText=function() {
			var hs="<b>"+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
			}
		}
		this._loading_text.ggUpdateText();
		this._loading_text.appendChild(this._loading_text__text);
		this.divSkin.appendChild(this._loading_text);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
			me._loading_text.style[domTransition]='none';
			me._loading_text.style.visibility='hidden';
			me._loading_text.ggVisible=false;
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		var newMarker=new Array();
		var i,j;
		var tags=me.player.userdata.tags;
		for (i=0;i<nodeMarker.length;i++) {
			var match=false;
			if ((nodeMarker[i].ggMarkerNodeId==id) && (id!='')) match=true;
			for(j=0;j<tags.length;j++) {
				if (nodeMarker[i].ggMarkerNodeId==tags[j]) match=true;
			}
			if (match) {
				newMarker.push(nodeMarker[i]);
			}
		}
		for(i=0;i<activeNodeMarker.length;i++) {
			if (newMarker.indexOf(activeNodeMarker[i])<0) {
				if (activeNodeMarker[i].ggMarkerNormal) {
					activeNodeMarker[i].ggMarkerNormal.style.visibility='inherit';
				}
				if (activeNodeMarker[i].ggMarkerActive) {
					activeNodeMarker[i].ggMarkerActive.style.visibility='hidden';
				}
				if (activeNodeMarker[i].ggDeactivate) {
					activeNodeMarker[i].ggDeactivate();
				}
			}
		}
		for(i=0;i<newMarker.length;i++) {
			if (activeNodeMarker.indexOf(newMarker[i])<0) {
				if (newMarker[i].ggMarkerNormal) {
					newMarker[i].ggMarkerNormal.style.visibility='hidden';
				}
				if (newMarker[i].ggMarkerActive) {
					newMarker[i].ggMarkerActive.style.visibility='inherit';
				}
				if (newMarker[i].ggActivate) {
					newMarker[i].ggActivate();
				}
			}
		}
		activeNodeMarker=newMarker;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		this._loading_text.ggUpdateText();
	};
	this.addSkin();
};