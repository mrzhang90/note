let ks = {
  lingqu: function () {
    sleep(5000);
    if (text('开宝箱得金币').exists()) {
      toastLog('弹窗-->开宝箱得金币');
      text('开宝箱得金币').findOne().parent().click();
      sleep(3000);
    }
    // if (text('恭喜你获得').exists()) {
    //   toastLog('弹窗-->恭喜你获得');
    //   text('看视频最高得').findOne().parent().click();
    //   sleep(30 * 1000);
    //   back();
    //   sleep(3000);
    //   if (text('放弃奖励').exists()) {
    //     text('放弃奖励').findOne().click();
    //     sleep(3000);
    //   }
    // }
    if (text('再看一个').exists()) {
      toastLog('弹窗-->再看一个');
      text('再看一个').findOne().click();
      sleep(30 * 1000);
      back();
      sleep(2000);
    }
    if (text('再看一个最高得400金币').exists()) {
      toastLog('弹窗-->再看一个最高得400金币');
      text('再看一个最高得400金币').findOne().click();
      sleep(30 * 1000);
      back();
      sleep(2000);
    }
    if (text('放弃奖励').exists()) {
      toastLog('弹窗-->放弃奖励');
      text('放弃奖励').findOne().click();
      sleep(3000);
    }
    if (text('坚持退出').exists()) {
      toastLog('弹窗-->坚持退出');
      text('坚持退出').findOne().click();
      sleep(3000);
    }
    return this;
  },
  _back: function () {
    back();
    this.lingqu();
  },
  open: function () {
    toast('打开快手极速版');
    sleep(1000);
    var launchResult = app.launch(app.getPackageName('快手极速版'));
    if (!launchResult) {
      toast('你还没有安装快手极速版！');
      sleep(1000);
      return this;
    }
    sleep(2000);
    return this;
  },
  // 点击去赚钱
  goMoney() {
    toastLog('点击去赚钱');
    sleep(3000);
    if (desc('去赚钱').exists()) {
      toastLog('desc去赚钱');
      desc('去赚钱').findOne().click();
      sleep(5000);
    } else if (text('去赚钱').exists()) {
      toastLog('text去赚钱');
      text('去赚钱').findOne().click();
      sleep(5000);
    }
    return this;
  },
  // 看视频得 5000 金币
  goKanShiPin() {
    toastLog('看视频得5000金币');
    sleep(2000);
    if (!text('看视频得5000金币').exists()) {
      toastLog('没有看视频');
      return this;
    }
    const list = text('看视频得5000金币').findOne().parent();
    const desc = list.child(1).text();
    const root = list.parent();
    if (desc.indexOf('单日最高可得5000金币奖励， ') > -1) {
      const arr = desc.replace('单日最高可得5000金币奖励， ', '').split('/');
      let num = Number(arr[0]);
      const count = Number(arr[1]);
      while (num < count) {
        num++;
        root.child(1).click(); //点击领福利
        sleep(3000);
        toastLog('领福利，第' + num + '个');
        if (desc.indexOf('单日最高可得5000金币奖励， ') > -1 && root.child(1)) {
          const btnText = root.child(1).text();
          toastLog('领福利，第' + num + '个,按钮：' + btnText);
          if (btnText.indexOf(':') > -1) {
            var _arr = btnText.split(':');
            var second = Number(_arr[0]) * 60 + Number(_arr[1]);
            if (second < 60) {
              toastLog('ks广告休息' + second.toString() + '秒');
              sleep((second + 3) * 1000);
              root.child(1).click(); //点击领福利
            }
            return this;
          }
        }
        sleep(30 * 1000);
        this._back();
      }
    }
    return this;
  },
  // 看直播
  kanZhibo() {
    toastLog('看直播');
    sleep(2000);
    if (!text('看直播得1.5万金币').exists()) {
      toastLog('没有看直播');
      return this;
    }
    const list = text('看直播得1.5万金币').findOne().parent();
    const desc = list.child(1).text();
    const root = list.parent();
    if (desc.indexOf('单日最高可得15000金币奖励， ') > -1) {
      const arr = desc.replace('单日最高可得15000金币奖励， ', '').split('/');
      let num = Number(arr[0]);
      const count = Number(arr[1]);
      if (num === count) return this;
      // while (num < count) {
      // num++;
      root.child(1).click(); //点击领福利
      // const zbText = id('progress_display').findOne().text();
      // const zbArr = zbText.split('/');
      // let zbNum = Number(zbArr[0]);
      // const zbCount = Number(zbArr[1]);
      while (num < count) {
        num++;
        sleep(3000);
        click(device.width / 3, device.height / 3);
        toastLog('进入直播间，第' + num + '次');
        sleep(22 * 1000);
        toastLog('直播进度1/3');
        sleep(22 * 1000);
        toastLog('直播进度2/3');
        sleep(22 * 1000);
        toastLog('直播进度100%');
        this._back();
        sleep(5000);
        if (text('退出直播间').exists()) {
          text('退出直播间').findOnce().click();
          text('退出直播间').findOnce().parent().click();
          sleep(5000);
        }
        if (text('退出').exists()) {
          text('退出').findOnce().click();
          text('退出').findOnce().parent().click();
          sleep(5000);
        }
        toastLog('退出直播间');
        if (num === count) {
          this._back();
        } else {
          readArticle(3); //读文章
        }
        sleep(3000);
      }
      // }
    }
    return this;
  },
  // 抽奖
  choujiang() {
    toastLog('抽奖');
    sleep(2000);
    if (!text('抽奖领最高5000金币').exists()) {
      toastLog('没有抽奖');
      return this;
    }
    const that = this;
    const list = text('抽奖领最高5000金币').findOne().parent();
    const desc = list.child(1).text();
    const root = list.parent();
    if (desc.indexOf('观看广告抽奖') > -1) {
      const arr = desc.replace('观看广告抽奖', '').split('/');
      let num = Number(arr[0]);
      const count = Number(arr[1]);
      root.child(1).click(); //点击抽奖
      while (num < count) {
        num++;
        toastLog('抽奖，第' + num + '次');
        sleep(3000);
        if (text('金币翻倍').exists()) {
          toastLog('--弹窗-金币翻倍');
          text('金币翻倍').findOnce().click();
          sleep(30 * 1000);
          this._back();
          sleep(3000);
          num--;
        }
        if (text('明天再来').exists()) {
          text('明天再来').findOnce().click();
          sleep(3000);
        }
        if (text('愉快收下').exists()) {
          text('愉快收下').findOnce().click();
          sleep(3000);
        }
        // if (className('android.view.View').text('去抽奖').exists()) {
        //   log('去抽奖---');
        //   className('android.view.View').text('去抽奖').findOnce().click();
        //   sleep(3000);
        // }
        // 检测抽奖按钮是否存在 start ****************
        let existsDrwm = false;
        className('android.widget.Image')
          .find()
          .forEach(function (tv) {
            if (
              tv.text().indexOf('_to_lottery.') > -1 ||
              tv.text().indexOf('lotterying.') > -1
            ) {
              existsDrwm = true;
            }
          });
        if (!existsDrwm) {
          choujiang();
          break;
        }
        // 检测抽奖按钮是否存在 end ****************
        className('android.widget.Image')
          .find()
          .forEach(function (tv) {
            if (
              tv.text().indexOf('_to_lottery.') > -1 ||
              tv.text().indexOf('lotterying.') > -1
            ) {
              tv.click();
              sleep(30 * 1000);
              that._back();
              sleep(8000);
              if (text('继续观看').exists()) {
                toastLog('--弹窗-继续观看');
                text('继续观看').findOnce().parent().click();
                sleep(3000);
                that._back();
                sleep(3000);
              }
            }
          });
      }
      if (num === count) {
        toast('抽奖领奖励');
        sleep(3000);
        text('领奖励')
          .find()
          .forEach(function (item) {
            item.click();
            sleep(3000);
            if (text('愉快收下').exists()) {
              toastLog('愉快收下');
              text('愉快收下').findOnce().click();
              sleep(3000);
            }
          });
      }
      toastLog('抽奖结束了');
      this._back();
      sleep(3000);
    }
    return this;
  },
  // 去逛街
  goGuangJie() {
    toastLog('去逛街');
    sleep(2000);
    if (!text('逛街领金币').exists()) {
      toastLog('没有逛街');
      return this;
    }
    const list = text('逛街领金币').findOne().parent();
    const desc = list.child(2).text();
    const root = list.parent();
    if (desc.indexOf('浏览低价商品领金币 完成 ') > -1) {
      const arr = desc.replace('浏览低价商品领金币 完成 ', '').split('/');
      let num = Number(arr[0]);
      const count = Number(arr[1]);
      if (num === count) {
        toastLog('逛街结束了');
        return this;
      }
      var now = Date.now();
      const shengyu = count - num;
      root.child(1).click(); //点击领福利
      article(130 * 1000 * shengyu);
      if (Date.now() - now > 130 * 1000 * shengyu) {
        toastLog('去逛街 后退');
        this._back();
      }
    }
    return this;
  },
  // 领饭补
  fanbu() {
    toastLog('领饭补');
    sleep(2000);
    if (!text('到饭点领饭补').exists()) {
      toastLog('没有领饭补');
      return this;
    }
    const list = text('到饭点领饭补').findOne().parent();
    const root = list.parent();
    root.child(1).click();
    sleep(3000);
    if (text('领取饭补').exists()) {
      text('领取饭补').findOne().parent().click();
      sleep(3000);
    }
    if (className('android.view.View').clickable(true).exists()) {
      className('android.view.View').clickable(true).findOne().click();
    }
    this._back();
    return this;
  },
  // 立即领
  lijiling() {
    toastLog('领金币');
    sleep(2000);
    if (!text('领金币购签到奖励').exists()) {
      toastLog('没有领金币');
      return this;
    }
    const list = text('领金币购签到奖励').findOne().parent();
    const root = list.parent();
    if (text('领金币购签到奖励').exists()) {
      root.child(1).click();
      sleep(5000);
      if (text('今日签到').exists()) {
        text('今日签到').findOne().click();
        sleep(2000);
      }
      this._back();
    }
    return this;
  },
  // 去签到
  qiandao() {
    toastLog('去签到');
    sleep(2000);
    if (!text('去签到').exists()) {
      toastLog('没有签到');
      return this;
    }
    if (text('去签到').exists()) {
      text('去签到').findOne().click();
      if (text('看广告再得300金币').exists()) {
        text('看广告再得300金币').findOne().parent().click();
        sleep(30 * 1000);
        this._back();
      }
      if (text('放弃奖励').exists()) {
        text('放弃奖励').findOne().click();
        sleep(3000);
      }
    }
    return this;
  },
  // 首页
  home() {
    home();
  },
};
function formatTime(haomiao) {
  return parseInt(haomiao / 1000 / 60);
}
function nextVideo() {
  //获得手机分辨率
  var width = device.width;
  var height = device.height;
  //swipe(x1,y1,x2,y2,t) 滑动函数 从x1,y1,到x2,y2用时t ms
  //屏幕的像素是从左上角开始的，向下，向右增加
  swipe(width / 2, (height * 3) / 4, width / 2, height / 10, randNum(300, 500));
  // swipe(width / 2, height / 2, width / 2, height / 3, randNum(8, 12));
}
//获取范围内的随机数
function randNum(minnum, maxnum) {
  return Math.floor(minnum + Math.random() * (maxnum - minnum));
}
function readArticle(runTimes) {
  var flagTime = 1;
  while (true) {
    if (flagTime > runTimes) break;
    swipe(
      device.width / 2,
      device.height / 2,
      device.width / 2,
      device.height / 2 - 400,
      500
    );
    sleep(1500);
    flagTime++;
  }
}
function article(runTimes) {
  var now = Date.now();
  sleep(3000);
  while (Date.now() - now < runTimes) {
    toast(
      '执行了' +
        formatTime(Date.now() - now) +
        '分，' +
        formatTime(runTimes) +
        '分停止'
    );
    sleep(3000);
    readArticle(random(45, 55)); //读文章
    sleep(random(2000, 3000));
  }
}
function fastClick() {
  var i = 1200;
  toast(device.width + ' ' + device.height);
  while (i > 0) {
    press(540, 960, 1);
    sleep(2);
    i--;
  }
}
// 翻视频，指定次数
function smoothSwipe(time) {
  // 统计运行次数
  var flagTime = 0;
  while (true) {
    var sleepTime = randNum(5, 10);
    toast(
      '视频执行了' + flagTime.toString() + '次，第' + time.toString() + '次停止'
    );
    flagTime++;
    // 超过次数终止程序
    if (flagTime > time) break;
    sleep(sleepTime * 1000);
    nextVideo();
  }
}
/** * 用于click等部分功能无法点击的组件 * @param {object} ui 可以由控件内容自由组合链式传递进来 * @returns */
/*
 * By 九黎
 *九黎
 */
function clickui(ui) {
  if (ui.exists()) {
    var a = ui.findOnce(); //log(a);
    if (a) {
      var b = a.bounds(); //log(b);
      if (b && b.centerX() >= 0 && b.centerY() >= 0) {
        //Tap(b.centerX(), b.centerY()); //安卓7以下点击
        click(b.centerX(), b.centerY());
        return true;
      }
    }
  }
  return false;
}

ks.open()
  .goMoney()
  .lingqu()
  .fanbu()
  .lijiling()
  .qiandao()
  .goKanShiPin()
  .goGuangJie()
  .kanZhibo()
  .choujiang();
