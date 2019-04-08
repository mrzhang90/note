##Date
```js
// 2018/7/6 10:00:00
new Date().toLocaleString();
```
##事件委托
```
事件代理又叫事件委托，事件委托利用事件冒泡
js的事件模型，采用冒泡模式，子元素逐级向上冒泡，成为父元素事件。
比如对每个表格td要做事件监听，可以在table上写事件，当点击td会通过冒泡找到table，这个就叫做"事件委托"
```
##兼容
scrollTop跳转
```js
// 兼容判断1.
// if(document.documentElement && document.documentElement.scrollTop>=0){
        //     document.documentElement.scrollTop = anchor.offsetTop-100
// }
// if(document.body && document.body.scrollTop>=0){
        //     document.body.scrollTop = anchor.offsetTop-100
// }
// 兼容判断2.推荐(代码可读性)
try{
        document.documentElement.scrollTop = anchor.offsetTop-100
        // safari下 、没有DOCtype会走这里
        document.body.scrollTop = anchor.offsetTop-100
}catch(e){
}
```
## 方法
```
Boolean 'attribute' in obj
    检测对象的自身和原型上是否存在该属性
Boolean obj.hasOwnproperty(attribute)
    检测对象上的自身属性是否存在该属性
Boolean obj.isPrototypeOf(attribute)
    检测对象的原型链上是否存在该属性
Boolean obj instanceof Object
    instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上
    检测Object.prototype是否存在于参数obj
Array Object.getOwnPropertyNames(obj)
    获取对象自身的属性
Object Object.getPrototypeOf(obj)
    ES5的方法，用来替代__prtot__这种非标准写法
    获取obj对象上的原型方法，如果没有返回null
```
1. eval(arr.join("+"))
数组快速相加-得相加之合
2. 数组快速删除
```js
//清空
arr.length=0
//只保留前三个
arr.length=3
```
3.创建长度20的的数组
```js
Array.apply(null,{length:20}) //[undefined, undefined, ***]
```