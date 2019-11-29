### loader
1. use['xx1-loader','xx2-loader']
2. 最后的loader最早调用，传入原始的资源
3. 中间的loader执行的时候，传入的是上一个loader的执行结果
4. loader需要异步 this.async()和this.callback()
5. 前置钩子的执行顺序
    1. xx1-loader -> pith //首先执行第一个loader的前置钩子
    2. xx2-loader -> pith //然后执行第二个loader的前置钩子
    3. xx2                //然后执行第二个loader
    4. xx1                //最后执行第一个loader
### 自定义loader
```js
//自定义loader
module.exports = function(content,map,meta){
  console.log('loader执行了… 这是一个自定义的loader');
  return content + this.data.value;
}

//前置钩子
module.exports.pith = function(remainRequest,preRequest,data){
  data.value = "123";
}
```