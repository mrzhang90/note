## uniapp 与 5+APP 相比
5+APP 是 1 代产品，运行在 webView 页面里，多个 webView 是一个线程，容易造成线程阻塞；打开新页面时，需要下载后加载到 webView 里，等待时间长

uniapp 是新产品，类似小程序，双线程，分为逻辑层和视图层，视图层由 webView 加载页面，逻辑层由 jsCore 处理逻辑；打开新页面时，联网始终存在 jsCore 里进行，同时另一个线程打开了视图层的 webView 页面，他们双线程并行工作而不是串行，所以打开新页面非常快；由于双线程，视图层与逻辑层交互增加了成本，高频通信不如 webView 灵活，uniapp 提供的 renderjs 方案了解决这类问题（react native 也有这类阻塞问题，并没有解决方案，不如 uniapp）

## renderjs
只支持 app-vue 和 H5
降低通讯损耗

## UniPush 统一推送服务

## 启动页和引导页
启动页和引导页是两个东西，
启动页是 UniApp 自带的，不可去掉，只能修改配置，
而引导页需要开发者自行开发，
[App通用启动界面配置说明](https://ask.dcloud.net.cn/article/37474)
[启动页配置逻辑：](https://www.freesion.com/article/6062789365/)
    1. 延长启动图加载时间
    2. app.vue 内判断是否首次登陆
[引导页配置逻辑：](https://ext.dcloud.net.cn/plugin?id=192)


## 启动页闪一下的问题怎么解决呀，
如果引导页不放在page.json首位的话，进来会闪首页；若放在page.json首位，则会闪引导页

自问自答： https://www.freesion.com/article/6062789365/ 参考上述链接，延长app启动图的加载时间，app.vue内判断是否是首次登陆，page.json无需把引导页放在第一个，这样就不会闪了

## 启动图
[Android平台启动图使用.9.png图片](https://ask.dcloud.net.cn/article/35527)
