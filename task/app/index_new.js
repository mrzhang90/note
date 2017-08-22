'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PraiseButton = exports.PraiseButton = function PraiseButton() {
	_classCallCheck(this, PraiseButton);

	this.es6 = 'yay';
};

var Thumb = function (_PraiseButton) {
	_inherits(Thumb, _PraiseButton);

	// class Thumb extends PraiseButton{
	function Thumb(finger) {
		_classCallCheck(this, Thumb);

		var _this = _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this));

		_this.finger = finger;
		return _this;
	}

	_createClass(Thumb, [{
		key: 'clFinger',
		value: function clFinger() {
			this.finger.on('click', function () {
				var add1 = $('<span class="add1">+1</span>');
				$(this).append(add1);
				animate(add1)(-100, 3);
			});
		}
	}]);

	return Thumb;
}(PraiseButton);

exports.default = Thumb;

function animate(element) {
	return function (y, scale) {
		var t = 0,
		    s = 0;
		var timer = setInterval(function () {
			if (t > y && s < scale) {
				t -= 2, s += 0.06;
				element.css({ 'transform': 'scale(' + s + ') translateY(' + t + 'px)' });
			} else {
				clearInterval(timer);
			}
		}, 20);
	};
}
