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

## 笔记
1. 推流-切换摄像图
	```js
    // 切换摄像头
    onSwitchCamera() {
      toPatient({
        organSign: this.$store.state.app.organSign,
        messageBody: {
          patientGuid: this.$store.state.app.patientGuid,
          message: 'SwitchCamera'
        }
      }).then(res => {
        console.log('切换摄像头')
      })
    },
	```
1.30s倒计时
  ```js
  var timer
  const d = new Date()
  clearInterval(timer)
  var count = 30
  timer = setInterval(() => {
    if (count > 28) {
      count = 30 - Math.floor((new Date() - d) / 1000)
      console.log(1,count)
        return
    }
      clearInterval(timer)
      timer = null
      console.log(count)
  }, 1000)
  ```
1. VConsole 线上连续6次调用
  ```js
  //调用
  debug(this.$el)

  //debug.js
  import VConsole from 'vconsole'
  export function debug(el) {
    //如果不是线上环境
    if (process.env.VUE_APP_TITLE !== 'production') {
      new VConsole()
      return
    }
    //线上环境-1s内连续6次点击
    let i = 0
    let timer = null
    el.addEventListener('click', function() {
      i++
      !timer && (timer = setTimeout(() => {
        if (i >= 6) {
          new VConsole()
        } else {
          i = 0
          timer = null
        }
      }, 1000))
    })
  }
  ```
1. WebSocket心跳(连续尝试3次机会，连接成功重置状态)
	```js
    data() {
      return {
        timerHeartbeat: null,//心跳起搏
        freshTotal: 0, // 尝试心跳断开数
        connectNum: 0, // websocket心跳数
      }
    },
    initWebSocket() {
      this.websock = new WebSocket(options.url)
      this.websock.onopen = ()=>{
        this.freshTotal = 0 // 重置断开重连数
        console.log('e', e)
      }
      this.websock.onmessage = ()=>{ // 数据接收
        // websocket心跳数据
        if (typeof e.data === 'number' || !isNaN(Number(e.data))) {
          this.connectNum = e.data
          return
        }
      }
      // 检测websocket心跳
      var connectNum = 0
      this.timerHeartbeat && this.clearHeartbeat()// 停止心跳
      this.timerHeartbeat = setInterval(() => {
        if (!this.$store.state.app.isOpenHeartbeat) {
          console.log('心跳暂停')
          return
        }
        if (this.freshTotal === 3) {
          this.clearHeartbeat()// 停止心跳
        }
        ++connectNum
        // websocket状态为OPEN时，才能发送消息
        this.websock.readyState === 1 && this.websock.send(connectNum)
        // CONNECTING：值为0，表示正在连接；
        // OPEN：值为1，表示连接成功，可以通信了；
        // CLOSING：值为2，表示连接正在关闭；
        // CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
        console.log('检测websocket心跳 \n 当前数：', connectNum, '\n send:', this.connectNum, '\n 断开重连数：', this.freshTotal)
        if (connectNum - this.connectNum < 3) return
        this.connectNum = 0
        this.freshTotal += 1
        this.clearHeartbeat()// 停止心跳
        this.websock.close()
        this.initWebSocket()
      }, 3000)
    },
    clearHeartbeat() { // 停止心跳
      clearInterval(this.timerHeartbeat)
      this.timerHeartbeat = null
    }
    //store.js
    state: {
      isOpenHeartbeat: true, // 是否开启心跳
    },
    mutations:{
      // 开启心跳
      setOpenHeartbeat: (state, value) => {
        state.isOpenHeartbeat = value
      },
      setWebsocketType: (state, value) => {
        // 开启websocket则开启心跳，反之则停止心跳
        state.isOpenHeartbeat = value === 'open'
        state.websocketType = value
      }
    }
	```
1. vue directive 点击时提示无网络
[参考1.](https://segmentfault.com/a/1190000016382323)
[参考2.](https://segmentfault.com/a/1190000016382323?utm_source=tag-newest)
  ```html
  // xx.vue
  <button v-online-click="goInquiry" color="blue"/>
  ```

  ```js
  // main.js
  import onlineClick from '@/directive/onLine'
  Vue.use(onlineClick)

  // disective/onLine
  import { toast } from '@/components/Toast'
  const onlineClick = {
    bind: function(el, binding, vnode, oldVnode) {
      function clickHandler(e) {
        if (!navigator.onLine) {
          toast('无网络连接')
          return false
        }
        // 判断指令中是否绑定了函数
        if (binding.expression) {
          // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
          binding.value(binding.arg)
        }
      }
      // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
      el.__vueClickOutside__ = clickHandler
      el.addEventListener('click', clickHandler)
    },
    unbind(el, binding) {
      // 解除事件监听
      document.removeEventListener('click', el.__vueClickOutside__)
      delete el.__vueClickOutside__
    },
    install: (Vue) => Vue.directive('OnlineClick', onlineClick)
  }
  export default onlineClick
  ```
1. 解决 loading chunk failed 错误
  ```js
  router.onReady(vm => {
    try {
      const LoadingChunkPath = window.sessionStorage.getItem('LoadingChunkPath')

      const path = vm.path
      if (LoadingChunkPath) {
        if (path !== LoadingChunkPath && path !== '/') {
          window.sessionStorage.setItem('LoadingChunkPath', vm.path)
          router.replace(vm.path)
        } else {
          router.replace(LoadingChunkPath)
        }
      }
    } catch (e) {
      console.log(e)
    }
  })
  router.onError(error => {
    const pattern = /Loading chunk (\d)+ failed/g
    const isChunkLoadFailed = error.message.match(pattern)
    const targetPath = router.history.pending.fullPath
    try {
      if (isChunkLoadFailed) {
        const LoadingChunk = window.sessionStorage.getItem('LoadingChunk')
        if (LoadingChunk) {
          window.sessionStorage.setItem('LoadingChunk', LoadingChunk - 0 + 1)
        } else {
          window.sessionStorage.setItem('LoadingChunk', 1)
        }
        if (LoadingChunk - 0 > 1) {
          // 防止 死循环
          return false
        }
        router.replace(targetPath)
        window.sessionStorage.setItem('LoadingChunkPath', targetPath)
        const sa = window.sa
        if (sa && sa.track) {
          sa.track('element_click', {
            page_title: 'LoadingChunk',
            element_type: 'view',
            page_source: targetPath, // 当前路由
            element_name: `刷新页面${LoadingChunk - 0}次` // 尝试 打开次数
          })
        }
      }
    } catch (e) {
      console.log(e)
    }
  })
  ```