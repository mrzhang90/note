###
父组件 控制 子组件 样式
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