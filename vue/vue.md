vue是响应式的，当你在控制台通过app.data=XXX时，会自动调用set修改data属性值
##vue-element-admin
**权限分析**
```
1. 在router.js里定义了两种路由constantRouterMap和asyncRouterMap
1. 在store的permissios.js里根据token判断登录用户的身份，把可以展示的路由存到state的addRouters数组里
1. 在src的permission.js里引入vue-router，通过router.addRouters方法把store的addRouters推倒vue-router里
1. main里引入permission.js
```
1. router.js
    ```js
    //不需要动态判断权限的路由，如登录页、404
    constantRouterMap 
        //会通过main在new Vue时引入
    //需要动态判断权限并通过 addRoutters 动态添加的页面
    asyncRouterMap
        //设置权限 meta: {roles: ['admin', 'editor'] }
    ```
1. sotre/modules/permissios.js
    ```js
    state:{
        //通过校验的 所有要展示的路由
        addRouters:[]
    },
    mutations：{
        SET_ROUTERS(routers){
            state.addRouters = routers
        }
    },
    actions:{
        GenerateRoutes({commit},data){
            if(admin){
                //返回全部 asyncRouterMap
            }else{
                //filter asyncRouterMap
            }
            //把constantRouterMap与动态路由合并
            commit('SET_ROUTERS',routers)
        }
    }
    ```
1. permission.js
    ```js
    router.beforeEach((to,form,next)=>{
        if(token){
            if(登录路由) **
            else{
                //获取     store->GetUserInfo
                //然后获取 store->GenerateRoutes
                //然后 动态添加可访问路由表
                router.addRoutes(store.getters.addRouters)
            }
        }else{
            if(登录白名单) next();
            else //重定向登录页
        }
    })
    ```
1. main.js
    ```js
    new Vue时引入 constantRouterMap()
    同时导入 src/permissios.js,这里已经准备好，会自动注入到路由
    ```
##vue
1. 由于js限制，vue只能检测的对象的修改，不能检测新属性被添加到对象上(this.obj.aa=1)也无法侦测到一个属性从对象中删除了(delete this.obj.aa),为此：vue提供了，**
1. 由于js限制，vue不能检测到数组修改,例如vm.arr[index]=nVal;或vm.arr.length=length
    ```js
    //使用vue的set方法
    vm.set(obj.arr,index,newValue)
    ```
1. vue Bus-eventBus事件中心
    兄弟组件传值
    有一种方法是参考github上，"ComponentsMediator"全局存一个对象，再暴露出register、send、remove
    **另一种就是bus**
    ```js
    //定义全局
    vue.prototype.$bus=new Vue();
    //emit通知
    this.$bus.emit('fn',{key:value})
    //on监听
    this.$bus.on('fn',callback)
    //off销毁
    this.$bus.off('fn',callback)
    ```
1. .native .sync
1. slot-scope
    ```
    // 自2.6.0起，已废弃slot-scope
    // slot-scope接受prop,然后scope存在于template作用域中
    // slot="default"为默认，可省略
    <template slot="default" slot-scope="scope"></template>
    ```
1. 插件
1.  watch
    ```js
        var unwatch = watch(string|function,callback,[options])
        //options
        //deep为true深度监听对象内部
        //immediate为true立即触发callback，默认要等到数据改变才会触发
        //返回值unwatch可以调用来取消监听
        watch:{
            fn:{
                handler(){},
                dep:true,
                immediate:true
            }
        }
    ```
