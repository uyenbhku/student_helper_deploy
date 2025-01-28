"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _reactRouterDom = require("react-router-dom");
var _constants = require("../../../utils/constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Dragger = _antd.Upload.Dragger;
var ImportButton = exports.ImportButton = function ImportButton(_ref) {
  var onImportSuccess = _ref.onImportSuccess;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isModalOpen = _useState4[0],
    setIsModalOpen = _useState4[1];
  var coursesData = window.__APP_DATA__;
  var _App$useApp = _antd.App.useApp(),
    message = _App$useApp.message,
    notification = _App$useApp.notification;
  var findCourseData = function findCourseData(courseCode) {
    return coursesData.find(function (course) {
      return course.course_code === courseCode;
    });
  };
  var validateRequiredFields = function validateRequiredFields(fields) {
    var requiredFields = ["course_code", "gpa"];
    var missingFields = requiredFields.filter(function (field) {
      return !fields[field];
    });
    if (missingFields.length > 0) {
      throw new Error("Thi\u1EBFu th\xF4ng tin b\u1EAFt bu\u1ED9c: ".concat(missingFields.join(", ")));
    }
  };
  var processCSVContent = function processCSVContent(content) {
    try {
      var lines = content.split("\n").filter(function (line) {
        return line.trim();
      });
      var headers = lines[0].toLowerCase().split(",").map(function (h) {
        return h.trim();
      });
      var headerMap = {
        "mã môn": "course_code",
        "ma mon": "course_code",
        course_code: "course_code",
        "điểm trung bình": "gpa",
        "diem trung binh": "gpa",
        gpa: "gpa",
        "loai mon": "course_type",
        "loại môn": "course_type",
        course_type: "course_type",
        loai: "course_type",
        "so tin chi": "total_credits",
        "so tin": "total_credits",
        "số tín chỉ": "total_credits",
        "số tín": "total_credits",
        total_credits: "total_credits"
      };
      var fieldIndices = {};
      headers.forEach(function (header, index) {
        header = header.toLowerCase();
        if (headerMap[header]) {
          fieldIndices[headerMap[header]] = index;
        }
      });
      var seenCourses = new Set(); // Track seen course codes
      var importedData = lines.slice(1).map(function (line, index) {
        var values = line.split(",").map(function (v) {
          return v.trim();
        });
        var fields = {};
        Object.entries(fieldIndices).forEach(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
            field = _ref3[0],
            idx = _ref3[1];
          fields[field] = values[idx];
        });

        // Validate required fields
        validateRequiredFields(fields);

        // Check if the course has already been seen
        if (seenCourses.has(fields.course_code)) {
          // Duplicate found: Keep only course_code and gpa
          notification.error({
            message: "Phát hiện môn học bị lặp",
            description: "M\xF4n h\u1ECDc ".concat(fields.course_code, " \u1EDF STT ").concat(index + 1, " b\u1ECB l\u1EB7p")
          }, 5000);
          return {
            key: index,
            course_code: fields.course_code,
            gpa: fields.gpa,
            course_name_vn: null,
            course_type: null,
            total_credits: null
          };
        }

        // First occurrence: Populate full data
        var courseData = findCourseData(fields.course_code);
        if (!courseData) {
          throw new Error("Kh\xF4ng t\xECm th\u1EA5y th\xF4ng tin m\xF4n h\u1ECDc: ".concat(fields.course_code));
        }
        seenCourses.add(fields.course_code); // Mark this course as seen

        return {
          key: index,
          course_code: fields.course_code,
          course_name_vn: courseData.course_name_vn,
          course_type: (0, _constants.getBaseType)(fields.course_type) || courseData.course_type,
          total_credits: parseInt((fields === null || fields === void 0 ? void 0 : fields.total_credits) || (courseData === null || courseData === void 0 ? void 0 : courseData.total_credits) || 0),
          gpa: fields.gpa
        };
      });
      localStorage.setItem("userGPA", JSON.stringify(importedData));
      if (onImportSuccess) {
        onImportSuccess(importedData);
      }
      notification.success({
        message: "Thành công",
        description: "\u0110\xE3 nh\u1EADp ".concat(importedData.length, " m\xF4n h\u1ECDc th\xE0nh c\xF4ng!")
      }, 2000);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error processing CSV:", error);
      notification.error({
        message: "Lỗi",
        description: error.message || "Lỗi khi xử lý file CSV. Vui lòng kiểm tra định dạng file."
      }, 2000);
    }
  };
  var handleImport = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
      var reader;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            try {
              setLoading(true);
              reader = new FileReader();
              reader.onload = function (e) {
                var content = e.target.result;
                processCSVContent(content);
                setLoading(false);
              };
              reader.onerror = function () {
                notification.error({
                  message: "Lỗi",
                  description: "Lỗi khi đọc file"
                }, 2000);
                setLoading(false);
              };
              reader.readAsText(file, "UTF-8");
            } catch (error) {
              console.error("Import error:", error);
              notification.error({
                message: "Lỗi",
                description: "Lỗi khi nhập file"
              }, 2000);
              setLoading(false);
            }
            return _context.abrupt("return", false);
          case 2:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function handleImport(_x) {
      return _ref4.apply(this, arguments);
    };
  }();
  var uploadProps = {
    accept: ".csv",
    showUploadList: false,
    customRequest: function customRequest(_ref5) {
      var file = _ref5.file;
      return handleImport(file);
    },
    beforeUpload: function beforeUpload(file) {
      var isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isCSV) {
        notification.error({
          message: "Chỉ hỗ trợ tệp CSV!"
        }, 2000);
        return false;
      }
      return true;
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null),
    onClick: function onClick() {
      return setIsModalOpen(true);
    }
  }, "Nh\u1EADp b\u1EB1ng CSV"), /*#__PURE__*/_react["default"].createElement(_antd.Modal, {
    title: "Nh\u1EADp \u0111i\u1EC3m t\u1EEB file CSV",
    open: isModalOpen,
    onCancel: function onCancel() {
      return setIsModalOpen(false);
    },
    footer: null,
    destroyOnClose: true
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      marginBottom: 16
    }
  }, "File CSV ", /*#__PURE__*/_react["default"].createElement("strong", null, "c\u1EA7n ph\u1EA3i c\xF3"), " c\xE1c c\u1ED9t sau:", /*#__PURE__*/_react["default"].createElement("br", null), "- M\xE3 m\xF4n (VD: IT001)", /*#__PURE__*/_react["default"].createElement("br", null), "- GPA (VD: 8.5)", /*#__PURE__*/_react["default"].createElement("br", null), "File CSV c\xF3 th\u1EC3 c\xF3 c\xE1c c\u1ED9t sau:", /*#__PURE__*/_react["default"].createElement("br", null), "- Lo\u1EA1i m\xF4n: l\xE0 t\xEAn vi\u1EBFt t\u1EAFt c\u1EE7a lo\u1EA1i m\xF4n (VD: \u0110C)", /*#__PURE__*/_react["default"].createElement("br", null), "- S\u1ED1 t\xEDn ch\u1EC9 (VD: 3)", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("br", null), " C\xF3 th\u1EC3 l\u1EA5y template b\u1EB1ng c\xE1ch s\u1EED d\u1EE5ng t\xEDnh n\u0103ng xu\u1EA5t CSV.", /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("strong", null, "L\u01B0u \xFD:"), /*#__PURE__*/_react["default"].createElement("br", null), "- N\u1EBFu c\xF3 th\xF4ng b\xE1o ph\xE1t hi\u1EC7n m\xF4n h\u1ECDc tr\xF9ng l\u1EB7p, vui l\xF2ng ki\u1EC3m tra t\u1EA1i s\u1ED1 th\u1EE9 t\u1EF1 (STT) \u0111\u01B0\u1EE3c b\xE1o.", /*#__PURE__*/_react["default"].createElement("br", null), "- T\u1EA5t c\u1EA3 c\xE1c m\xF4n h\u1ECDc \u0111\xE3 nh\u1EADp tay s\u1EBD b\u1ECB m\u1EA5t. Vui l\xF2ng xu\u1EA5t CSV n\u1EBFu mu\u1ED1n gi\u1EEF l\u1EA1i.", /*#__PURE__*/_react["default"].createElement("br", null), "- C\xE1c th\xF4ng tin \u0111\u01B0\u1EE3c t\u1EF1 truy v\u1EA5n m\u1EDBi nh\u1EA5t t\u1EEB trang", " ", /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Link, {
    to: "https://daa.uit.edu.vn/danh-muc-mon-hoc-dai-hoc",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Danh m\u1EE5c m\xF4n h\u1ECDc"), ". C\xF3 th\u1EC3 kh\xF4ng \u0111\xFAng s\u1ED1 t\xEDn / lo\u1EA1i m\xF4n cho Ch\u01B0\u01A1ng tr\xECnh \u0111\xE0o t\u1EA1o \u1EDF Kh\xF3a c\u1EE7a b\u1EA1n, vui l\xF2ng v\xE0o DAA ki\u1EC3m tra v\xE0 ch\u1EC9nh s\u1EEDa l\u1EA1i s\u1ED1 t\xEDn/lo\u1EA1i m\xF4n tr\xEAn giao di\u1EC7n cho ph\xF9 h\u1EE3p."), /*#__PURE__*/_react["default"].createElement(Dragger, _extends({}, uploadProps, {
    loading: loading
  }), /*#__PURE__*/_react["default"].createElement("p", {
    className: "ant-upload-drag-icon"
  }, /*#__PURE__*/_react["default"].createElement(_icons.InboxOutlined, null)), /*#__PURE__*/_react["default"].createElement("p", {
    className: "ant-upload-text"
  }, "Nh\u1EA5p ho\u1EB7c k\xE9o file v\xE0o khu v\u1EF1c n\xE0y \u0111\u1EC3 t\u1EA3i l\xEAn"), /*#__PURE__*/_react["default"].createElement("p", {
    className: "ant-upload-hint"
  }, "Ch\u1EC9 h\u1ED7 tr\u1EE3 file CSV"))));
};