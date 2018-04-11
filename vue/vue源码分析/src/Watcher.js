function Watcher(vm, node, name, type) {
    Dep.target = this;
    this.name = name;//text
    this.node = node;//<input type=“text” id="aa" v-model="text"/>
    this.vm = vm;//new vue的实例
    this.type = type;//value
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    update: function() {
        this.get();
        //改元素自身的value
        this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    // 获取data的属性值
    get: function() {
        this.value = this.vm[this.name]; //触发相应属性的get
    }
}
