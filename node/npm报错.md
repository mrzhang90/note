## Chromium源的报错
ERROR: **Failed to download Chromium r686378**! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
1. 使用国内Chromium源
npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
[参考.](https://www.jianshu.com/p/d69b1d8bc2a6)

## 权限报错
npm ERR! Error: EACCES: permission denied, access
1. sudo npm install --save-dev grunt 
1. sudo npm install --unsafe-perm=true --save-dev grunt
1. sudo npm install --unsafe-perm=true --allow-root --save-dev grunt
[参考.](https://blog.csdn.net/testcs_dn/article/details/78869419)

## Error code
一般是没有权限的原因，MAC下使用sudo命令执行
## 命令
nodejs的命令需要在前面加点，.help查看所有命令，退出命令是.exit
退出：两次ctrl+C或者一次ctrl+D

## MAC全局安装报错
报错: npm ERR! Darwin 16.7.0
解决: 加上sudo执行