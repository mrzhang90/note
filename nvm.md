### 卸载已安装到全局的 node/npm
如果之前是在官网下载的 node 安装包，运行后会自动安装在全局目录，其中

node 命令在 /usr/local/bin/node ，npm 命令在全局 node_modules 目录中，具体路径为 /usr/local/lib/node_modules/npm

**安装 nvm 之后最好先删除下已安装的 node 和全局 node 模块**
1. 查看已经安装在全局的模块，以便删除这些全局模块后再按照不同的 node 版本重新进行全局安装npm ls -g --depth=0
2. 删除全局 node_modules 目录
    sudo rm -rf /usr/local/lib/node_modules
3. 删除 node
    sudo rm /usr/local/bin/node
4. 删除全局 node 模块注册的软链
    cd /usr/local/bin && ls -l | grep"../lib/node_modules/"| awk'{print $9}'| xargs rm
### 配置
```js
cat ~/.profile
// 追加文件
[ -s "~/.nvm/nvm.sh" ] && . "~/.nvm/nvm.sh" # This loads nvm
// 立即生效
source .profile
```
```js
cat ~/.zshrc
// 追加文件
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
// 立即生效
source .zshrc
```
### pm2全局安装
1. npm安装
    在nvm下，不需要sudo，直接npm安装即可
    ```js
    npm i pm2 -g 
    ```
2. 如果.npmrc文件内有prefix，那么要删除