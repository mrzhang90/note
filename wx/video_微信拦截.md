解决微信公众号内，播放器被拦截的问题
x5-playsinline="true"是最重要的一句，解决安卓下video播放器被微信拦截
webkit-playsinline和playsinline也是解决安卓和IOS下播放器被拦截的问题
```html
<video 
    :src="videoAddress"
    :poster="videoAddress+'?vframe/jpg/offset/0'"
    width="100%" height="100%"
    controls="" 
    preload="auto"
    webkit-playsinline="true" 
    x-webkit-airplay="true" 
    playsinline="true" 
    x5-video-orientation="h5"
    x5-playsinline="true"
    style="display: inline;">
        您的浏览器不支持。
    </video>
```