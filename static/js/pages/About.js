"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Title = _antd.Typography.Title,
  Paragraph = _antd.Typography.Paragraph;
function AboutPage() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    title: "Gi\u1EDBi Thi\u1EC7u",
    bordered: false,
    style: {
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Typography, null, /*#__PURE__*/_react["default"].createElement(Title, {
    level: 2
  }, "Student Helper"), /*#__PURE__*/_react["default"].createElement(Paragraph, null, "D\u1EF1 \xE1n n\xE0y \u0111\u01B0\u1EE3c ph\xE1t tri\u1EC3n v\u1EDBi m\u1EE5c \u0111\xEDch gi\xFAp t\xF4i th\u1EF1c h\xE0nh v\xE0 n\xE2ng cao k\u1EF9 n\u0103ng trong vi\u1EC7c s\u1EED d\u1EE5ng React k\u1EBFt h\u1EE3p v\u1EDBi Flask cho server-side rendering. B\xEAn c\u1EA1nh \u0111\xF3, \u1EE9ng d\u1EE5ng c\u0169ng nh\u1EB1m h\u1ED7 tr\u1EE3 c\xE1c b\u1EA1n sinh vi\xEAn c\u1EE7a \u0110\u1EA1i h\u1ECDc C\xF4ng ngh\u1EC7 Th\xF4ng tin (UIT) trong vi\u1EC7c ki\u1EC3m tra v\xE0 \u0111\xE1nh gi\xE1 \u0111i\u1EC1u ki\u1EC7n t\u1ED1t nghi\u1EC7p (t\xEDnh theo t\xEDn ch\u1EC9) m\u1ED9t c\xE1ch nhanh ch\xF3ng v\xE0 d\u1EC5 d\xE0ng."), /*#__PURE__*/_react["default"].createElement(Title, {
    level: 3
  }, "C\xE1c T\xEDnh N\u0103ng Ch\xEDnh:"), /*#__PURE__*/_react["default"].createElement("ul", null, /*#__PURE__*/_react["default"].createElement("li", null, "Giao di\u1EC7n th\xE2n thi\u1EC7n, thi\u1EBFt k\u1EBF \u0111\xE1p \u1EE9ng, ph\xF9 h\u1EE3p v\u1EDBi m\u1ECDi thi\u1EBFt b\u1ECB."), /*#__PURE__*/_react["default"].createElement("li", null, "Nh\u1EADp \u0111i\u1EC3m v\xE0 ki\u1EC3m tra \u0111i\u1EC1u ki\u1EC7n t\u1ED1t nghi\u1EC7p tr\u1EF1c ti\u1EBFp v\u1EDBi \u0111\u1ED9 b\u1EA3o m\u1EADt cao. D\u1EEF li\u1EC7u ng\u01B0\u1EDDi d\xF9ng \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7 tuy\u1EC7t \u0111\u1ED1i, kh\xF4ng thu th\u1EADp th\xF4ng tin c\xE1 nh\xE2n.")), /*#__PURE__*/_react["default"].createElement(Title, {
    level: 3
  }, "H\u01B0\u1EDBng D\u1EABn S\u1EED D\u1EE5ng:"), /*#__PURE__*/_react["default"].createElement(Paragraph, null, "\u0110\u1EC3 b\u1EAFt \u0111\u1EA7u, h\xE3y truy c\u1EADp v\xE0o trang ", /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    reloadDocument: true,
    to: "/"
  }, "Home"), " \u0111\u1EC3 nh\u1EADp \u0111i\u1EC3m s\u1ED1 v\xE0 \u0111i\u1EC1u ki\u1EC7n t\u1ED1t nghi\u1EC7p c\u1EE7a b\u1EA1n. Sau \u0111\xF3, h\u1EC7 th\u1ED1ng s\u1EBD t\u1EF1 \u0111\u1ED9ng t\xEDnh to\xE1n v\xE0 hi\u1EC3n th\u1ECB k\u1EBFt qu\u1EA3."), /*#__PURE__*/_react["default"].createElement(Paragraph, null, "B\u1EA5t k\u1EF3 g\xF3p \xFD hay g\u1EE3i \xFD ph\xE1t tri\u1EC3n n\xE0o, xin h\xE3y \u0111\u1EC1 xu\u1EA5t v\u1EDBi t\xF4i qua trang ", /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    reloadDocument: true,
    to: "/contact"
  }, "Contact"), "."))))));
}
var _default = exports["default"] = AboutPage;