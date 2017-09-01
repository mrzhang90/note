var Hello=function(){
	var name;
	this.setName=function(argName){
		name=argName;
	}
	this.getName=function(){
		console.log('hello,'+name)
	}
}
module.exports=Hello;