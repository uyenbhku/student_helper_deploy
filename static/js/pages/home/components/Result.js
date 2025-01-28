"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _reactRouterDom = require("react-router-dom");
var _constants = require("../../../utils/constants");
var _courseGpa = require("../../../utils/courseGpa");
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Result = exports.Result = function Result() {
  var _gpaStats$creditPerTy;
  // const queryParams = new URLSearchParams(location.search);
  var _useState = (0, _react.useState)(true),
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

  // Calculate credits by type
  var getCreditComparison = function getCreditComparison() {
    // Create requirements map
    var reqMap = requirements.filter(function (req) {
      return req !== null;
    }).reduce(function (acc, req) {
      acc[req.name] = parseInt(req.value);
      return acc;
    }, {});

    // Compare with requirements
    var comparison = {};
    var missingCredits = {};
    Object.entries(reqMap).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        reqType = _ref2[0],
        reqCredits = _ref2[1];
      // Use the base type for comparison
      var baseType = (0, _constants.getBaseType)(reqType);
      var actualCredits = (gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.creditPerType[baseType]) || 0;
      comparison[reqType] = {
        required: reqCredits,
        actual: actualCredits,
        met: actualCredits >= reqCredits,
        percentage: Math.round(actualCredits / reqCredits * 100)
      };
      if (actualCredits < reqCredits) {
        missingCredits[reqType] = reqCredits - actualCredits;
      }
    });

    // Add original course type mapping for reference
    var typeMapping = {};
    courseList.forEach(function (course) {
      if ((0, _courseGpa.dontUse)(course)) return;
      var originalType = course.course_type;
      var baseType = (0, _constants.getBaseType)(originalType);
      if (originalType !== baseType) {
        if (!typeMapping[baseType]) {
          typeMapping[baseType] = new Set();
        }
        typeMapping[baseType].add(originalType);
      }
    });
    return {
      comparison: comparison,
      missingCredits: missingCredits,
      typeMapping: Object.fromEntries(Object.entries(typeMapping).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
          key = _ref4[0],
          value = _ref4[1];
        return [key, Array.from(value)];
      }))
    };
  };
  var getGpaStats = function getGpaStats() {
    var CGPA = (0, _courseGpa.calculateCumulativeGPA)(courseList);
    var _countCourses = (0, _courseGpa.countCourses)(courseList),
      totalCredits = _countCourses.totalCredits,
      totalCourses = _countCourses.totalCourses,
      totalGPACredits = _countCourses.totalGPACredits,
      coursesWithGPA = _countCourses.coursesWithGPA,
      creditPerType = _countCourses.creditPerType;
    return {
      cumulativeGPA: CGPA || "N/A",
      totalCredits: totalCredits,
      totalCourses: totalCourses,
      coursesWithGPA: coursesWithGPA,
      creditPerType: creditPerType,
      totalGPACredits: totalGPACredits
    };
  };
  var _useState7 = (0, _react.useState)(),
    _useState8 = _slicedToArray(_useState7, 2),
    gpaStats = _useState8[0],
    setGpaStats = _useState8[1];
  var _useState9 = (0, _react.useState)(),
    _useState10 = _slicedToArray(_useState9, 2),
    creditComparison = _useState10[0],
    setCreditComparison = _useState10[1];
  var _useSearchParams = (0, _reactRouterDom.useSearchParams)(),
    _useSearchParams2 = _slicedToArray(_useSearchParams, 2),
    queryParams = _useSearchParams2[0],
    setQueryParams = _useSearchParams2[1];
  (0, _react.useEffect)(function () {
    // Ensure that the initial tab value is in sync with the URL
    var queryTab = queryParams.get("tab");
    if (queryTab === "3") {
      setCourseList(function () {
        return JSON.parse(localStorage.getItem("userGPA")) || [];
      });
      setRequirements(function () {
        var _JSON$parse2;
        return ((_JSON$parse2 = JSON.parse(localStorage.getItem("gradReqs"))) === null || _JSON$parse2 === void 0 ? void 0 : _JSON$parse2.requirements) || [];
      });
    }
  }, [queryParams]);
  var debouncedCalculateGpa = (0, _react.useCallback)((0, _lodash.debounce)(function () {
    setGpaStats(getGpaStats());
  }, 500), [courseList, requirements]);
  (0, _react.useEffect)(function () {
    setLoading(true);
    debouncedCalculateGpa();
    return function () {
      return debouncedCalculateGpa.cancel();
    };
  }, [debouncedCalculateGpa]);
  var debouncedCalculateComp = (0, _react.useCallback)((0, _lodash.debounce)(function () {
    setCreditComparison(getCreditComparison());
    setLoading(false);
  }, 500), [gpaStats]);
  (0, _react.useEffect)(function () {
    setLoading(true);
    debouncedCalculateComp();
    return function () {
      return debouncedCalculateComp.cancel();
    };
  }, [debouncedCalculateComp]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "24px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    title: /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/_react["default"].createElement("span", null, "T\u1ED5ng quan")),
    style: {
      marginBottom: "24px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: [16, 16]
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 8
  }, /*#__PURE__*/_react["default"].createElement(_antd.Statistic, {
    title: "\u0110i\u1EC3m trung b\xECnh t\xEDch l\u0169y (CGPA)",
    value: gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.cumulativeGPA,
    precision: 2,
    valueStyle: {
      color: getColorByScore(gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.cumulativeGPA)
    }
  })), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 8
  }, /*#__PURE__*/_react["default"].createElement(_antd.Statistic, {
    title: "T\u1ED5ng s\u1ED1 t\xEDn",
    value: gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.totalCredits,
    suffix: "t\xEDn"
  })), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 8
  }, /*#__PURE__*/_react["default"].createElement(_antd.Statistic, {
    title: "T\u1ED5ng m\xF4n",
    value: gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.totalCourses,
    suffix: "m\xF4n"
  })))), /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    title: "S\u1ED1 t\xEDn m\u1ED7i lo\u1EA1i",
    style: {
      marginBottom: "24px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: [16, 16]
  }, gpaStats !== null && gpaStats !== void 0 && (_gpaStats$creditPerTy = gpaStats.creditPerType) !== null && _gpaStats$creditPerTy !== void 0 && _gpaStats$creditPerTy.no_name ? /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 8,
    key: "no_name"
  }, /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    style: {
      backgroundColor: "#f4cccc" // Red background
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Statistic, {
    title: "T\xEDn ch\u1EC9 C\u1EA7n \u0111\u01B0\u1EE3c ch\u1EC9nh s\u1EEDa",
    value: gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.creditPerType.no_name,
    suffix: "t\xEDn ch\u1EC9"
  }))) : null, (gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.creditPerType) && Object.entries(gpaStats === null || gpaStats === void 0 ? void 0 : gpaStats.creditPerType).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      type = _ref6[0],
      credits = _ref6[1];
    return type !== "no_name" && /*#__PURE__*/_react["default"].createElement(_antd.Col, {
      span: 8,
      key: type
    }, /*#__PURE__*/_react["default"].createElement(_antd.Card, null, /*#__PURE__*/_react["default"].createElement(_antd.Statistic, {
      title: "T\xEDn ch\u1EC9 ".concat(_constants.COURSE_TYPE_OBJECT[type]),
      value: credits,
      suffix: "t\xEDn ch\u1EC9"
    })));
  }))), /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading,
    title: "Ti\u1EBFn tr\xECnh",
    style: {
      marginBottom: "24px"
    }
  }, (creditComparison === null || creditComparison === void 0 ? void 0 : creditComparison.comparison) && Object.entries(creditComparison === null || creditComparison === void 0 ? void 0 : creditComparison.comparison).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      type = _ref8[0],
      data = _ref8[1];
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: type,
      style: {
        marginBottom: "16px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
      align: "middle",
      justify: "space-between",
      style: {
        marginBottom: "8px"
      }
    }, /*#__PURE__*/_react["default"].createElement(_antd.Col, null, /*#__PURE__*/_react["default"].createElement(_antd.Typography.Text, {
      strong: true
    }, _constants.COURSE_TYPE_OBJECT[type])), /*#__PURE__*/_react["default"].createElement(_antd.Col, null, /*#__PURE__*/_react["default"].createElement(_antd.Typography.Text, {
      type: data.met ? "success" : "danger"
    }, data.actual, " / ", data.required, " t\xEDn ch\u1EC9", data.met ? /*#__PURE__*/_react["default"].createElement(_icons.CheckCircleFilled, {
      style: {
        marginLeft: "8px"
      }
    }) : /*#__PURE__*/_react["default"].createElement(_icons.CloseCircleFilled, {
      style: {
        marginLeft: "8px"
      }
    })))), /*#__PURE__*/_react["default"].createElement(_antd.Progress, {
      percent: data.percentage,
      status: data.met ? "success" : "active",
      showInfo: true
    }), !data.met && /*#__PURE__*/_react["default"].createElement(_antd.Typography.Text, {
      type: "danger",
      style: {
        display: "block",
        marginTop: "4px"
      }
    }, "C\xF2n thi\u1EBFu ", creditComparison === null || creditComparison === void 0 ? void 0 : creditComparison.missingCredits[type], " t\xEDn ch\u1EC9"));
  })));
};
var getColorByScore = function getColorByScore(score) {
  if (!score || score < 0 || score > 10) return "#000000"; // Default black for invalid scores
  if (score < 5) return "#ff4d4f"; // Red for failing/poor scores (0-4.9)
  if (score < 6.5) return "#faad14"; // Yellow/Warning for below average (5-6.4)
  if (score < 8) return "#1890ff"; // Blue for good scores (6.5-7.9)
  if (score < 9) return "#52c41a"; // Green for very good scores (8-8.9)
  return "#13c2c2"; // Cyan for excellent scores (9-10)
};