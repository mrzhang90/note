/**
 * Created by Administrator on 2016/11/22.
 */
var less = require('../Online_retailers/less');

less.render('.class { width: (1 + 1) }', function (e, css) {
    console.log(css);
});