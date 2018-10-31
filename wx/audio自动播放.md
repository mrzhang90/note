###app.vue
template
```html
<audio ref="keepTry" src="http://qiniu.bkenglish.cn/practice/audio/keepTry.mp3" controls="controls" style="display:none;"></audio>
    <audio ref="goods" src="http://qiniu.bkenglish.cn/practice/audio/goods.mp3" controls="controls" style="display:none;"></audio>
    <audio ref="excellent" src="http://qiniu.bkenglish.cn/practice/audio/excellent.mp3" controls="controls" style="display:none;"></audio>
```
js
```js
import {
  // 自动播放
  playAudio
} from "./common/wx";
mounted(){
    playAudio(true).then(()=>{
      this.$refs.keepTry.load();
      this.$refs.goods.load();
      this.$refs.excellent.load();
    })
  },
  methods:{
    autoPlay(number){
      // 声音鼓励
      switch(number){
          case 1:
              vm.$refs.keepTry.load();
              vm.$refs.keepTry.play();
              break;
          case 2:
              vm.$refs.goods.load();
              vm.$refs.goods.play();
              break;
          case 3:
              vm.$refs.excellent.load();
              vm.$refs.excellent.play();
              break;
      }
    }
```
###main.js
```js
Vue.prototype.$autoPlay=(number)=>{
  App.methods.autoPlay(number);
}
```
###wx.js
```js
let wx=require('weixin-js-sdk');
const ready=()=>{
    return new Promise((resolve)=>{
        wx.ready(function(){
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            resolve();
        });
        wx.error(function(res){
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            // logError('wx config error',res);
        });
    })
}
// 控制音频播放
export function playAudio(isAutoplay){
	return new Promise((resolve,reject)=>{
		//ready准备好再调用
		ready().then(()=>{
			if (isAutoplay) {
				if (window.WeixinJSBridge) {
					console.log("window.WeixinJSBridge::",window.WeixinJSBridge)
					WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
						resolve();
					}, false);
				} else {
					console.log("window.WeixinJSBridge不存在")
					document.addEventListener("WeixinJSBridgeReady", function () {
						WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
							resolve();
						});
					}, false);
				}
				resolve();
			} else {
				resolve();
			}
		})
	})
}
```