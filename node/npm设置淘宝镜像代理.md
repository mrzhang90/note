### 设置镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org

```
// 设置淘宝镜像代理
npm config set registry https://registry.npm.taobao.org
npm config set proxy http://registry.npm.taobao.org
// 取消代理
npm config delete proxy
```
[参考-淘宝NPM镜像](http://npm.taobao.org/)
[参考-npm设置和取消代理](https://blog.csdn.net/yanzi1225627/article/details/80247758)