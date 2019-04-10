我们可以给函数添加属性
```js
var fn=function(){}
fn.type=1
console.assert(fn.type===1,`Function fn的type不是1，而是:${fn.type}`)
```
箭头函数没有prototype
```js
var fn=()=>{}
fn.prototype //undefined
```