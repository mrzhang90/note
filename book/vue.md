##computed和watch的区别：
**[参考](https://segmentfault.com/a/1190000012948175)**
**computed**
同步
计算值
作用：就是简化tempalte里面{{}}计算、处理props、$emit的传值
类似data属性，有set和get方法，并可自定义set和get
有缓存性，依赖于data，如果data变化，调用计算；如果data没有变化，那么计算属性的值是从缓存中来的，所以不会再次执行
性能要好于watch

**watch**
异步
观察的动作
作用：监听props，$emit或本组件的值执行异步操作
无缓存性，页面重新渲染时值不变化也会执行
昂贵的操作响应不断变化的数据，因为主要

**computed vs method**