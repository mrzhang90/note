/**
半径：200px；
小元素：10px；
40排
**/

window.onload = function() {
    var letCircleMove = {
        ele: {
            circle: document.getElementsByClassName('circle')[0],
            box: document.getElementsByClassName('circle')[0].getElementsByClassName('box')[0]
        },
        buildCircle: function() {
            // var circle = document.getElementsByClassName('circle')[0];
            // var box = circle.getElementsByClassName('box')[0];
            var num = 20;
            var r = 100;
            var arr = [];
            var l = -1;
            var str = '';
            var theta, phi; //theta 球半径与y的夹角，phi 小圆半径x的夹角
            for (var i = 0; i <= num; i++) {
                if (i > num / 2) {
                    l = l - 2;
                } else {
                    l = l + 2;
                }
                arr.push(l);
            }
            l = arr.length;
            theta = Math.PI / (l - 1);
            for (var i = 0; i < l; i++) {
                phi = Math.PI * 2 / arr[i];
                for (var j = 0; j < arr[i]; j++) {
                    var x = r * Math.sin(i * theta) * Math.sin(j * phi);
                    var y = -r * Math.cos(i * theta);
                    var z = r * Math.sin(i * theta) * Math.cos(j * phi);
                    var transform = 'translate3D(' + x + 'px,' + y + 'px,' + z + 'px)';
                    var rotate = 'rotateY(' + j * phi + 'rad)' + 'rotateX(' + (Math.PI / 2 - i * theta) + 'rad)';
                    var style = 'style="transform:' + transform + ' ' + rotate + '"';
                    span = '<span ' + style + '></span>';
                    str += span;
                }
            }
            this.ele.box.innerHTML = str;
        },
        addRock: function() {
            var d = 0;
            var alpha = lastAlpha = gamma = 0, lastGamma = 5;
            var _this = this;
            function deviceMotionHandler(event) {
                gamma = event.gamma;
                alpha = event.alpha;
                // z = event.alpha;
                if(Math.abs(lastGamma-gamma)>d){//||Math.abs(lastAlpha-alpha)>d
                    // alert((gamma-lastGamma));
                    _this.ele.box.style.transform = 'translate3d(0, 0, 0) rotateY( ' + (gamma)*3+ 'deg)';
                    // alert(gamma);
                    // _this.ele.box.style.transform = 'translate3d(0, 0, 0) rotateY( ' + (gamma-lastGamma)*5+ 'deg)';
                }

                lastGamma = gamma;
                lastAlpha = alpha;

            }
            window.addEventListener('deviceorientation', deviceMotionHandler, false);
        },
        move: function() {
            var startX = 0,
                startY = 0,
                endX = 0,
                endY = 0,
                x = 0,
                y = 0,
                _this = this;
            this.ele.box.addEventListener('touchstart', function(event) {
                event.preventDefault();
                var touch = event.targetTouches[0];
                startX = touch.pageX - x;
                startY = touch.pageY - y;
            });
            this.ele.box.addEventListener('touchmove', function(event) {
                event.preventDefault();

                var touch = event.targetTouches[0];
                endX = touch.pageX;
                endY = touch.pageY;
                y = endY - startY;
                x = endX - startX;
                _this.ele.box.style.transform = 'translate3d(0, 0, 0) rotateX( ' + y + 'deg) rotateY( ' + x + 'deg)';

            });
            this.ele.box.addEventListener('touchend', function(event) {
                event.preventDefault();
                console.log(endY - startY, endX - startX);
                console.log(y, x);

            });
        },
        init: function() {
            var _this = this;
            this.buildCircle();
            this.move();
            this.addRock();
            var angleX = 0;
            // setInterval(function() {
            //     angleX++;
            //  _this.ele.box.style.transform = 'translate3d(0, 0, 0) rotateX(' + angleX + 'deg) rotateY(' + angleX + 'deg)';
            // }, 1);
        }
    }
    letCircleMove.init();
};
