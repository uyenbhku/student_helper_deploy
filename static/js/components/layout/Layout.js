"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutWrapper = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Header = _antd.Layout.Header,
  Footer = _antd.Layout.Footer,
  Content = _antd.Layout.Content;
var LayoutWrapper = exports.LayoutWrapper = function LayoutWrapper() {
  var location = (0, _reactRouterDom.useLocation)();
  var currentPath = location.pathname;
  return /*#__PURE__*/_react["default"].createElement(_antd.Layout, {
    style: {
      minHeight: "100vh"
    }
  }, /*#__PURE__*/_react["default"].createElement(Header, {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    reloadDocument: true,
    to: "/",
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: '../../static/img/logo.svg',
    alt: "Logo",
    style: {
      height: '40px'
    }
  }), " ")), /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
    theme: "dark",
    mode: "horizontal",
    selectedKeys: [currentPath],
    style: {
      width: 'auto',
      flex: 1,
      justifyContent: "flex-end"
    },
    items: [{
      key: "/",
      label: /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        reloadDocument: true,
        to: "/"
      }, "Trang ch\u1EE7")
    }, {
      key: "/about",
      label: /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        reloadDocument: true,
        to: "/about"
      }, "Gi\u1EDBi thi\u1EC7u")
    }, {
      key: "/contact",
      label: /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
        reloadDocument: true,
        to: "/contact"
      }, "Li\xEAn h\u1EC7")
    }]
  })), /*#__PURE__*/_react["default"].createElement(Content, {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Outlet, null)), /*#__PURE__*/_react["default"].createElement(Footer, {
    style: {
      textAlign: "center"
    }
  }, "App \xA92025 Created with React Flask"));
};