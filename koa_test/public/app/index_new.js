'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = function () {
    function PraiseButton() {
        _classCallCheck(this, PraiseButton);

        this.count = 0;
        this.y = -100;
        this.scale = 3;
    }

    _createClass(PraiseButton, [{
        key: 'plus1',
        value: function plus1() {
            var That = this;
            this.isDisabled = false;
            this.element.on('click', function () {
                if (That.isDisabled) {
                    return That.disabled();
                }
                That.fabulous();
                That.isDisabled = true;
            });
        }
    }, {
        key: 'fabulous',
        value: function fabulous() {
            ajax(function (data) {
                if (data.stats == -1) {
                    alert(data.msg);
                    return false;
                }
                this.count = data.count;
                // if(this.count>10){
                //     this.count=0;
                //     return this.disabled();
                // }
                this.isDisabled = false;
                this.enabled();
                $('title').text('点赞' + this.count);
                var add1 = $('<span class="add1">+' + this.count + '</span>');
                this.element.append(add1);
                return this.animation(add1, this.y, this.scale);
            }.bind(this));
        }
    }, {
        key: 'animation',
        value: function animation(element, y, scale) {
            var t = 0,
                s = 0;
            var timer = setInterval(function () {
                // console.log(t,y , s,scale)
                if (t > y && s < scale) {
                    t -= 2;
                    s += 0.06;
                    element.css({ 'transform': 'scale(' + s + ') translateY(' + t + 'px)' });
                } else {
                    clearInterval(timer);
                }
            }, 20);
        }
    }, {
        key: 'disabled',
        value: function disabled() {
            this.element.addClass('gray');
            return false;
        }
    }, {
        key: 'enabled',
        value: function enabled() {
            this.element.removeClass('gray');
            return true;
        }
    }]);

    return PraiseButton;
}();

var Thumb = function (_PraiseButton) {
    _inherits(Thumb, _PraiseButton);

    function Thumb(element) {
        _classCallCheck(this, Thumb);

        var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this));

        _this.element = element;
        return _this;
    }

    return Thumb;
}(PraiseButton);

function ajax(callback) {
    axios.get('/clickFinger').then(function (response) {
        callback(response.data);
    });
}
exports.default = Thumb;
