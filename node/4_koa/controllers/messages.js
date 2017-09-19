'use strict';
// const parse = require('co-body');
const os = require('os');
const fs = require('fs');
const path = require('path');
const messages = [
  { id: 0,
    message: 'Koa next generation web framework for node.js'
  },
  { id: 1,
    message: 'Koa is a new web framework designed by the team behind Express'
  }
];

//错误捕获
module.exports.hanlder=async (ctx,next)=>{
  try{
    await next();
  }catch(err){
    ctx.response.status=err.statusCode || err.status || 500;
    ctx.response.body={
      message:err.message
    }
  }
}
module.exports.errorText=async (ctx,next)=>{
  // ctx.throw(404,'额 哈哈哈')
  // ctx.throw(500,'出错了');
  ctx.throw(404,'404错，此处可不填');
}
module.exports.logger=async (ctx,next)=>{
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next()
}
module.exports.home=async (ctx,next)=>{
  const n=Number(ctx.cookies.get('view') || 0)+1;
  ctx.cookies.set('view',n);
 	ctx.body = await ctx.render('index',{'messages':messages,'cookies':n})
}
module.exports.list=async (ctx,next)=>{
	ctx.body = await messages
}
module.exports.create=async (ctx,next)=>{
  // const message = await parse(ctx);
	const message = await ctx.request.body;
	const id = messages.push(message)-1;
	message.id=id;
	ctx.response.redirect('/');
}
module.exports.fileUpload=async (ctx,next)=>{
  const tmpdir = os.tmpdir();//返回系统临时文件
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
}