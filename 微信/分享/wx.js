let wx = require('weixin-js-sdk')
let CONFIG = {
  'debug': false,
  'beta': false,
  'jsApiList': [
    'chooseWXPay',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'onVoicePlayEnd',
    'uploadVoice',
    'downloadVoice',
    'translateVoice'
  ],
  'appId': '******',
  'nonceStr': '******',
  'timestamp': 0,
  'url': '*******',
  'signature': '******'
}
export const ready = () => {
  return new Promise((resolve) => {
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      resolve()
    })
    wx.error(function (res) {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      console.log('微信config信息验证失败', res)
    })
  })
}
// 配置微信
export const setConfig = (data) => {
  wx.config(data)
}
export function shareHelp (parames, callback) {
  const getWXSDK = new Promise((resolve, reject) => {
    callback().then(result => {
      CONFIG.url = parames.link
      CONFIG = Object.assign({}, CONFIG, result.data)
      // 开启debug
      let debug = false
      // 微信配置
      setConfig(Object.assign({}, CONFIG, {
        debug
      }))
      resolve()
    }).catch((err) => {
      console.log('err', err)
    })
  })
  getWXSDK.then(() => {
    ready().then(() => {
      var obj = {
        title: '海外入境信息综合查询-顺顺留学', // 分享标题
        desc: '汇总官方数据，持续更新海外入境信息和院校通知动态',
        link: parames.link,
        imgUrl: 'https://www.***.com/share.png' // 分享图标
      }
      typeof parames === 'object' && Object.assign(obj, CONFIG, parames)

      // 获取"分享给朋友"按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage(obj)

      // 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口
      wx.onMenuShareTimeline(obj)
    })
  })
}
