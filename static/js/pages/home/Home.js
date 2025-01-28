"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = HomePage;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
var _GpaTable = require("./components/GpaTable");
var _Result = require("./components/Result");
var _GraduationRequirements = require("./components/GraduationRequirements");
var _Recommend = require("./components/Recommend");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var MemoGpaTable = /*#__PURE__*/_react["default"].memo(_GpaTable.GpaTable);
var MemoResult = /*#__PURE__*/_react["default"].memo(_Result.Result);
var MemoGraduationRequirements = /*#__PURE__*/_react["default"].memo(_GraduationRequirements.GraduationRequirements);
var MemoRecommend = /*#__PURE__*/_react["default"].memo(_Recommend.Recommend);
function HomePage() {
  var location = (0, _reactRouterDom.useLocation)();
  var navigate = (0, _reactRouterDom.useNavigate)();

  // Extract the 'tab' search param from the URL (if any)
  var queryParams = new URLSearchParams(location.search);
  var initialTab = queryParams.get("tab") || "1"; // Default to '1' if no 'tab' param is found

  var _useState = (0, _react.useState)(initialTab),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];

  // Update the query parameter in the URL when the tab changes
  var onTabChange = function onTabChange(key) {
    setActiveTab(key);
    navigate("?tab=".concat(key), {
      replace: true
    });
  };
  (0, _react.useEffect)(function () {
    // Ensure that the initial tab value is in sync with the URL
    var queryTab = queryParams.get("tab");
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [location.search, activeTab]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Tabs, {
    defaultActiveKey: activeTab,
    onChange: onTabChange,
    type: "card",
    items: [{
      label: "Bảng điểm",
      key: "1",
      children: /*#__PURE__*/_react["default"].createElement(MemoGpaTable, null)
    }, {
      label: "Điều kiện tốt nghiệp",
      key: "2",
      children: /*#__PURE__*/_react["default"].createElement(MemoGraduationRequirements, null)
    }, {
      label: "Kết quả",
      key: "3",
      children: /*#__PURE__*/_react["default"].createElement(MemoResult, null)
    }, {
      label: "Gợi ý",
      key: "4",
      children: /*#__PURE__*/_react["default"].createElement(MemoRecommend, null)
    }]
  }));
}