1. component is是用来绑定组件，可以动态切换组件，如果需要缓存用keep-alive
    [keep-alive](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/tags-view.html#visitedviews-cachedviews)
    ```html
    //缓存组件
    //cachedViews : 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存
    <keep-alive :include="cachedViews">
    //组件切换
    <component :is="组件名">
    </keep-alive>
    ```
1. props的validator可以校验自定义组件
    ```html
    //自定义组件
    <Test btnv="small"></Test>
    ```
    ```js
    props:{
        validator(val){
            return ['size','middle','bid'].indexOf(val)!==-1?true:false
        },
        default:'middle'
    }
    ```
1. nextTick
    ```js
    mounted(){
        //确保DOM获取；在修改数据之后立即使用这个方法，获取更新后的 DOM
        this.$nextTick(()=>{
            //code
        })
        //或 then方式
        this.$nextTick().then()
    }
    //nextTick的await用法
    methods:{
        async fn(){
            await this.$nextTick();
        }
    }
    ```
1. mixin
    全局混入对象,
    同名钩子函数混合一个数组(created,mounted),优先执行mixin
    值为对象的选项混合一个对象(watch,methods,components,directives)，键名冲突，组件覆盖mixin
    **vm.extend()也是同样的合并策略**
    ```js
    var vm=new Vue({
        mixin:[mixin]
    })
    ```
1. directives
    ```js
    //调用
    directives: {
        inputLog
    }
    //封装
    let focus={}
    focus.install=function(Vue){
        Vue.directives('focus',{
            bind(el, binding, vnode,oldVnode) {},
            //binding:{
                //name,指令名
                //value,指令绑定值
                //oldValue,指令绑定的前一个值
                //expression,字符串形式的指令表达式
                //arg,传给指令的参数
                //modifiers
            //}
            //vnode虚拟节点
            //oldVnode上一个虚拟节点
            inserted(el, binding, vnode) {},
            update(el, binding){}
            unbind(el, binding){}
        })
    }
    export default focus;
    ```
##VUEX
1. mapMutatios是mutatios的辅助函数
相当于this.$store.commit('a')
...mapMutatios(['a','b'])
...mapMutatios({
    'bieMing':'a',
    'bm2':'b'
})
1. mapGetters辅助函数是将store的getters映射到组件生命周期中
相当于this.$store.state.getCount
...mapGetters(['getCount'])
##nuxt
```js
//  To get started:
    cd offical_nuxtapp
    npm run dev

//   To build & start for production:
    cd offical_nuxtapp
    npm run build
    npm start

npm run generate
```
##vant笔记
弹出提示，然后跳转页面
```js
    Dialog.alert({
        message: '弹出一段消息'
    }).then(() => {
        this.$router.push('address');
    });
```
##刷新当前页
``` js
router.push({
    //path:router.currentRoute.fullPath, // 获取当前连接，重新跳转
    path:route.fullPath, // 获取当前连接，重新跳转
    query:{
        _time:new Date().getTime()/1000 // 时间戳，刷新当前router
    }
})                    
    window.location.reload();
```

##锚点定位
```js
goTop(index){
    let anchor=this.$el.querySelector('#anchor'+index)
    // 兼容判断1.
    // if(document.documentElement && document.documentElement.scrollTop>=0){
    //     document.documentElement.scrollTop = anchor.offsetTop-100
    // }
    // if(document.body && document.body.scrollTop>=0){
    //     document.body.scrollTop = anchor.offsetTop-100
    // }
    // 兼容判断2.推荐(代码可读性)
    try{
        document.documentElement.scrollTop = anchor.offsetTop-100
        // safari下 、没有DOCtype会走这里
        document.body.scrollTop = anchor.offsetTop-100
    }catch(e){
    }
```
##vconsole
只在本地和测试环境生成调试按钮，线上环境不会引入调试
```js
//安装
npm install vconsole
```
```js
// 引入
import vconsole from "vconsole";
// 开发环境或测试环境
if(process.env.NODE_ENV === 'development' || base==='http://practice.dev.bkenglish.cn'){
    // new一个vconsole实例
    new vconsole();
}

```
##动态生成海报活动图

html引入脚本
``` html
    <script src="../static/js/html2canvas.js"></script>
```
vue中直接调用，这里分两步
第一步.html2canvase把html布局转成canvas
第二步.把canvas转成img base64的海报图片
```js
    mounted() {
        //html布局转成canvas
        html2canvas(document.getElementById("to_canvas")).then((canvas)=>{
            this.showCanvas=true;
            // document.getElementById('canvas').appendChild(canvas);
            var ctx = canvas.getContext('2d');

            //canvas转base64图
            var dataImg = new Image()
            dataImg.src = canvas.toDataURL('image/png')
            document.getElementById('canvas').appendChild(dataImg) // 长按图片保存
        });
    }
```
参考：
[基于canvas生成图片](https://juejin.im/post/5aefc0456fb9a07abc29d36d)
###统计每个页面停留时间
```js
import {
  // 删除对象的某项
  omit
} from "./common/util";
// 用来统计用户页面停留时间
let routeData={}
// 每次路由切换后 存储一下上次路由访问的时间
router.beforeEach((to, from, next) => {
  // 存储用户访问当前路由
  routeData[to.name]={
    'page_path':to.name,
    'duration':new Date().getTime()
  };
  // 首次访问路由，没有记录，则不会有任何操作
  // 反之，如果每次切换路由，计算上一次路由访问时间 并发送给接口
  if(routeData[from.name]){
    // 计算时间戳-毫秒换算秒
    routeData[from.name]['duration']=Math.ceil((new Date().getTime()-routeData[from.name]['duration'])/1000)
    // 接口存储用户停留时间
    apiMarkPageTime(routeData[from.name]).then((result)=>{
      // 删除对象中的已用过的key
      routeData=omit(routeData,[from.name])
    })
  }
}
```
```js
// util.js
// 删除对象的某项
export const omit = (obj, uselessKeys) =>{
	let newObj={}
	Object.keys(obj).forEach(key=>{
		if(!uselessKeys.includes(key)){
			newObj[key]=obj[key];
		}
	})
	return newObj;
}
```
### 单页面引入统计代码
[百度统计开发平台](https://tongji.baidu.com/open/api/more?p=ref_trackPageview)
[CNZZ开发平台](https://developer.umeng.com/docs/67963/detail/73619)
```js
// index.html head头部引入
//百度统计和CNZZ
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?appid";

    var cz = document.createElement("script");
    cz.src = "https://s22.cnzz.com/z_stat.php?id=appid&web_id=appid";

    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    s.parentNode.insertBefore(cz, s);
})();
```
```js
// main.js
// 腾讯统计代码
import MtaH5 from 'mta-h5-analysis';
// 初始化-腾讯统计代码
MtaH5.init({
  "sid":'appid', //必填，统计用的appid
  // "cid":'********', //如果开启自定义事件，此项目为必填，否则不填
  "autoReport":0,//是否开启自动上报(1:init完成则上报一次,0:使用pgv方法才上报)
  "senseHash":1, //hash锚点是否进入url统计
  "senseQuery":1, //url参数是否进入url统计
  "performanceMonitor":1,//是否开启性能监控
  "ignoreParams":[] //开启url参数上报时，可忽略部分参数拼接上报
});
```
```js
//route.js
// 腾讯统计代码
import MtaH5 from 'mta-h5-analysis';
router.afterEach((to, from, next) => {
  setTimeout(()=>{
    // 线上
    if(process.env.NODE_ENV === 'production'){
      //fullPath用来赋给百度和cnzz
      if (to.fullPath) {
        // 百度统计
        _hmt.push(['_trackPageview', '/#' + to.fullPath]);
        // cnzz
        if (window._czc) {
          window._czc.push(['_trackPageview', to.fullPath])
        }
        // 腾讯统计-页面上报
        // 判断是测试环境的话，也不要执行
        // base.indexOf("bkenglish.******.cn")!=-1 && MtaH5.pgv();
        MtaH5.pgv();
      }
    }
  },0)
})
```
### 全局异常捕获
```js
//log.js - 封装错误日志
import axios from "axios";
import storage from "./storage";
// 创建一个新的axios实例-这是为了日志接口出错-不被全局axios捕获，那样就报错死循环了
const httpServer = axios.create();
/**
 * 错误日志
 * @param {String} name 错误标题
 * @param { Object } action 错误描述
 * @param { Object } info 错误信息
 */
export const logError = (name='', action='', info='') => {
  let api_token=storage.getItem('token');
  // 如果token不存在，就不记错了。反正也记不上，接口是要token参数的
  if(!api_token) return;
  // 只有线上，才会记录log
  if (process.env.NODE_ENV !== 'production') return;
  if (!info) {
    info = 'empty'
  }
  var device=''
  try {
    device = window.navigator.userAgent;
  } catch (e) {
    device=e.message;
  }
  // let time = new Date().toLocaleString();
  if (typeof action === 'object') {
    action=JSON.stringify(action)
  }
  // fundebug.notifyError(info, { name, action, device, time })
  info = info!='' ? info : {};
  if (typeof info === 'object') {
    // 记录错误的当前路径和用户token
    Object.assign(info,{
      url:location.href,
      api_token
    })
    info = JSON.stringify(info)
  }
  // console.log('time:', time, '\n title:', name, '\n action:', action, '\n info:', info, '\n device:', device)
  httpServer.post('/api/h5/user/custom/log', {
    title:'购课：'+name,
    action,
    info,
    device,
    api_token
  })
}
```
```js
    //main.js - vue全局方法(捕获组件生命周期钩子里的错误)
    import { logError } from './common/log';
    if(process.env.NODE_ENV === 'production'){
        Vue.config.errorHandler = function (err, vm, info) {
            // handle error
            // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
            // 只在 2.2.0+ 可用
            logError('errorHandler',info,{msg:err.message,data:err.stack})
        }
    }
```
```js
    //http.js - 接口错误捕获
    //接口地址
    let address=url;
    //捕获错误消息
    logError('api', address,{msg:msg,data:response.data});
```
###父组件 控制 子组件 样式
1. 全局控制，容易造成全局污染
2. 使用scoped控制私有样式，但是父组件不能影响子组件
    使用/deep/ 或者 >>>都可以
    即：子组件 /deep/ 子组件样式

```html
<van-checkbox v-model="checked">复选框</van-checkbox>
```
```less
<style lang="less" scoped>
    .van-checkbox /deep/ .van-checkbox__icon{
    }
    .van-checkbox /deep/ .van-checkbox--checked{
    }
</style>
```
### 父组件给子组件传值、调子组件方法
**父组件**
```html
//props
<loading :name="name"/>
//refs
<loading ref="loading"/>
```
三种调用方式
```js
//props
this.name='hi'
//refs
this.$refs.loading.show()
// $children(下标是根据父组件里有多少个子组件，按照子组件的的索引决定的)
this.$children[0].show();
```
**子组件**
```js
//props
props:{
    name:{
        type:string,
        default:''
    }
}
//refs
import Loading from '../../components/loading/index.vue';
components:{
    loading:Loading,
}
methods:{
    // 父组件通过refs调用
    show(){}
}
```
### 子组件调父组件方法
**父组件监听子组件的child的事件**
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
**子组件**
```js
    methods:{
        sub(val){
            // 子组件通知父组件
            this.$emit("child",val);
        }
    }
```
##scroll-滚动导航定位
    beforeRouteLeave

    定义navigator组件
        页面滚动时导航浮动定位
        页面滚动时，给导航链接添加样式
    点击导航，页面滚动到相应位置
1. 创建navigator.vue组件
    ```html
    <template>
    <div class="navigate_warp h190">
            <ul id="navigate" class="navigate w690 h190 auto br20 flex f30 cg3 b" :class="{fixedScroll:isfixedScroll}">
                <li class="j_nav_li flex1 nav_li flex l_center v_center" @click="goTop(1)">
                    <span v-show="isfixedScroll">课程导学</span>
                </li>
                <li class="j_nav_li flex1 nav_li flex l_center v_center" @click="goTop(2)">
                    <span v-show="isfixedScroll">亲子共学</span>
                </li>
                <li class="j_nav_li flex1 nav_li flex l_center v_center" @click="goTop(3)">
                    <span v-show="isfixedScroll">学习打卡</span>
                </li>
            </ul>
        </div>
    </template>
    ```
    ```js
    <script>
    import _throttle from 'lodash/throttle'
    export default {
        // 获取元素-课程导学、亲子共学、学习打卡
        props:['course_el'],
        data(){
            return {
                // 存储scroll绑定的事件-页面卸载时需要
                scrollFn:null,
                // 存储导航元素
                navigateEle:null,
                // 导航是否固定定位
                isfixedScroll:false,
                position: {scrollTop: 0, scrollLeft: 0},
            }
        },
        mounted(){
            this.navigateEle=this.$el.querySelector('#navigate');
            this.position.scrollTop=this.navigateEle.offsetTop;
            this.position.height=this.navigateEle.clientHeight;
            // 存储scroll绑定的事件-页面卸载时需要
            this.scrollFn=_throttle(this.onScroll,300)
            // 节流-一定间隔时间内调用，使用鼠标滚动
            window.addEventListener('scroll',this.scrollFn)
        },
        methods:{
            // scroll事件绑定
            onScroll(e){
                // console.log(this.course_el)
                let _top=(document.documentElement.scrollTop || document.body.scrollTop);
                // 导航距顶部距离
                if(this.position.scrollTop <= _top){
                    // 导航贴上顶部了，导航浮动
                    this.isfixedScroll=true;
                    // 导航贴上顶部了，那么很快就会进入三大块的区域了
                    for(let item of this.course_el){
                        if(item.top <= _top+this.position.height+100){
                            // 通知父级-当前索引的导航要添加active样式
                            this.$emit('navActive',item.index);
                            break;
                        }
                    }
                }else{
                    // 导航距顶部还有空间,选中的样式删除-通知父级
                    this.$emit('navActive',-1);
                    // 导航距顶部还有空间，导航取消浮动
                    this.isfixedScroll=false;
                    return;
                }
                
            },
            // 页面离开-卸载scroll-父组件通知
            unbind(){
                window.removeEventListener('scroll',this.scrollFn);
            },
            // 锚点跳转
            goTop(index){
                this.$emit('goTop',index)
            }
        }
    }
    </script>
    ```
    ```css
    <style lang="less" scoped>
    @file_path:"../../assets";
    @import "@{file_path}/css/util.less";
    // 这个元素是用来占位的，等.navigate类添加fixed定位后，这里占位还在，页面就不会晃动
    .navigate_warp{
        .navigate{
            // background-color:#ffffff;
            .bgImg("@{file_path}/images/day5/navigate.png",0 0);
            box-shadow: 0px 0px 14px 2px rgba(18, 181, 216, 0.42);
            &.fixedScroll{
                height:90px;
                position: fixed;top:10px;left:50%;z-index:9;
                transform:translateX(-50%);
                background-image: linear-gradient(-45deg, 
                #fdffff 0%, 
                #ffffff 100%);
            }
            li{
                position: relative;
                &:before{
                    content:"";
                    position:absolute;left:50%;bottom:0;
                    transform:translateX(-50%);
                    width: 0;
                    height: 7px;
                    border-radius: 40px;
                    background-image: linear-gradient(90deg, 
                    #f7c313 0%, 
                    #fe8501 100%);
                }
                &.active{
                    // color: #215fff;
                    color: #fe8501;
                    &:before{
                        width: 139px;
                        transition: .6s;
                    }
                }
            }
        }
    }
    </style>
    ```
1. 父组件
    1. 引用
        ```js
        import Navigator from "../../components/day5/navigate";
        components:{
            // 导航
            Navigator,
        }
        ```
    1. 使用
        ```html
        <Navigator ref="navigate" :course_el="course_el" @navActive="navActive" @goTop="goTop"></Navigator>
        ```
        ```js
        data(){
            // 获取元素-课程导学、亲子共学、学习打卡
            this.course_el=null;
        }
        mounted(){
            // 获取元素-课程导学、亲子共学、学习打卡
            this.course_el=[
                {
                    'index':2,
                    'el':document.getElementById('anchor3'),
                    'top':document.getElementById('anchor3').offsetTop,
                },
                {
                    'index':1,
                    'el':document.getElementById('anchor2'),
                    'top':document.getElementById('anchor2').offsetTop,
                },
                {
                    'index':0,
                    'el':document.getElementById('anchor1'),
                    'top':document.getElementById('anchor1').offsetTop,
                },
            ]
        }
        // 组件内的路由守卫-路由离开时触发
        // 替代destory生命周期
        beforeRouteLeave(to, from, next){
            // 页面要离开时，通知navigator组件，卸载scroll事件
            this.$refs.navigate.unbind();
            next();
        },
        menthods:{
            navActive(index){
                let _c_el=this.$el.querySelectorAll('.j_nav_li');
                // 返回顶部时，导航距顶部还有空间时
                for(let i=0;i<3;i++){
                    if(i==index){
                        addClass(_c_el[index],'active');
                    }else{
                        removeClass(_c_el[i],'active');
                    }
                }
            },
            // 锚点跳转
            goTop(index){
                let anchor=this.$el.querySelector('#anchor'+index)
                // 先跳一下，因为top为0时，if肯定阶段走不到，但else兼容有问题，就歇菜了
                // 所以我先跳一下，如果if兼容性没问题，那么就肯定走if了，或者必然走else
                document.documentElement.scrollTop=1;
                // 兼容性判断，如果if不兼容，就走else
                if(document.documentElement.scrollTop>0){
                    document.documentElement.scrollTop = anchor.offsetTop-100
                }else{
                    document.body.scrollTop = anchor.offsetTop-100
                }
            },
        }
        ```