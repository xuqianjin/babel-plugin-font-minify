"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    visitor: {
      Program: {
        enter: function enter(path, state) {
          console.log("start processing this module...");
        },
        exit: function exit(path, state) {
          console.log("end processing this module!");
          console.log([].concat(_toConsumableArray(str)));
          var fontmin = new _fontmin2.default().src("font/test.ttf").dest("build/").use(_fontmin2.default.glyph({
            text: "天地玄黄宇宙洪荒",
            hinting: false
          })).use(_fontmin2.default.ttf2woff({
            deflate: true
          }));
          fontmin.run(function (err) {
            if (err) {
              throw err;
            }
          });
        }
      },
      StringLiteral: function StringLiteral(path) {
        str = new Set([].concat(_toConsumableArray(str), _toConsumableArray(path.node.value)));
        if (isChinese(path.node.value)) {
          path.node.value = (0, _trans2.default)(path.node.value);
        }
      }
    }
  };
};

var _fontmin = require("fontmin");

var _fontmin2 = _interopRequireDefault(_fontmin);

var _trans = require("./trans");

var _trans2 = _interopRequireDefault(_trans);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function isChinese(s) {
  return (/[\u4e00-\u9fa5]/.test(s)
  );
}

var str = new Set();