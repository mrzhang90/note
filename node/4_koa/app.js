const messages = require('./controllers/messages.js')
const Koa = require('koa');
const path = require('path');
const render = require('koa-swig');
const co = require('co');
const router = require('koa-simple-router');
const koaBody = require('koa-body');//从 POST 请求的数据体里面提取键值对
const serve = require('koa-static');
const compose = require('koa-compose');
const app = new Koa();

app.use(koaBody({multipart: true }));

app.use(serve(__dirname + '/public/'));
app.context.render = co.wrap(render({
  root: path.join(__dirname, 'views'),
  ext: 'html',
  writeBody: false
}));

app.use(router(_ => {
  _.get('/',  messages.hanlder,messages.home)
  _.all('/error',messages.hanlder,{//all的写法
  	get:messages.errorText
  })
  _.get('/message', messages.hanlder,messages.list)
  _.post('/message', messages.hanlder,messages.create)
  _.post('/fileUpload', messages.hanlder,messages.fileUpload)
}))
 
app.listen(3001);