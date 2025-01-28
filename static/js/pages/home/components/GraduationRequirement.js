"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraduationRequirements = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _constants = require("../../../constants");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var GraduationRequirements = exports.GraduationRequirements = function GraduationRequirements() {
  var _Form$useForm = _antd.Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  (0, _react.useEffect)(function () {
    var savedData = localStorage.getItem("gradReqs");
    if (savedData) {
      form.setFieldsValue(JSON.parse(savedData));
    }
  }, [form]);
  var handleFieldsChange = function handleFieldsChange(_, allFields) {
    var updatedValues = form.getFieldsValue();
    localStorage.setItem("gradReqs", JSON.stringify(updatedValues));
  };
  return /*#__PURE__*/_react["default"].createElement(_antd.Card, null, /*#__PURE__*/_react["default"].createElement(_antd.Form, {
    form: form,
    onFieldsChange: handleFieldsChange,
    layout: "vertical",
    style: {
      maxWidth: "100%",
      margin: "20px"
    },
    initialValues: {
      requirements: [{}]
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Form.List, {
    name: "requirements"
  }, function (fields, _ref) {
    var add = _ref.add,
      remove = _ref.remove;
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, fields.map(function (field, index) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "".concat(field.key),
        style: {
          marginBottom: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "flex-start"
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        label: "T\xEAn \u0111i\u1EC1u ki\u1EC7n",
        name: [field.name, "name"],
        rules: [{
          required: true,
          message: "Vui lòng chọn điều kiện"
        }, {
          validator: function validator(_, value) {
            var currentValues = form.getFieldValue("requirements") || [];
            var duplicate = currentValues.some(function (item, idx) {
              return idx !== index && item.name === value;
            });
            if (duplicate) {
              return Promise.reject(new Error("Loại điều kiện đã được chọn, vui lòng chọn loại khác"));
            }
            return Promise.resolve();
          }
        }],
        style: {
          flex: 5,
          marginBottom: 0
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        placeholder: "Ch\u1ECDn \u0111i\u1EC1u ki\u1EC7n",
        options: _constants.COURSE_TYPE_OPTIONS
      })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        label: "T\u1ED5ng s\u1ED1 t\xEDn ch\u1EC9 t\u1ED1i thi\u1EC3u",
        name: [field.name, "value"],
        rules: [{
          required: true,
          message: "Vui lòng nhập giá trị"
        }, {
          pattern: /^[0-9]+$/,
          message: "Số tín chỉ phải là số"
        }],
        style: {
          flex: 3,
          marginBottom: 0
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        placeholder: "V\xED d\u1EE5: 158"
      })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        label: "Ghi ch\xFA",
        name: [field.name, "note"],
        style: {
          flex: 2,
          marginBottom: 0
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        placeholder: "Th\xEAm ghi ch\xFA n\u1EBFu c\u1EA7n"
      })), fields.length > 1 && /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        danger: true,
        onClick: function onClick() {
          return remove(field.name);
        },
        style: {
          marginTop: "29px"
        },
        icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, null)
      }, "X\xF3a"));
    }), /*#__PURE__*/_react["default"].createElement(_antd.Space, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      type: "dashed",
      onClick: function onClick() {
        form.validateFields() // Validate all fields in the form
        .then(function () {
          add(); // Add a new item if validation passes
        })["catch"](function () {
          // Handle validation errors if needed
          console.log("Validation failed. Please fill all required fields before adding.");
        });
      },
      icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)
    }, "Th\xEAm \u0111i\u1EC1u ki\u1EC7n")));
  })));
};