Node Error
	Error code
		一般是没有权限的原因，MAC下使用sudo命令执行
命令
nodejs的命令需要在前面加点，.help查看所有命令，退出命令是.exit
退出：两次ctrl+C或者一次ctrl+D

#MAC全局安装报错
	报错
		npm ERR! Darwin 16.7.0
	解决
		加上sudo执行

# 包管理器npm详解
```js
npm install --production
	上线前安装npm
npm
	查看子命令
npm -v
npm i express -g(全局更新npm版本)
	i是install的简写
	g是global的简写
npm uninstall express
	删除本地的express包
npm search express
	查询express以及基于express之上开发的扩展包、支持包等
npm help
	查询npm的子命令
npm help install
	查询install的相关说明
npm list
	查看依赖关系
npm install msbuild:
	会把msbuild包安装到node_modules目录中
	不会修改package.json
	之后运行npm install命令时，不会自动安装msbuild
npm install --save:
	会把msbuild包安装到node_modules目录中
	会在package.json的dependencies属性下添加msbuild
	之后运行npm install命令时，会自动安装msbuild到node_modules目录中
	之后运行npm install --production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中
npm install --save-dev:
	会把msbuild包安装到node_modules目录中
	会在package.json的devDependencies属性下添加msbuild
	之后运行npm install命令时，会自动安装msbuild到node_modules目录中
	之后运行npm install --production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中
使用原则:
	运行时需要用到的包使用--save，否则使用--save-dev。
```
# npm start命令
	在package.json中对scripts对象进行相关设置即可
	例如配置webpack:
		"scripts": {
			"start": "webpack", // 修改的是这里，JSON文件不支持注释，引用时请清除
		    "server": "webpack-dev-server --open" //终端中输入npm run server即可运行
	  	}
  	> package.json中的script会安装一定顺序寻找命令对应位置，本地的node_modules/.bin路径就在这个寻找清单中，
  	所以无论是全局还是局部安装的Webpack，你都不需要写前面那指明详细的路径了。

  	dependencies
  		开发环境-上线一定要用的
  	devDependencies
  		生产环境

#Node.js REPL环境
	ctrl+c 
		退出当前终端
	ctrl+c 
		按下两次，退出node REPL
	ctrl+d
		退出Node REPL
	向上/向下键
		查看输入的历史命令
	tab键
		列出当前命令，用来提示
	.help
		列出使用命令
	.break
		退出多行表达式
	.clear
		退出多行表达式
	.save filename
		保存当前的Node REPL会话指定文件
	.load filename
		载入当前Node REPL会话的文件内容

## yarn
1. 安装
	如果原先有npm工具的话，安装yarn很简单，只需要一行命令即可
	npm install -g yarn
1. 配置
	安装yarn之后默认的包安装源是https://registry.yarnpkg.com，可用查看命令
1. 命令
	```
	yarn config get registry
	若想提高yarn安装的速度，可将包安装源修改为cnpm的安装源，执行以下命令即可

	yarn config set registry 'https://registry.npm.taobao.org'

	初始化某个项目
	npm init
	yarn init

	默认的安装依赖操作
	npm install/link
	yarn install/link

	安装某个依赖，并且默认保存到package
	npm install xxx —save
	yarn add xxx

	移除某个依赖项目
	npm uninstall xxx —save
	yarn remove xxx

	安装某个开发时依赖项目
	npm install --save-dev xxx 
	yarn add xxx —dev

	更新某个依赖项目
	npm update --save xxx
	yarn upgrade xxx

	安装某个全局依赖项目
	npm install -g xxx 
	yarn global add xxx

	发布/登录/登出，一系列NPM Registry操作
	npm publish/login/logout
	yarn publish/login/logout

	运行某个命令
	npm run/test
	yarn run/test

	清除缓存
	yarn cache clean
	```
1. yarn global
	* yarn 的全局安装并不是加 -g 或者 --global 这样的参数，它使用 yarn global 命令。用 yarn global --help 可以看到子命令列表
	`Usage: yarn global [add|bin|ls|remove|upgrade] [flags]`
	* 删除全局模块
	yarn global remove

## 参考
	[yarn-Nodjs包管理工具](https://segmentfault.com/a/1190000007189426)
	[yarn global 与 npm -g](https://segmentfault.com/a/1190000008489881)