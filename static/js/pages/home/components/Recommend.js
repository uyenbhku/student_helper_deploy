"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Recommend = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _reactRouterDom = require("react-router-dom");
var _constants = require("../../../utils/constants");
var _courseGpa = require("../../../utils/courseGpa");
var _icons = require("@ant-design/icons");
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Title = _antd.Typography.Title,
  Paragraph = _antd.Typography.Paragraph;
var Recommend = exports.Recommend = function Recommend() {
  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 2),
    queryParams = _useSearchParams2[0],
    setQueryParams = _useSearchParams2[1];
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(function () {
      return JSON.parse(localStorage.getItem("userGPA")) || [];
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    courseList = _useState4[0],
    setCourseList = _useState4[1];
  var _useState5 = (0, _react.useState)(function () {
      var _JSON$parse;
      return ((_JSON$parse = JSON.parse(localStorage.getItem("gradReqs"))) === null || _JSON$parse === void 0 ? void 0 : _JSON$parse.requirements) || [];
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    requirements = _useState6[0],
    setRequirements = _useState6[1];
  (0, _react.useEffect)(function () {
    var queryTab = queryParams.get("tab");
    if (queryTab === "4") {
      var _JSON$parse2;
      var newCourseList = JSON.parse(localStorage.getItem("userGPA")) || [];
      var newRequirements = ((_JSON$parse2 = JSON.parse(localStorage.getItem("gradReqs"))) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.requirements) || [];

      // Only update state if the data has changed
      if (JSON.stringify(courseList) !== JSON.stringify(newCourseList)) {
        setCourseList(newCourseList);
      }
      if (JSON.stringify(requirements) !== JSON.stringify(newRequirements)) {
        setRequirements(newRequirements);
      }
    }
  }, [queryParams, courseList, requirements]);
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    recommendation = _useState8[0],
    setRecommendation = _useState8[1];
  var debouncedCalculate = (0, _react.useCallback)((0, _lodash.debounce)(function () {
    setRecommendation(calculateMaxCGPA(courseList, requirements));
    setLoading(false);
  }, 2000), [courseList, requirements]);
  (0, _react.useEffect)(function () {
    setLoading(true);
    debouncedCalculate();
    return function () {
      return debouncedCalculate.cancel();
    };
  }, [debouncedCalculate]);

  // Columns for used and unused courses
  var columns = [{
    title: "Tên môn",
    dataIndex: "course_name_vn",
    key: "course_name"
  }, {
    title: "Số tín chỉ",
    dataIndex: "total_credits",
    key: "total_credits"
  }, {
    title: "GPA",
    dataIndex: "gpa",
    key: "gpa"
  }, {
    title: "Loại môn",
    dataIndex: "course_type",
    key: "course_type"
  }];
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    style: {
      flex: 1,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#e6f7ff"
    }
  }, /*#__PURE__*/_react["default"].createElement(Title, {
    level: 4,
    style: {
      marginBottom: "8px",
      color: "#1890ff"
    }
  }, "\u0110i\u1EC3m t\xEDch l\u0169y hi\u1EC7n t\u1EA1i"), /*#__PURE__*/_react["default"].createElement(Paragraph, {
    style: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: 0
    }
  }, recommendation === null || recommendation === void 0 ? void 0 : recommendation.oldCGPA)), /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    style: {
      flex: 1,
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#f6ffed"
    }
  }, /*#__PURE__*/_react["default"].createElement(Title, {
    level: 4,
    style: {
      marginBottom: "8px",
      color: "#52c41a"
    }
  }, "\u0110i\u1EC3m t\xEDch l\u0169y t\u1ED1i \u01B0u"), /*#__PURE__*/_react["default"].createElement(Paragraph, {
    style: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: 0
    }
  }, recommendation === null || recommendation === void 0 ? void 0 : recommendation.newCGPA))), /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    style: {
      marginBottom: "20px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      backgroundColor: "#f7f9fc"
    },
    title: /*#__PURE__*/_react["default"].createElement(Title, {
      level: 4,
      style: {
        margin: 0
      }
    }, "G\u1EE3i \xFD ch\u1ECDn m\xF4n")
  }, /*#__PURE__*/_react["default"].createElement(Paragraph, {
    style: {
      marginBottom: "16px"
    }
  }, "D\u01B0\u1EDBi \u0111\xE2y l\xE0 c\xE1c m\xF4n c\xE1c b\u1EA1n c\xF3 th\u1EC3 x\xF3a \u0111\u1EC3 \u0111\u1EA1t \u0111\u01B0\u1EE3c t\u1ED1i \u01B0u \u0111i\u1EC3m t\xEDch l\u0169y t\u1ED1t nghi\u1EC7p.", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "L\u01B0u \xFD:"), /*#__PURE__*/_react["default"].createElement("br", null), " - \u0110\u1EC3 c\xF3 th\u1EC3 t\u1ED1i \u01B0u h\u01A1n, b\u1EA1n c\xF3 th\u1EC3 \u0111\u1EBFn xem tab K\u1EBFt qu\u1EA3, n\u1EBFu s\u1ED1 t\xEDn ch\u1EC9 c\u1EE7a m\u1ED9t \u0111i\u1EC1u ki\u1EC7n d\u01B0, b\u1EA1n c\xF3 th\u1EC3 s\u1EAFp x\u1EBFp qua lo\u1EA1i m\xF4n kh\xE1c (n\u1EBFu m\xF4n \u0111\xF3 c\xF3 th\u1EC3 th\u1ECFa m\xE3n nhi\u1EC1u lo\u1EA1i m\xF4n).", /*#__PURE__*/_react["default"].createElement("br", null), " - \u0110\xE2y ch\u1EC9 l\xE0 g\u1EE3i \xFD ban \u0111\u1EA7u, b\u1EA1n ph\u1EA3i ki\u1EC3m tra xem n\u1EBFu vi\u1EC7c x\xF3a m\xF4n n\xE0y c\xF3 th\u1ECFa \u0111i\u1EC1u ki\u1EC7n m\xF4n h\u1ECDc ti\xEAn quy\u1EBFt, m\xF4n h\u1ECDc tr\u01B0\u1EDBc c\u1EE7a b\u1EA1n hay kh\xF4ng.", /*#__PURE__*/_react["default"].createElement("br", null)), /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    dataSource: recommendation === null || recommendation === void 0 ? void 0 : recommendation.unusedCourses.map(function (course, index) {
      return _objectSpread(_objectSpread({}, course), {}, {
        key: index
      });
    }),
    columns: columns,
    pagination: {}
  })));
};
var calculateMaxCGPA = function calculateMaxCGPA(courseList, requirements) {
  // Initialize remaining credits with proper type checking
  var remainingCredits = Object.keys(requirements).reduce(function (acc, key) {
    var item = requirements[key];
    if (item && item.name) {
      acc[item.name] = item.value !== null ? parseInt(item.value, 10) : null;
    } else if (item === null) {
      acc[key] = null;
    }
    return acc;
  }, {});

  // Calculate course weight (GPA contribution)
  var calculateCourseWeight = function calculateCourseWeight(course) {
    var gpa = parseFloat(course.gpa) || 0;
    return gpa; // Sort by GPA for maximum CGPA
  };

  // First, handle mandatory courses
  var usedCourses = courseList.filter(function (course) {
    if ((0, _courseGpa.dontUseForGPA)(course)) {
      var baseType = (0, _constants.getBaseType)(course.course_type);
      if (baseType in remainingCredits) {
        remainingCredits[baseType] -= parseInt(course.total_credits || 0);
      }
      return true;
    }
    return false;
  });

  // Sort remaining courses by GPA (higher first)
  var sortedOptionalCourses = courseList.filter(function (course) {
    return !(0, _courseGpa.dontUseForGPA)(course);
  }).sort(function (a, b) {
    return calculateCourseWeight(b) - calculateCourseWeight(a);
  });

  // Process optional courses
  var unusedCourses = [];
  sortedOptionalCourses.forEach(function (course) {
    var baseType = (0, _constants.getBaseType)(course.course_type);

    // Use the course if we still need credits of this type
    if (remainingCredits[baseType] && remainingCredits[baseType] > 0) {
      remainingCredits[baseType] -= parseInt(course.total_credits || 0);
      usedCourses.push(course);
    } else {
      unusedCourses.push(course);
    }
  });

  // Check if all requirements are met
  var requirementsMet = Object.values(remainingCredits).every(function (credits) {
    return credits === null || credits <= 0;
  });

  // Calculate GPAs
  var oldCGPA = (0, _courseGpa.calculateCumulativeGPA)(courseList);
  var newCGPA = requirementsMet ? (0, _courseGpa.calculateCumulativeGPA)(usedCourses) : "N/A";
  return {
    unusedCourses: requirementsMet ? unusedCourses : [],
    usedCourses: usedCourses,
    remainingCredits: remainingCredits,
    requirementsMet: requirementsMet,
    oldCGPA: oldCGPA,
    newCGPA: newCGPA
  };
};