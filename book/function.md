每个函数都是Function类型的实例
ECMA上，函数是功能完整的对象
## 定义函数的方式：
**1、函数声明语法**  
```js
function sum(a,b){}
```
**2、函数表达式**  
函数表达式后面有逗号，就像声明变量
```js
var sum=function(a,b){},
```
**3.Function构造函数**  
Function构造函数可以接收任意数量的参数，最后一个参数是函数体，前面的参数则是枚举出了新函数的参数  
这种写法不推荐，因为会有性能问题，它比传统函数要慢。因为这种语法会导致两次解析，第一次解析常规ECMAScript代码，第二次解析传入构造函数的字符串。
```js
//也算函数表达式
var sum = new Function("a","b","return a+b");//不推荐
```
## 函数是引用类型，有属性和方法
函数默认有length属性读取形参的长度，name属性读取函数名，也可以自定义函数
```js
var fn=function(){}
fn.type=1

fn.type   //1
fn.length //0
fn.name   //'fn'
```
## 函数是对象，函数名就是函数的指针
```js
var sum=function(a,b){}
var add=sum
add //ƒ (a,b){}
sum=null
add //ƒ (a,b){}
```
## eval
1. eval是一个函数，并且只有一个string类型的参数
2. eval会将string参数，用js解析并执行
  ```js
  eval("alert('hello world')")
  ```
3. eval转为json对象,圆括号的目的是为了迫使eval在处理JavaScript代码的时候将括号内的表单式转为对象。
  ```js
  //例如，直接输出"{}",JavaScrip将大括号识别为JavaScript代码块的开始和结束标记，那么{}将会被认为执行了空语句
  eval("{}") //undefined
  //加上圆括号,括号内的代码就被转为对象了
  eval("({})") //{}
  //这样就可以利用圆括号，将大括号内的转为对象
  var obj="{a:1,b:2}"
  eval("("+obj+")")
  ```
## 箭头函数
箭头函数没有prototype
```js
var fn=()=>{}
fn.prototype //undefined
```