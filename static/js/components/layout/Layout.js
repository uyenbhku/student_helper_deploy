"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutWrapper = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
var _icons = require("@ant-design/icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Header = _antd.Layout.Header,
  Footer = _antd.Layout.Footer,
  Content = _antd.Layout.Content;
var LayoutWrapper = exports.LayoutWrapper = function LayoutWrapper() {
  var location = (0, _reactRouterDom.useLocation)();
  var currentPath = location.pathname;
  var checkWindowSize = function checkWindowSize() {
    if (window.innerWidth > 599) {
      setMenuVisible(true);
      setMenuMode("horizontal");
    } else {
      setMenuMode("inline");
    }
  };
  var _useState = (0, _react.useState)("horizontal"),
    _useState2 = _slicedToArray(_useState, 2),
    menuMode = _useState2[0],
    setMenuMode = _useState2[1];
  (0, _react.useEffect)(function () {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return function () {
      return window.removeEventListener("resize", checkWindowSize);
    };
  }, [checkWindowSize]);
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    menuVisible = _useState4[0],
    setMenuVisible = _useState4[1];
  return /*#__PURE__*/_react["default"].createElement(_antd.Layout, {
    style: {
      minHeight: "100vh"
    }
  }, /*#__PURE__*/_react["default"].createElement(Header, {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    reloadDocument: true,
    to: "/",
    style: {
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: "../../static/img/logo.svg",
    alt: "Logo",
    style: {
      height: "40px"
    }
  }), " ")), !menuVisible && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.MenuUnfoldOutlined, null),
    onClick: function onClick() {
      return setMenuVisible(true);
    }
  }), menuVisible && /*#__PURE__*/_react["default"].createElement(_antd.Menu, {
    theme: "dark",
    mode: menuMode,
    selectedKeys: [currentPath],
    style: menuMode == "inline" ? {
      width: "70vw",
      position: "absolute",
      top: 10,
      height: "100vh",
      zIndex: 1000,
      right: 0
    } : {
      width: "auto",
      flex: 1,
      justifyContent: "flex-end"
    },
    items: [{
      key: "close",
      label: /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, null),
      onClick: function onClick() {
        return setMenuVisible(false);
      },
      style: {
        textAlign: "right",
        display: menuMode === "inline" ? "block" : "none"
      }
    }, {
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
    }],
    onClick: function onClick() {
      return setMenuVisible(false);
    }
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