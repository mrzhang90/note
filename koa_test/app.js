const Koa = require('koa') // koa 2.x 
const router = require('koa-simple-router')
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
var path = require('path');
var axios = require('axios');

const app = new Koa()
app.use(serve(__dirname + '/public'));
app.context.render = co.wrap(render({
  // ...your setting 
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: 'memory', // disable, set to false 
  ext: 'html',
  writeBody: false
}));

// app.use(async ctx => ctx.body = await ctx.render('index'));
app.use(router(_ => {
  _.get('/index/index', async(ctx, next) => {
     ctx.body = await ctx.render('index');
  })
  _.get('/clickFinger', async(ctx, next) => {
     // ctx.body = await ctx.render('index');
    ctx.body = await axios.get('http://10.0.1.167/')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return 'error';
    });
    
  })
  _.post('/name/:id', async(ctx, next) => {
    ctx.body = await ctx.render('post');
  })
}))

// 为给定 ID 的 user 创建请求
// axios.get('http://10.0.1.167/')
//   .then(function (response) {
//       console.log(response);
//   })
//   .catch(function (error) {
//       console.log(error);
//   });

app.listen(3000);