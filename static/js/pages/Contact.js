"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Title = _antd.Typography.Title,
  Paragraph = _antd.Typography.Paragraph;
function ContactPage() {
  var _App$useApp = _antd.App.useApp(),
    message = _App$useApp.message;
  var _Form$useForm = _antd.Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var onFinish = function onFinish(values) {
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values) // Send form values as JSON
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      message.open({
        type: data.status,
        content: data.message
      });
      // You can show a success message or handle the response as needed
      form.resetFields();
    })["catch"](function (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  };
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      padding: "20px"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Row, {
    gutter: 16
  }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
    span: 24
  }, /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    title: "Li\xEAn H\u1EC7",
    bordered: false,
    style: {
      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Typography, null, /*#__PURE__*/_react["default"].createElement(Title, {
    level: 2
  }, "Ch\xFAng t\xF4i lu\xF4n s\u1EB5n s\xE0ng l\u1EAFng nghe b\u1EA1n"), /*#__PURE__*/_react["default"].createElement(Paragraph, null, "N\u1EBFu b\u1EA1n c\xF3 b\u1EA5t k\u1EF3 c\xE2u h\u1ECFi n\xE0o, g\u1EE3i \xFD ph\xE1t tri\u1EC3n ho\u1EB7c c\u1EA7n h\u1ED7 tr\u1EE3, vui l\xF2ng \u0111i\u1EC1n v\xE0o m\u1EABu d\u01B0\u1EDBi \u0111\xE2y. Ch\xFAng t\xF4i s\u1EBD ph\u1EA3n h\u1ED3i b\u1EA1n s\u1EDBm nh\u1EA5t c\xF3 th\u1EC3.")), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: '100%',
      maxWidth: 500
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Form, {
    name: "contactForm",
    form: form,
    onFinish: onFinish,
    layout: "vertical",
    initialValues: {
      remember: true
    },
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
    label: "T\xEAn",
    name: "name",
    rules: [{
      required: true,
      message: "Vui lòng nhập tên của bạn!"
    }]
  }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    placeholder: "Vui l\xF2ng nh\u1EADp t\xEAn c\u1EE7a b\u1EA1n (ho\u1EB7c b\xED danh)"
  })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
    label: "Email",
    name: "email",
    rules: [{
      type: "email",
      message: "Email không hợp lệ!"
    }]
  }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
    placeholder: "Vui l\xF2ng \u0111\u1EC3 l\u1EA1i email c\u1EE7a b\u1EA1n n\u1EBFu mu\u1ED1n nh\u1EADn ph\u1EA3n h\u1ED3i"
  })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
    label: "N\u1ED9i Dung",
    name: "content",
    rules: [{
      required: true,
      message: "Vui lòng nhập nội dung!"
    }]
  }, /*#__PURE__*/_react["default"].createElement(_antd.Input.TextArea, {
    placeholder: "Vui l\xF2ng nh\u1EADp g\xF3p \xFD ho\u1EB7c c\xE2u h\u1ECFi c\u1EE7a b\u1EA1n",
    rows: 4
  })), /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    htmlType: "submit",
    style: {
      width: "100%"
    }
  }, "G\u1EEDi")))))))));
}
var _default = exports["default"] = ContactPage;