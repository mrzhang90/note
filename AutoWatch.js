let kuaishou = {
  //快手快捷版
  run: function (runTimes) {
    toast('这是一个快手刷视频脚本,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launchApp('快手极速版'); //app.launchApp("com.kuaishou.nebula");
    if (!launchResult) {
      toast('你还没有安装快手极速版！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      sleepTime = randNum(5, 15);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      nextVideo();
    }
    home();
    sleep(1000);
  },
};

let douyin = {
  //抖音快捷版
  run: function (runTimes) {
    toast('这是一个抖音刷视频脚本,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launchApp('抖音极速版'); //app.launch("com.ss.android.ugc.aweme.lite");
    if (!launchResult) {
      toast('你还没有安装抖音极速版！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      sleepTime = randNum(5, 15);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      nextVideo();
    }

    home();
    sleep(1000);
  },
};

let shuabao = {
  //刷宝短视频
  // 封装一下
  run: function (runTimes) {
    toast('这是一个刷宝的demo,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launch('com.jm.video');
    if (!launchResult) {
      toast('你还没有刷宝短视频！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      // 随机时间之后下个视频，避免软件认为是机器人,因为有广告
      // 广告结束之后会有弹窗，因此时间设置短一点 可以防止广告结束
      sleepTime = randNum(5, 15);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      nextVideo();
    }
    home();
    sleep(1000);
  },
};
let huoshan = {
  //火山快捷版
  // 封装一下
  run: function (runTimes) {
    toast('这是一个火山快捷版的demo,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launch('com.ss.android.ugc.livelite');
    if (!launchResult) {
      toast('你还没有火山快捷版！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      // 随机时间之后下个视频，避免软件认为是机器人,因为有广告
      // 广告结束之后会有弹窗，因此时间设置短一点 可以防止广告结束
      sleepTime = randNum(5, 15);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      nextVideo();
    }
    home();
    sleep(1000);
  },
};

let caidan = {
  //彩蛋视频
  // 封装一下
  run: function (runTimes) {
    toast('这是一个彩蛋的demo,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launch('com.jifen.dandan');
    if (!launchResult) {
      toast('你还没有彩蛋短视频！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(3000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      // 随机时间之后下个视频，避免软件认为是机器人,因为有广告
      // 广告结束之后会有弹窗，因此时间设置短一点 可以防止广告结束
      sleepTime = randNum(5, 15);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      // if (id("btn_layout").exists()) {

      //     toast("进入翻倍中");

      //     sleep(1000);
      //     console.log(id("btn_layout").untilFind().longClick())
      //     sleep(1000);
      //     while (true) {
      //         toast("检测中");
      //         sleep(1000);
      //         if ( className("android.widget.ImageView").depth(5).exists()) {
      //             console.log("退出:"+className("android.widget.ImageView").depth(5).untilFind().longClick());
      //             // className("android.widget.ImageView").depth(5).findOne().click()
      //             sleep(1000)
      //             break;
      //         }
      //     }
      // }
      // else
      if (className('android.widget.TextView').text('立即领取').exists()) {
        toast('播放广告中');
        while (className('android.widget.TextView').text('立即领取').exists()) {
          toast('等待中……');
          click(1000, 1000);
          sleep(1000);
        }
      }
      nextVideo();
    }
  },
};

let qkk = {
  //趣看看短视频
  // 封装一下
  open: function () {
    toast('这是一个趣看看的demo,1s之后打开APP');
    sleep(1000);
    var launchResult = app.launch(app.getPackageName('趣看看'));
    if (!launchResult) {
      toast('你还没有趣看看！');
      sleep(1000);
      return;
    }
    toast('等待软件打开，3s之后进入下个动作！');
    sleep(8000);
    return this;
  },
  video: function (runTimes) {
    click(device.width / 2, (device.height * 9) / 10);
    sleep(1000);
    click((device.width * 2.7) / 10, (device.height * 2.2) / 10);
    sleep(1000);
    var sleepTime = 10;
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        break;
      }
      // 随机时间之后下个视频，避免软件认为是机器人,因为有广告
      // 广告结束之后会有弹窗，因此时间设置短一点 可以防止广告结束
      sleepTime = randNum(5, 10);
      toast(
        sleepTime.toString() +
          's之后跳到下个视频！已经执行 ' +
          flagTime.toString() +
          '次'
      );
      sleep(sleepTime * 1000);
      nextVideo();
    }
    back();
    sleep(1000);
    return this;
  },
  article: function (runTimes, readtime) {
    click(device.width / 10, (device.height * 9) / 10);
    sleep(1000);
    var flagTime = 1;
    var safe = false;
    while (true) {
      if (flagTime > runTimes) break;
      while (true) {
        var add = disAdd();
        // sleep(5000);

        safe = true;
        for (let i in add) {
          console.log(add[i]);
          if (add[i] > 800 && add[i] < 2000) safe = false;
        }

        console.log(add.length + ' ' + safe);
        // sleep(5000);

        if (add.length > 0 && safe) break;
        else {
          swipe(
            device.width / 2,
            device.height / 2,
            device.width / 2,
            device.height / 2 - 400,
            500
          );
          sleep(500);
        }
      }
      press(device.width / 2, device.height / 2, 100);
      //    sleep(2000)
      smoothSwipe(readtime);
      back();
      sleep(500);
      swipe(
        device.width / 2,
        device.height / 2,
        device.width / 2,
        device.height / 2 - 400,
        500
      );
      sleep(500);
      flagTime++;
    }

    back();
    sleep(1000);
    return this;
    function disAdd() {
      var add = [];
      var hh = className('android.support.v7.widget.RecyclerView')
        .scrollable(true)
        .findOne()
        .children();
      for (let i = 0; i < hh.length; i++) {
        var target = hh[i].findOne(
          className('android.widget.TextView').text('广告')
        );
        if (target != null) {
          // add = target.bounds().centerY();
          add.push(target.bounds().centerY());
        }
      }
      return add;
    }
  },
};
let ks = {
  lingqu: function () {
    sleep(5000);
    if (text('开宝箱得金币').exists()) {
      toastLog('弹窗-->开宝箱得金币');
      text('开宝箱得金币').findOne().parent().click();
      sleep(3000);
    }
    if (text('恭喜你获得').exists()) {
      toastLog('弹窗-->恭喜你获得');
      text('看视频最高得').findOne().parent().click();
      sleep(30 * 1000);
      back();
      sleep(3000);
      if (text('放弃奖励').exists()) {
        text('放弃奖励').findOne().click();
        sleep(3000);
      }
    }
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
  },
  _back: function () {
    back();
    this.lingqu();
  },
  open: function () {
    // toast('打开快手极速版');
    // sleep(1000);
    // var launchResult = app.launch(app.getPackageName('快手极速版'));
    // if (!launchResult) {
    //   toast('你还没有安装快手极速版！');
    //   sleep(1000);
    //   return;
    // }
    // sleep(2000);
    return this;
  },
  video: function (runTimes, readtime) {
    sleep(3000);
    if (desc('首页').exists()) {
      desc('首页').findOne().click();
      sleep(5000);
    }
    // 统计运行次数
    var flagTime = 0;
    while (true) {
      flagTime++;
      // 超过次数终止程序
      if (flagTime > runTimes) {
        home();
        break;
      }
      var sleepTime = randNum(5, 15);
      toast('快手执行了' + flagTime.toString() + '次');
      sleep(sleepTime * 1000);
      nextVideo();
    }
    return this;
  },
  task: function () {
    const that = this;
    goMoney();
    this.lingqu();
    fanbu();
    lijiling();
    qiandao();
    goGuangJie();
    goKanShiPin();
    kanZhibo();
    choujiang();
    return this;
    // 点击去赚钱
    function goMoney() {
      toastLog('点击去赚钱');
      sleep(3000);
      if (desc('去赚钱').exists()) {
        log('desc去赚钱', text('去赚钱').exists());
        desc('去赚钱').findOne().click();
        sleep(5000);
      } else if (text('去赚钱').exists()) {
        log('text去赚钱', desc('去赚钱').exists());
        text('去赚钱').findOne().click();
        sleep(5000);
      }
    }
    // 领饭补
    function fanbu() {
      toastLog('领饭补');
      if (!text('到饭点领饭补').exists()) {
        return toastLog('没有领饭补');
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
      that._back();
    }
    // 立即领
    function lijiling() {
      toastLog('领金币');
      if (!text('领金币购签到奖励').exists()) {
        return toastLog('没有领金币');
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
        that._back();
      }
    }
    // 去签到
    function qiandao() {
      toastLog('去签到');
      if (!text('去签到').exists()) {
        return toastLog('没有签到');
      }
      if (text('去签到').exists()) {
        text('去签到').findOne().click();
        if (text('看广告再得300金币').exists()) {
          text('看广告再得300金币').findOne().parent().click();
          sleep(30 * 1000);
          that._back();
        }
        if (text('放弃奖励').exists()) {
          text('放弃奖励').findOne().click();
          sleep(3000);
        }
      }
    }
    // 去逛街
    function goGuangJie() {
      toastLog('去逛街');
      if (!text('逛街领金币').exists()) {
        return toastLog('没有逛街');
      }
      const list = text('逛街领金币').findOne().parent();
      const desc = list.child(2).text();
      const root = list.parent();
      if (desc.indexOf('浏览低价商品领金币 完成 ') > -1) {
        const arr = desc.replace('浏览低价商品领金币 完成 ', '').split('/');
        let num = Number(arr[0]);
        const count = Number(arr[1]);
        if (num === count) return toastLog('逛街结束了');
        root.child(1).click(); //点击领福利
        var now = Date.now();
        const shengyu = count - num;
        let isGJ = true;
        while (isGJ) {
          sleep(3000);
          swipe(
            device.width / 2,
            device.height / 2,
            device.width / 2,
            device.height / 2 - 400,
            500
          );
          if (Date.now() - now > 120 * 1000 * shengyu) {
            log('去逛街 后退');
            isGJ = false;
            that._back();
            goGuangJie(); //再执行一遍，防止执行不完的情况
          }
        }
      }
    }
    // 看视频得 5000 金币
    function goKanShiPin() {
      toastLog('看视频得5000金币');
      if (!text('看视频得5000金币').exists()) {
        return toastLog('没有看视频');
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
          if (
            desc.indexOf('单日最高可得5000金币奖励， ') > -1 &&
            root.child(1)
          ) {
            const btnText = root.child(1).text();
            toastLog('领福利，第' + num + '个,按钮：' + btnText);
            if (btnText.indexOf(':') > -1) {
              var _arr = btnText.split(':');
              var second = Number(_arr[0]) * 60 + Number(_arr[1]);
              toastLog('ks广告休息' + second.toString() + '秒');
              sleep((second + 3) * 1000);
              root.child(1).click(); //点击领福利
            }
          }
          sleep(30 * 1000);
          that._back();
        }
      }
    }
    // 看直播
    function kanZhibo() {
      toastLog('看直播');
      if (!text('看直播得1.5万金币').exists()) {
        return toastLog('没有看直播');
      }
      const list = text('看直播得1.5万金币').findOne().parent();
      const desc = list.child(1).text();
      const root = list.parent();
      if (desc.indexOf('单日最高可得15000金币奖励， ') > -1) {
        const arr = desc.replace('单日最高可得15000金币奖励， ', '').split('/');
        let num = Number(arr[0]);
        const count = Number(arr[1]);
        if (num === count) return;
        // while (num < count) {
        // num++;
        root.child(1).click(); //点击领福利
        // const zbText = id('progress_display').findOne().text();
        // const zbArr = zbText.split('/');
        // let zbNum = Number(zbArr[0]);
        // const zbCount = Number(zbArr[1]);
        while (num < count) {
          num++;
          console.log('看直播，第', num, '次');
          sleep(3000);
          click(device.width / 3, device.height / 3);
          log('进入直播间');
          sleep(22 * 1000);
          sleep(22 * 1000);
          sleep(22 * 1000);
          that._back();
          sleep(5000);
          if (text('退出直播间').exists()) {
            text('退出直播间').findOnce().parent().click();
            sleep(5000);
          }
          if (text('退出').exists()) {
            text('退出').findOnce().parent().click();
            sleep(5000);
          }
          log('退出直播间');
          if (num === count) {
            that._back();
          } else {
            nextVideo();
          }
          sleep(5000);
        }
        // }
      }
    }
    // 抽奖
    function choujiang() {
      toastLog('抽奖');
      if (!text('抽奖领最高5000金币').exists()) {
        return toastLog('没有抽奖');
      }
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
          log('抽奖，第', num, '次');
          sleep(3000);
          if (text('金币翻倍').exists()) {
            log('--弹窗-金币翻倍');
            text('金币翻倍').findOnce().click();
            sleep(30 * 1000);
            that._back();
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
                  log('--弹窗-继续观看');
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
                log('愉快收下');
                text('愉快收下').findOnce().click();
                sleep(3000);
              }
            });
        }
        toastLog('抽奖结束了');
        that._back();
        sleep(3000);
      }
    }
  },
};
let jinri = {
  open: function () {
    toast('打开今日头条');
    sleep(1000);
    var launchResult = app.launch(app.getPackageName('今日头条极速版'));
    if (!launchResult) {
      toast('你还没有今日头条极速版！');
      sleep(1000);
      return;
    }
    sleep(2000);
    return this;
  },
  article: function (runTimes) {
    article(runTimes);
    home();
    return this;
  },
  article2: function (runTimes, readtime) {
    var flagTime = 0;
    const tj = text('推荐').findOne();
    tj.click();
    sleep(3000);
    while (flagTime <= runTimes) {
      className('androidx.recyclerview.widget.RecyclerView')
        .scrollable(true)
        .findOne()
        .children()
        .forEach((child) => {
          if (child.findOne(id('c4l'))) {
            toast(
              '头条执行了' +
                flagTime.toString() +
                '次，第' +
                runTimes.toString() +
                '次停止'
            );
            child.click();
            sleep(3000);
            readArticle(readtime); //读文章
            back();
            sleep(3000);
            nextVideo();
            sleep(5000);
            flagTime++;
          }
          if (child.findOne(id('bye')) || child.findOne(id('om'))) {
            toast(
              '头条执行了' +
                flagTime.toString() +
                '次，第' +
                runTimes.toString() +
                '次停止'
            );
            child.click();
            sleep(3000);
            smoothSwipe(readtime);
            back();
            sleep(3000);
            nextVideo();
            sleep(5000);
            flagTime++;
          }
        });
    }
    home();
    return this;
  },
};
let baidu = {
  open: function () {
    toast('打开百度极速版');
    sleep(1000);
    var launchResult = app.launch(app.getPackageName('百度极速版'));
    if (!launchResult) {
      toast('你还没有百度极速版！');
      sleep(1000);
      return;
    }
    sleep(2000);
    return this;
  },
  article: function (runTimes) {
    article(runTimes);
    home();
    return this;
  },
  video: function (runTimes) {
    id('c8')
      .findOne()
      .children()
      .forEach((child) => {
        if (child.findOne(id('aoi')) || child.findOne(id('av2'))) {
          child.click();
          sleep(3000);
          smoothSwipe(runTimes);
          back();
        }
      });
    home();
    return this;
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
function main() {
  home();
  sleep(3000);
  // var i = 1000;
  // while (i > 0) {
  //   // kuaishou.run(100); //参数为每次循环刷动的次数
  //   // shuabao.run(100); //参数为每次循环刷动的次数
  //   // huoshan.run(100); //参数为每次循环刷动的次数
  //   //caidan.run(100)//参数为每次循环刷动的次数
  //   i--;
  // }
  ks.open().task().video(100, 10);
  baidu.open().article(60 * 60 * 1000);
  jinri.open().article(180 * 60 * 1000);
}

main();
