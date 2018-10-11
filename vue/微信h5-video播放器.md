父级引用
```html
<!-- 安卓下，给页面100vh的高度，视频播放只显示一半，很诡异 -->
<!-- 我的解决方案是：判断安卓下高度给双倍 -->
<div :class="{double_h:!isiOS}">
    <Video ref="video" :videoAddress="videoAddress" @pauseing="pauseing"/>
</div>
```
```CSS
<!-- 使video充满 -->
video{object-fit: fill;}
<!-- 安卓下，高度给双倍 -->
.double_h{
    height:200vw;
}
```
```js
import Video from '../../components/video/player';
// Video组件
components:{
    Video,
}
mounted(){
    // 视频地址
    this.videoAddress='http://p8ikjmme8.bkt.clouddn.com/wetchat/server/media/new_camp_course导学视频.mp4'
}
methods:{
    // 这里通知子级video开始播放
    play(){
        this.showVideo=true;
        this.$refs.video.play();
    },
    // 这里是监听子级改动 然后做出相应的改变
    pauseing(){
        this.showVideo=false;
    }
}
```
子级video
创建player.vue,前提是引用Tcplayer.js
```
<template>
<div class="">
    <div class="video_manage progress">
        <div class="play" :class="{playing:playing}" @click="changePlay"></div>
        <div class="time">{{formatTime.min}}</div>
        <div class="slider" @touchstart.stop.prevent="handleTouchStart">
            <div class="percent"></div>
            <div class="point"></div>
        </div>
        <div class="time">{{formatTime.max}}</div>
    </div>
    <div class="custom_video full_none" id="tcplayer"></div>
    <Dialog ref="dialog" >
        <div class="pl30 pr30">
            <div class="body_cont">您当前处于移动网络</div>
        </div>
        <div class="h65"></div>
    </Dialog>
</div>
</template>

<script>
import {
    isiOS
} from "../../common/device";
import {
    double
} from "../../common/date";
import storage from "../../common/storage";
import Network from "../../common/network";
import Dialog from '../dialog/dialog';
// const AUTH_URL = process.env.NODE_ENV === 'production' ?
//     "/service/assets/images" :
//     "../../../static/images";
export default {
    // 接受父组件的值
    props: {
        videoAddress: String,
        //   required: true
    },
    components:{
        Dialog
    },
    data: function () {
        return {
            dp: null,
            timer: null,
            //流量弹窗
            // dialogShow: false,
            options: '',
            tcplayer: null,
            progress:{},
            // 默认鼠标没有按下
            mousedown:false,
            playing:false,
            maxTime:0,
            formatTime:{
                min:0,
                max:0
            }
        }
    },
    mounted() {
        this.progress={
            progress:document.querySelector('.progress'),
            slider:document.querySelector('.slider'),
            percent:document.querySelector('.percent'),
            point:document.querySelector('.point'),
        }
        if(isiOS){
            this.progress.progress.style.bottom="0";
            // this.progress.progress.style.display="none";
        }
    },
    watch: {
        videoAddress(url) {
            console.log('url', url)
            //切换播放前，先销毁一下
            this.destroy();
            this.init(url);
        }
    },
    methods: {
        scrub(num){
            // console.log(e)
            // // console.log(e.offsetX , progress.offsetWidth,this.tcplayer.duration(),e.offsetX / progress.offsetWidth,(e.offsetX / progress.offsetWidth) * this.tcplayer.duration())
            // let scrubTime;
            // if(e.offsetX ){
            //     console.log(1,e.offsetX)
            //     scrubTime = (e.offsetX / this.progress.progress.offsetWidth) * this.tcplayer.duration();
            //     console.log(e.offsetX , this.progress.progress.offsetWidth,this.tcplayer.duration(),scrubTime)
            // }else{
            //     console.log(2,e.pageX)
            //     scrubTime = (e.pageX / this.progress.progress.offsetWidth) * this.tcplayer.duration();

            //     console.log(e.pageX , this.progress.progress.offsetWidth,this.tcplayer.duration(),scrubTime)
            // }
            this.tcplayer.currentTime(num)
        },
        handleProgress(num){
            this.progress.percent.style.width=num;
            this.progress.point.style.left=num;
        },
        handleTouchStart(e) {
            this.mousedown=true;
            // this.setValue(e.touches[0]);

            document.addEventListener('touchmove', this.handleTouchMove);
            document.addEventListener('touchup', this.handleTouchEnd);
            document.addEventListener('touchend', this.handleTouchEnd);
            document.addEventListener('touchcancel', this.handleTouchEnd);

            // e.preventDefault();
            // this.onDragStart(e);
        },
        handleTouchMove(e) {
            let value=this.getProgressValue(e.changedTouches[0]);
            this.handleProgress(value*100+'%');

        },
        handleTouchEnd(e) {
            // if(this.mousedown){
                let value=this.getProgressValue(e.changedTouches[0]);

                // console.log('键盘抬起，开始监听开始：：',this.tcplayer.currentTime(),value * this.maxTime)
                this.tcplayer.currentTime(value * this.maxTime);
                // console.log('curt改变后：：',this.tcplayer.currentTime())
                this.handleProgress(value*100+'%');
            // }
            this.mousedown=false;
            document.removeEventListener('touchmove', this.handleTouchMove);
            document.removeEventListener('touchup', this.handleTouchEnd);
            document.removeEventListener('touchend', this.handleTouchEnd);
            document.removeEventListener('touchcancel', this.handleTouchEnd);
            // this.onDragStop(e);
        },
        // 从点击位置更新 value
        getProgressValue(e) {
            const $slider = this.progress.slider;
            const $point = this.progress.point;
            let value = (e.clientY - $slider.offsetLeft) / ($slider.offsetWidth-$point.offsetWidth/2);
            // console.log('value::',e.clientY,$slider.offsetLeft,$point.offsetWidth,'max:',this.maxTime/1000,value);
            // value = parseFloat(value.toFixed(5));
            if(value<0){
                value=0
            }else if(value>1){
                value=1
            }
            
            return value;
        },
        init(url) {
            if (url) {
                var that = this;
                this.options = {
                    mp4: url,
                    // coverpic: AUTH_URL + '/bg_cover.png',
                    autoplay: false,
                    live: false,
                    width: "100%",
                    height: "100%",
                    volume: 0,
                    x5_type: "h5",
                    x5_fullscreen: false,
                    x5_orientation: 1,
                    // default||'' 显示默认控件，none 不显示控件，system 移动端显示系统控件
                    controls: 'none',
                    // controls:isiOS?"system":"none",
                    wording: {
                        2032: "请求视频失败，请检查网络",
                        2048: "请求m3u8文件失败，可能是网络错误或者跨域问题"
                    },
                    listener: function (msg) {
                        if(msg.type=="loadedmetadata"){
                            that.maxTime=this.duration()<1 ? 123.84 : this.duration();
                            that.formatTime.max=double(parseInt(that.maxTime/60))+":"+double((parseInt(that.maxTime%60)));
                        }
                        else if (msg.type == "playing") {
                            that.playing=false;
                            //判断是够允许流量播放
                            if (storage.getItem('allowFlow') != "allow") {
                                // 检测是否为流量状态
                                Network.network().then(isWifi=>{
                                    // 如果是流量状态则弹出流量提醒
                                    console.log('uswifi',isWifi)
                                    if(!isWifi){
                                        that.showToast();
                                    }
                                })
                            }
                            storage.setItem('allowFlow', "allow")
                        } else if (msg.type == 'fullscreen') {
                            return false;
                        } else if (msg.type == 'pause') {
                            that.playing=true;
                            // 当暂停，切换封面图UI
                            // that.$emit('pauseing',true);
                        } else if (msg.type == "ended") {
                            try {
                                // 播放完成，切换到封面图UI
                                that.$emit('pauseing',true);
                            } catch (e) {}

                            // var haveRead = that.getHaveRead();
                            // if (haveRead) {
                            //     let arr = [];
                            //     try {
                            //         arr = haveRead.filter(v => v.indexOf(0) != -1 || v.indexOf(1) != -1 || v.indexOf(2) != -1 || v.indexOf(3) != -1);
                            //     } catch (e) {}
                            //     if (arr.length == 4) {
                            //         //说明全部读完
                            //         that.$parent.$parent.alerShare();
                            //     }
                            // }
                        } else if(msg.type=='timeupdate'){
                            // mousedown为true，说明用户在快进,那就暂停执行监听
                            if(that.mousedown){
                                return;
                            }
                            console.log('监听以：',this.currentTime(),that.tcplayer.currentTime())
                            let currentTime=this.currentTime();
                            let duration=this.duration();
                            // let progress=document.querySelector('.progress');
                            // console.log(currentTime,duration)
                            // progress.style.width=(currentTime/duration)*100+'%';
                            that.formatTime.min=double(parseInt(currentTime/60))+":"+double((parseInt(currentTime%60)));
                            that.handleProgress((currentTime/duration)*100+'%');
                        }
                    }
                };
                this.loadVideo();
            }
        },
        loadVideo() {
            var that = this;
            console.log('loadvideo::',this.options)
            this.tcplayer = new TcPlayer("tcplayer", this.options);
            
            // 静音播放
            // this.tcplayer.mute(true);
            // this.tcplayer.fullscreen(true);
        },
        closeToast() {
            this.changeDialog(false);
        },
        showToast() {
            this.changeDialog(true);
        },
        changePlay(){
            if(this.tcplayer.playing()){
                this.pause();
            }else{
                this.play();
            }
        },
        play() {
            this.tcplayer.play();
            // this.tcplayer.fullscreen(true)
        },
        pause() {
            this.tcplayer.pause();
        },
        destroy() {
            if (this.tcplayer) {
                this.tcplayer.destroy();
            }
        },
        // getHaveRead() {
        //     let haveRead = storage.getItem('haveRead');
        //     if (haveRead) {
        //         haveRead = haveRead.split(',');
        //     }
        //     return haveRead;
        // },
        changeDialog(bool) {
            this.$refs.dialog.dialog_show=bool;
        },
    }
};
</script>

<style lang="less" scoped>
@file_path: "../../assets";
@import "@{file_path}/css/util.less";
@import "@{file_path}/css/screen.less";

/* //竖屏 */
@media screen and (orientation: portrait) {
    .van-toast {
        transform: rotate(90deg) translate3d(-50%, -50%, 0);
        transform-origin: 0 0;
    }

    .van-toast--default {
        .px2rem(width, 180);
        .px2rem(height, 180);
        .px2rem(padding, 20)
    }

    .van-loading {
        .px2rem(width, 60);
        .px2rem(height, 60);
    }

    .van-toast--default .van-toast__text {
        .px2rem(padding-top, 20);
        font-size: 3em;
    }
}
.van-dialog{
    width:auto;
}
.video_manage{
    // position: absolute;left:0;top:0;bottom:0;right:0;
    // z-index:9;
    // background: rgba(0,0,0,.3);
    box-sizing: border-box;
    position: fixed;
    bottom: 100vw;
    left: 0;
    z-index: 100;
    padding:0 20px;
    width: 100%;
    height: 62px;
    background: rgba(0,0,0,.68);
    display: flex;
    border-radius: 0 0 26px 26px;
    .play{
        width: 38px;
        height: 34px;
        padding: 12px 10px;
        background: url(//nodestatic.fbstatic.cn/kids-service-wechat/dist/assets/imgs/player-pause-a724181d09.png) center no-repeat;
        background-size: 38px;
        &.playing{
            background-image: url(//nodestatic.fbstatic.cn/kids-service-wechat/dist/assets/imgs/player-play-42c3dc9a5e.png);
        }
    }
    .time{
        width: 100px;
        height: 62px;
        line-height: 62px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin: 0 10px;
    }
    .slider{
        box-sizing: border-box;
        // position: absolute;left:0;bottom:20px;
        // width:90%;height:5px;
        // background:yellow;
        position: relative;
        width: 100%;
        height: 6px;
        margin: 28px 0;
        border-radius: 10px;
        background: #fff;
    }
    .percent{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 0;
        border-radius: 10px;
        background-color: #fff362;
    }
    .point{
        position: absolute;
        left: 0;
        top: -13px;
        width: 30px;
        height: 30px;
        margin-left: -10px;
        background: url(//nodestatic.fbstatic.cn/kids-service-wechat/dist/assets/imgs/course-player-icon-c9937a3c2a.png) center no-repeat;
        background-size: 30px;
    }
}
</style>
```