const Koa = require('koa') // koa 2.x 
const router = require('koa-simple-router')
const serve = require('koa-static');
const render = require('koa-swig');
const co = require('co');
var path = require('path');

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
  _.get('/', async(ctx, next) => {
     ctx.body = await ctx.render('index');
  })
  _.post('/name/:id', async(ctx, next) => {
    ctx.body = await ctx.render('post');
  })
}))
app.listen(3000);