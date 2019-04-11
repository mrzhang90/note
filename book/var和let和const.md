##var
变量提升
全局作用域和函数级作用域
```js
a=1;
var a;
console.log(a) //1
console.log(window.a)
```
##let
有hoisting变量提升，有TDZ(临时死区)
块级作用域
变量值可以改变，没有限制
```js
let a=1;
console.log(window.a)

//这里给人的感觉是不会变量提升
b=1
let b;
console.log(b);//b is not defined
//但是看这里，如果没有变量提升，那么外面的b=2,里面的b=3才对
let b=1
{
	b=2; //b is not defined 这里报错应该还是因为变量提升影响的
	let b=3
	console.log('inner',b)
}
//下面是来自知乎的解释，参考地址：https://zhuanlan.zhihu.com/p/27558914
let a = 1
{
	//基于上面的代码，为什么a提升，但还是报错了
	//应该有TDZ的缘故，它的含义大致可以解释为：在某个时间点之前，你不能访问某个变量，即使这个变量已经存在了
  let a // TDZ 开始的地方就是这里
  'start a TDZ'
  a = 2 // 由于 a = 2 在 TDZ 中，所以报错
  a // TDZ 结束的地方就是这里
  'end a TDZ'
}
```
##const
块级作用域
变量值不能改变，但是复合类型的变量(数组和对象)，变量名只能保证引用类型的指向地址不变，也就是说引用类型的值可以改变
```js
const a;//error 缺少初始化的常量

//数组
const arr=[1,2,3]
const obj={a:1}
//不能改变引用类型的地址
arr=[1] //Uncaught TypeError
arr=1   //Uncaught TypeError
arr={a:1} //Uncaught TypeError
//只能改变引用类型的值
arr[0]=0
arr.length=2
obj.a=2
obj['b']=3
```
**也可以使用Object.freeze冻结对象，使复合类型也不能修改**
冻结对象新增属性、修改属性、删除属性
```js
//递归遍历
var constantize=(reference)=>{
  // 数组
	if(Array.isArray(reference)){
		Object.freeze(reference)//冻结所有的数组
		reference.forEach(item=>{
			constantize(item)
		})
	}else if(reference.constructor===Object){//对象
		Object.freeze(reference)//冻结所有的对象
		Object.keys(reference).forEach(key=>{
			constantize(reference[key])
		})
	}
	return reference
}
const obj=constantize({a:1,b:[0],c:{'c1':1}})
const arr=constantize([1,2,3,[0],{'b':1}])
//尝试修改冻结后的对象和数组
obj['b'][0]='b0'
obj['c']['c1']='c1'
arr[3][0]=30
arr[4]['b'][0]='b0'
console.log('obj：',obj) //没有改变
console.log('arr：',arr) //没有改变
```