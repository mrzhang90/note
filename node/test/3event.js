//1.引入events对象，创建eventEmitter对象
var events = require('events');
var eventEmitter = new events.EventEmitter();

//2.绑定事件处理程序
var connctHandle = function connected(){
	console.log('connected被调用！！！')
}
//完成事件绑定
eventEmitter.on('connection',connctHandle);//事件处理名称、事件处理回调

//3.触发事件
eventEmitter.emit('connection');
console.log('程序执行完毕！')