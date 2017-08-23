'use strict';
window.aa=function(){
    console.log(1)
}
var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
        key: 'fabulous',
        value: function fabulous(element) {
            var add1 = $('<span class="add1">+1</span>');
            element.append(add1);
            return this.animation(add1, this.count, this.y, this.scale);
        }
    }, {
        key: 'animation',
        value: function animation(element, count, y, scale) {
            element.text('+' + count);
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
    }]);

    return PraiseButton;
}();

var Thumb = function (_PraiseButton) {
    _inherits(Thumb, _PraiseButton);

    function Thumb() {
        _classCallCheck(this, Thumb);

        return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this));
    }

    _createClass(Thumb, [{
        key: 'plus1',
        value: function plus1(element) {
            ++this.count;
            _get(Thumb.prototype.__proto__ || Object.getPrototypeOf(Thumb.prototype), 'fabulous', this).call(this, element);
        }
    }]);

    return Thumb;
}(PraiseButton);

$.extend({
    thumb: new Thumb()
});
