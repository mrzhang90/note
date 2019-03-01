```html
<!--pages/code/code.wxml-->
<canvas class="canvas-poster"
  id = "canvasPoster" 
  hidden="{{hideCanvas}}"
  style = "{{'width:'+width+'px;height:'+height+'px'}}" canvas-id="canvasPoster" ></canvas>
<image class="poster-img" src="{{poster}}" bindtap="previewImg"></image>
<button class="save-btn" bindtap="savePoster">保存图片</button>
```
```js
// pages/code/code.js
Page({
  data: {
    width:0,
    height:0,
    hideCanvas:false
  },
  onLoad: function (options) {
    //this.shareInfo = JSON.parse(options.shareInfo)
    this.shareInfo={
      headerImg: 'http://qiniu.bkenglish.cn/small/home_erinNew2.jpg',
      bgImg: '/assets/images/share2.jpg',
      qrcode: 'http://qiniu.bkenglish.cn/small/newUser/code.jpeg'
    }
  },
  onReady(){
    // wx.getSystemInfo({
    //   success:(res)=>{
    //     this.pixelRatio = res.pixelRatio;
        this.pixelRatio = 2;
        console.log('🍎 code load:,', this.pixelRatio)
        // 通过像素比计算出画布的实际大小（330x490）是展示的出来的大小
        this.setData({
          width: 750 * this.pixelRatio,
          height: 600 * this.pixelRatio
        })

        var query = wx.createSelectorQuery()
        // query.select('#canvasPoster').boundingClientRect((res) => {
        //   console.log('res::',res)
        // 返回值包括画布的实际宽高
        // canvas绘制网络图片需保存至本地
        wx.getImageInfo({
          src: this.shareInfo.headerImg,//服务器返回的图片地址
          success: (res)=>{
            //res.path是网络图片的本地地址
            this.headerImg = res.path
            wx.getImageInfo({
              src: this.shareInfo.qrcode,//服务器返回的图片地址
              success: (res) => {
                //res.path是网络图片的本地地址
                this.qrcode = res.path
                this.drawImage({
                  width: 750 * this.pixelRatio,
                  height: 600 * this.pixelRatio
                })
              },
              fail: function (res) { }
            });
          },
          fail: function (res) { }
        });
        
        // }).exec()
      // }
    // }) 
  },
  drawImage(canvasAttrs) {
    let ctx = wx.createCanvasContext('canvasPoster', this)
    let canvasW = canvasAttrs.width // 画布的真实宽度
    let canvasH = canvasAttrs.height //画布的真实高度
    // 头像和二维码大小都需要在规定大小的基础上放大像素比的比例后面都会 *this.pixelRatio
    let headerW = 75 * this.pixelRatio
    // let headerX = (canvasW - headerW) / 2
    // let headerY = 40 * this.pixelRatio
    let headerX = 24 * this.pixelRatio;
    let headerY = 24 * this.pixelRatio;
    let qrcodeW = 90 * this.pixelRatio
    let qrcodeX = canvasW - qrcodeW
    let qrcodeY = canvasH - qrcodeW
    // 填充背景
    ctx.drawImage(this.shareInfo.bgImg, 0, 0, canvasW, canvasH)
    ctx.save()
    // 控制头像为圆形
    ctx.setStrokeStyle('rgba(0,0,0,.2)') //设置线条颜色，如果不设置默认是黑色，头像四周会出现黑边框
    ctx.arc(headerX + headerW / 2, headerY + headerW / 2, headerW / 2, 0, 2 * Math.PI)
    ctx.stroke()
    //画完之后执行clip()方法，否则不会出现圆形效果
    ctx.clip()
    // 将头像画到画布上
    ctx.drawImage(this.headerImg, headerX, headerY, headerW, headerW)
    ctx.restore()
    ctx.save()
    // 绘制二维码
    ctx.drawImage(this.qrcode, qrcodeX, qrcodeY, qrcodeW, qrcodeW)
    ctx.save()
    // 文本
    ctx.setTextAlign('center')
    ctx.setTextBaseline('middle')
    ctx.setFillStyle('red')
    ctx.setFontSize(80)
    ctx.fillText('hello world', canvasW/2, canvasH/2)
    ctx.draw()
    setTimeout(() => {
      //下面的13以及减26推测是因为在写样式的时候写了固定的zoom: 50%而没有用像素比缩放导致的黑边，所以在生成时进行了适当的缩小生成，这个大家可以自行尝试
      wx.canvasToTempFilePath({
        canvasId: 'canvasPoster',
        // x: 13,
        // y: 13,
        width: canvasW,
        height: canvasH,
        destWidth: canvasW,
        destHeight: canvasH,
        success: (res) => {
          this.setData({
            hideCanvas:true,
            poster : res.tempFilePath
          })
        }
      })
    }, 200)
  },
  previewImg() {
    if (this.data.poster) {
      //预览图片，预览后可长按保存或者分享给朋友
      wx.previewImage({
        urls: [this.data.poster]
      })
    }
  },
  savePoster() {
    if (this.data.poster) {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.poster,
        success: (result) => {
          wx.showToast({
            title: '海报已保存，快去分享给好友吧。',
            icon: 'none'
          })
        }
      })
    }
  }
})
```
```css
/* pages/code/code.wxss */
.canvas-poster{
  visibility: hidden;
  opacity:0;
  /*   width:750rpx;
  height:600rpx; */
}
.poster-img{
  width:750rpx;
  height:600rpx;
}
```