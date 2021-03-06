"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("../cjs/components/Icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RoadmapIcon = function RoadmapIcon(props) {
  return _react.default.createElement(_Icon.default, _extends({
    dangerouslySetGlyph: "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M6 2h10a3 3 0 0 1 0 6H6a3 3 0 1 1 0-6zm0 2a1 1 0 1 0 0 2h10a1 1 0 0 0 0-2H6zm4 5h8a3 3 0 0 1 0 6h-8a3 3 0 0 1 0-6zm0 2a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-8zm-4 5h6a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6zm0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H6z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg>"
  }, props));
};

RoadmapIcon.displayName = 'RoadmapIcon';
var _default = RoadmapIcon;
exports.default = _default;