## Module模式
```js
function Module(){
  var privateVar='My name is privateVar',
    privateMethod=function(){
      return 'My name is privateMethod'
    };
  return {
    publicVar:privateVar,
    publicMethod:function(){
      console.log('My name is ,I负责调用私有')
      return privateMethod()
    }
  }
}
//通过对象字面量表示法，访问共有方法
console.log('变量属性是：',Module().publicVar)
console.log('变量属性是：',Module().publicMethod())
```
优点
私有方法，外部无法访问，只能通过内部public方法访问
缺点
无法在方法创建之后，再添加私有成员
私有成员有bug，只能修改封装的方法
无法为私有成员创建自动化单元测试
总结，私有方法无法像最初时的那么灵活