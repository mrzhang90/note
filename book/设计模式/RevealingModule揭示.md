## Revealing Module 揭示模式
**优点**
该模式通过暴露出的方法，很容易指出哪些函数和变量可以被公开访问，改善可读性
**缺点**
采用RevealingModule模式比Module模式更脆弱
引用私有变量的共有对象成员要遵循无补丁规则
```js
var myRevealingModule=function(){
  var privateVar='john',
    publicVar='Hey there!';
  function privateFunction(){
    console.log('name：'+privateVar);
  }
  function publicSetName(name){
    privateName=name
  }
  function publicGetName(){
    return privateName
  }
  return {
    setName:publicSetName,
    getName:publicGetName,
    greeting:publicVar
  }
}
var mrm=myRevealingModule()
console.log('欢迎：',mrm.greeting)
mrm.setName('Zhang John')
console.log('设置名字')
console.log('获取名字：',mrm.getName())
```