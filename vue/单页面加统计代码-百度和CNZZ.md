### index.html里，head头部引入百度统计和CNZZ统计
```js
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?9ed24a2995eecc14db7875b2d85560d6";

      var cz = document.createElement("script");
      cz.src = "https://s22.cnzz.com/z_stat.php?id=1274676836&web_id=1274676836";

      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
      s.parentNode.insertBefore(cz, s);
    })();
```

### 在vue-router的beforeEach里，加入代码
```js
router.beforeEach((to, from, next) => {
    if (to.path) {
      _hmt.push(['_trackPageview', '/#' + to.fullPath]);
      if (window._czc) {
        window._czc.push(['_trackPageview', to.fullPath])
      }
    }
    next();
});
```

####参考
[百度统计开发平台](https://tongji.baidu.com/open/api/more?p=ref_trackPageview)
[CNZZ开发平台](https://developer.umeng.com/docs/67963/detail/73619)
