smoothSwipe(100);
home();

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
