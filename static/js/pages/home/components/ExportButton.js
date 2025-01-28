"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExportButton = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var ExportButton = exports.ExportButton = function ExportButton() {
  var handleExport = function handleExport() {
    var dataSource = JSON.parse(localStorage.getItem("userGPA"));
    // Define CSV headers
    var headers = ["STT", "Mã môn", "Tên môn", "Loại môn", "Số tín chỉ", "Điểm trung bình"];

    // Transform data into CSV format
    var csvData = dataSource.map(function (item, index) {
      var _item$course_type;
      var courseType = ((_item$course_type = item.course_type) === null || _item$course_type === void 0 ? void 0 : _item$course_type.value) || item.course_type || "";
      return [item.key, item.course_code || "", item.course_name_vn || "", courseType, item.total_credits || "", item.gpa || ""].join(",");
    });

    // Combine headers and data
    var csvContent = [headers.join(",")].concat(_toConsumableArray(csvData)).join("\n");

    // Create Blob and download link
    var blob = new Blob(["\uFEFF", csvContent], {
      // Adding BOM for Excel UTF-8 support
      type: "text/csv;charset=utf-8"
    });

    // Create download link
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "gpa_data_".concat(new Date().toISOString().slice(0, 10), ".csv");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(link.href);
  };
  return /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    icon: /*#__PURE__*/_react["default"].createElement(_icons.ExportOutlined, null),
    onClick: handleExport
  }, "Xu\u1EA5t CSV");
};