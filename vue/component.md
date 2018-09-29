###父组件 控制 子组件 样式
1. 全局控制，容易造成全局污染
2. 使用scoped控制私有样式，但是父组件不能影响子组件
    使用/deep/ 或者 >>>都可以
    即：子组件 /deep/ 子组件样式

```html
    <van-checkbox v-model="checked">复选框</van-checkbox>
```

```js

```

```less
<style lang="less" scoped>
    .van-checkbox /deep/ .van-checkbox__icon{
    }
    .van-checkbox /deep/ .van-checkbox--checked{
    }
</style>
```
### 父组件给子组件传值
####父组件
```html
    <loading :name="name"/>
```
```js
    this.name='hi'
```
####子组件
props:{
    name:{
        type:string,
        default:''
    }
}

### 父组件调子组件方法
####父组件
使用模板
```html
    <loading ref="loading"/>
```
js引用
```js
import Loading from '../../components/loading/index.vue';
components:{
    loading:Loading,
}
```
调用
```js
    this.$refs.loading.show();
```
####子组件
没啥好些的直接引用就好

### 子组件调父组件方法
####父组件监听子组件的child的事件
```html
    <birthday @child="changeBirthday"/>
```
```js
    methods:{
        changeBirthday(val){
            console.log(val);
        }
    }
```
#####子组件
```js
    methods:{
        sub(val){
            // 子组件通知父组件
            this.$emit("child",val);
        }
    }
```