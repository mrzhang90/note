### 设置镜像
npm install -g cnpm --registry=https://registry.npm.taobao.org
### 设置代理
```
// 设置代理
npm config set proxy http://registry.npm.taobao.org
// 取消代理
npm config delete proxy
```
### 设置淘宝镜像
```
// 设置淘宝镜像
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist
// 删除淘宝镜像
npm config delete registry
npm config delete disturl
// 查看镜像信息
npm config list
// 编辑镜像
npm config edit
```
### 重置代理镜像
```
// 重置代理镜像
npm config set registry https://registry.npmjs.org
```
[参考-淘宝NPM镜像](http://npm.taobao.org/)
[参考-npm设置和取消代理](https://blog.csdn.net/yanzi1225627/article/details/80247758)