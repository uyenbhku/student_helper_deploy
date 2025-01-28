"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GpaTable = void 0;
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _icons = require("@ant-design/icons");
var _constants = require("../../../utils/constants");
var _ExportButton = require("./ExportButton");
var _ImportButton = require("./ImportButton");
var _lodash = require("lodash");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var GpaTable = exports.GpaTable = function GpaTable() {
  var coursesData = window.__APP_DATA__;
  var _Form$useForm = _antd.Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var _useState = (0, _react.useState)(1),
    _useState2 = _slicedToArray(_useState, 2),
    counter = _useState2[0],
    setCounter = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    loading = _useState4[0],
    setLoading = _useState4[1];
  var _App$useApp = _antd.App.useApp(),
    message = _App$useApp.message,
    modal = _App$useApp.modal;

  // Load saved data from localStorage on component mount
  var _useState5 = (0, _react.useState)(function () {
      var savedData = localStorage.getItem("userGPA");
      if (savedData) {
        var _data2;
        var _data = JSON.parse(savedData);
        setCounter(((_data2 = _data[_data.length - 1]) === null || _data2 === void 0 ? void 0 : _data2.key) + 1);
        return _data;
      }
      return [{
        key: counter - 1,
        // 0
        course_code: "",
        course_name_vn: "",
        course_type: null,
        total_credits: "",
        gpa: ""
      }];
    }),
    _useState6 = _slicedToArray(_useState5, 2),
    data = _useState6[0],
    setData = _useState6[1];

  // Save data to localStorage whenever it changes
  var debouncedSaveToLocalStorage = (0, _react.useCallback)((0, _lodash.debounce)(function (dataToSave) {
    localStorage.setItem("userGPA", JSON.stringify(dataToSave));
  }, 900), []);
  (0, _react.useEffect)(function () {
    // Save debounced changes to localStorage
    debouncedSaveToLocalStorage(data);
    return function () {
      return debouncedSaveToLocalStorage.cancel();
    };
  }, [data]);
  var _useState7 = (0, _react.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    editingRow = _useState8[0],
    setEditingRow = _useState8[1];
  var bottomAddBtnRef = (0, _react.useRef)(null);
  var scrollToBottom = function scrollToBottom() {
    var _bottomAddBtnRef$curr;
    (_bottomAddBtnRef$curr = bottomAddBtnRef.current) === null || _bottomAddBtnRef$curr === void 0 || _bottomAddBtnRef$curr.scrollIntoView({
      behavior: "smooth"
    });
  };
  var handleAddRow = function handleAddRow() {
    scrollToBottom();
    if (!data || data.length === 0) {
      var newData = [{
        key: counter - 1,
        // 0
        course_code: null,
        course_name_vn: null,
        course_type: null,
        total_credits: null,
        gpa: null
      }];
      setData(newData);
      setEditingRow(0);
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
      return;
    }
    var lastRow = data[data.length - 1];
    var isRowComplete = Object.entries(lastRow).every(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      if (key === "key" || key === "note") return true;
      return value !== null && value !== "";
    });
    if (!isRowComplete) {
      setEditingRow(data.length - 1);
      message.warning("Xin hãy nhập dữ liệu ở dòng cuối trước khi tiếp tục");
      return;
    }
    form.validateFields().then(function () {
      var newData = [].concat(_toConsumableArray(data), [{
        key: counter,
        course_code: null,
        course_name_vn: null,
        course_type: null,
        total_credits: null,
        gpa: null
      }]);
      setData(newData);
      setCounter(function (val) {
        return val + 1;
      });
      setEditingRow(data.length);
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
    });
  };
  // Start editing a row
  var handleEditRow = function handleEditRow(record, rowIndex) {
    // Scroll to the end of the table
    console.log(record, rowIndex);
    setEditingRow(rowIndex);
    form.setFieldsValue(_objectSpread(_objectSpread({}, record), {}, {
      course_type: record.course_type ? _constants.COURSE_TYPE_OPTIONS.find(function (opt) {
        var _record$course_type;
        return opt.value === ((_record$course_type = record.course_type) === null || _record$course_type === void 0 ? void 0 : _record$course_type.value) || opt.value === record.course_type;
      }) : null
    }));
  };
  var handleCancelEdit = function handleCancelEdit() {
    if (form.isFieldsTouched()) {}
    setEditingRow(null);
    form.resetFields();
  };

  // Stop editing a row
  var handleSaveRow = function handleSaveRow(rowKey) {
    console.log(rowKey);
    form.validateFields().then(function (values) {
      var newData = data.map(function (row) {
        return row.key === rowKey ? _objectSpread(_objectSpread(_objectSpread({}, row), values), {}, {
          course_type: values.course_type ? _typeof(values.course_type) === "object" ? values.course_type.value : values.course_type : null
        }) : row;
      });
      setData(newData);
      setEditingRow(null);
      form.resetFields();
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
    });
  };
  var handleToggleRow = function handleToggleRow(rowKey) {
    var newData = data.map(function (row) {
      return row.key === rowKey ? _objectSpread(_objectSpread({}, row), {}, {
        hidden: !row.hidden // Toggle the hidden property
      }) : row;
    });
    setData(newData);
  };
  var handleSelectChange = function handleSelectChange(value, columnKey) {
    if (columnKey === "course_name_vn" || columnKey === "course_code") {
      var selectedCourse = coursesData.find(function (course) {
        return course[columnKey] === value;
      });
      if (selectedCourse) {
        form.setFieldsValue({
          course_code: selectedCourse.course_code,
          course_name_vn: selectedCourse.course_name_vn,
          course_type: _constants.COURSE_TYPE_OPTIONS.find(function (opt) {
            return opt.value === selectedCourse.course_type;
          }),
          total_credits: selectedCourse.total_credits
        });
      }
    }
  };
  var handleClearRow = function handleClearRow() {
    if (editingRow !== null) {
      form.resetFields();
    }
  };

  // Delete a specific row
  var handleDeleteRow = function handleDeleteRow(rowKey) {
    modal.confirm({
      content: "B\u1EA1n c\xF3 mu\u1ED1n x\xF3a m\xF4n n\xE0y kh\xF4ng?",
      okType: "danger",
      onOk: function onOk() {
        var newData = data.filter(function (course) {
          return course.key !== rowKey;
        });
        setData(newData);
        localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
        if (editingRow === rowKey - 1) {
          setEditingRow(null);
        }
      },
      closable: true,
      maskClosable: true
    });
  };
  var validateUniqueValue = function validateUniqueValue(field, value, rowKey) {
    var duplicate = data.some(function (row) {
      return row[field] === value && rowKey !== row.key;
    });
    return duplicate ? Promise.reject(new Error("Gi\xE1 tr\u1ECB \"".concat(value, "\" \u0111\xE3 \u0111\u01B0\u1EE3c ch\u1ECDn trong h\xE0ng kh\xE1c"))) : Promise.resolve();
  };
  var _useState9 = (0, _react.useState)(""),
    _useState10 = _slicedToArray(_useState9, 2),
    searchText = _useState10[0],
    setSearchText = _useState10[1];
  var _useState11 = (0, _react.useState)(""),
    _useState12 = _slicedToArray(_useState11, 2),
    searchedColumn = _useState12[0],
    setSearchedColumn = _useState12[1];
  var searchInput = (0, _react.useRef)(null);
  var handleSearch = function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  var handleReset = function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  };
  var getColumnSearchProps = function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: function filterDropdown(_ref3) {
        var setSelectedKeys = _ref3.setSelectedKeys,
          selectedKeys = _ref3.selectedKeys,
          confirm = _ref3.confirm,
          clearFilters = _ref3.clearFilters,
          close = _ref3.close;
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: {
            padding: 8
          },
          onKeyDown: function onKeyDown(e) {
            return e.stopPropagation();
          }
        }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
          ref: searchInput,
          placeholder: "Search ".concat(dataIndex),
          value: selectedKeys[0],
          onChange: function onChange(e) {
            return setSelectedKeys(e.target.value ? [e.target.value] : []);
          },
          onPressEnter: function onPressEnter() {
            return handleSearch(selectedKeys, confirm, dataIndex);
          },
          style: {
            marginBottom: 8,
            display: "block"
          }
        }), /*#__PURE__*/_react["default"].createElement(_antd.Space, null, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "primary",
          onClick: function onClick() {
            return handleSearch(selectedKeys, confirm, dataIndex);
          },
          icon: /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null),
          size: "small",
          style: {
            width: 90
          }
        }, "Search"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          onClick: function onClick() {
            return clearFilters && handleReset(clearFilters);
          },
          size: "small",
          style: {
            width: 90
          }
        }, "Reset"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "link",
          size: "small",
          onClick: function onClick() {
            confirm({
              closeDropdown: false
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }
        }, "Filter"), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
          type: "link",
          size: "small",
          onClick: function onClick() {
            close();
          }
        }, "Close")));
      },
      filterIcon: function filterIcon(filtered) {
        return /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, {
          style: {
            color: filtered ? "#1677ff" : undefined
          }
        });
      },
      onFilter: function onFilter(value, record) {
        return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      },
      filterDropdownProps: {
        onOpenChange: function onOpenChange(open) {
          if (open) {
            setTimeout(function () {
              var _searchInput$current;
              return (_searchInput$current = searchInput.current) === null || _searchInput$current === void 0 ? void 0 : _searchInput$current.select();
            }, 100);
          }
        }
      },
      render: function render(text) {
        return searchedColumn === dataIndex ? /*#__PURE__*/_react["default"].createElement(Highlighter, {
          highlightStyle: {
            backgroundColor: "#ffc069",
            padding: 0
          },
          searchWords: [searchText],
          autoEscape: true,
          textToHighlight: text ? text.toString() : ""
        }) : text;
      }
    };
  };
  var columns = [{
    title: "STT",
    key: "id",
    width: 60,
    align: "center",
    render: function render(text, record, index) {
      return index + 1;
    }
  }, _objectSpread(_objectSpread({
    title: "Mã môn",
    key: "course_code",
    dataIndex: "course_code",
    align: "center",
    width: 100
  }, getColumnSearchProps("course_code")), {}, {
    render: function render(value, record, index) {
      return editingRow === index ? /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        name: "course_code",
        rules: [{
          required: true,
          message: "Vui lòng chọn mã môn học"
        }, {
          validator: function validator(_, value) {
            return validateUniqueValue("course_code", value, record.key);
          }
        }]
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        placeholder: "Ch\u1ECDn m\xE3 m\xF4n h\u1ECDc",
        onChange: function onChange(value) {
          return handleSelectChange(value, "course_code");
        },
        showSearch: true,
        options: coursesData.map(function (course) {
          return {
            value: course.course_code,
            label: course.course_code
          };
        })
      })) : value || "";
    }
  }), _objectSpread(_objectSpread({
    title: "Tên môn",
    key: "course_name_vn",
    dataIndex: "course_name_vn",
    align: "center"
  }, getColumnSearchProps("course_name_vn")), {}, {
    width: 300,
    render: function render(value, record, index) {
      return editingRow === index ? /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        name: "course_name_vn",
        rules: [{
          required: true,
          message: "Vui lòng chọn môn học"
        }, {
          validator: function validator(_, value) {
            return validateUniqueValue("course_name_vn", value, record.key);
          }
        }]
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        placeholder: "Ch\u1ECDn m\xF4n h\u1ECDc",
        showSearch: true,
        onChange: function onChange(value) {
          return handleSelectChange(value, "course_name_vn");
        },
        options: coursesData.map(function (course) {
          return {
            value: course.course_name_vn,
            label: course.course_name_vn
          };
        })
      })) : value || "";
    }
  }), {
    title: "Loại môn",
    key: "course_type",
    align: "center",
    dataIndex: "course_type",
    width: 150,
    filters: _constants.COURSE_TYPE_OPTIONS,
    filterSearch: true,
    onFilter: function onFilter(value, record) {
      return record.course_type.startsWith(value);
    },
    render: function render(value, record, index) {
      return editingRow === index ? /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        name: "course_type",
        rules: [{
          required: true,
          message: "Vui lòng chọn loại môn"
        }]
      }, /*#__PURE__*/_react["default"].createElement(_antd.Select, {
        showSearch: true,
        options: _constants.COURSE_TYPE_OPTIONS,
        placeholder: "Ch\u1ECDn lo\u1EA1i m\xF4n"
      })) : value !== null && value !== void 0 && value.value || value ? _constants.COURSE_TYPE_OBJECT[(value === null || value === void 0 ? void 0 : value.value) || value] + " (".concat((value === null || value === void 0 ? void 0 : value.value) || value, ")") || "Chưa chọn" : "Chưa chọn";
    }
  }, {
    title: "Số tín chỉ",
    key: "total_credits",
    dataIndex: "total_credits",
    width: 100,
    align: "center",
    showSorterTooltip: {
      target: "full-header"
    },
    sorter: function sorter(a, b) {
      return parseFloat(a.total_credits) - parseFloat(b.total_credits);
    },
    render: function render(value, record, index) {
      return editingRow === index ? /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        name: "total_credits",
        rules: [{
          required: true,
          message: "Vui lòng nhập số tín chỉ"
        }, {
          pattern: /^[0-9]+$/,
          message: "Số tín chỉ phải là số"
        }]
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        placeholder: "Nh\u1EADp s\u1ED1 t\xEDn ch\u1EC9 ="
      })) : value || "";
    }
  }, {
    title: "Điểm trung bình",
    key: "gpa",
    align: "center",
    showSorterTooltip: {
      target: "full-header"
    },
    sorter: function sorter(a, b) {
      return parseFloat(a.gpa) - parseFloat(b.gpa);
    },
    width: 150,
    dataIndex: "gpa",
    render: function render(value, record, index) {
      return editingRow === index ? /*#__PURE__*/_react["default"].createElement(_antd.Form.Item, {
        name: "gpa",
        rules: [{
          required: true,
          message: "Vui lòng nhập điểm"
        }, {
          pattern: /^(10(\.0+)?|[0-9](\.[0-9])?|M|I|BL)$/,
          message: "Điểm từ 0-10"
        }]
      }, /*#__PURE__*/_react["default"].createElement(_antd.Input, {
        placeholder: "Nh\u1EADp \u0111i\u1EC3m"
      })) : value ? ["M", "I", "BL"].includes(value.toString().toUpperCase()) ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: value === "M" ? "Không tính điểm tích lũy" : value === "I" ? "Nếu đã học lại, vui lòng ghi điểm. Sau 2 học kỳ chưa học lại, điểm sẽ là 0" : "Vui lòng nhập điểm đã bảo lưu"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Badge, {
        dot: true
      }, value)) : value : "";
    }
  }, {
    title: "",
    key: "actions",
    width: 150,
    fixed: "right",
    render: function render(text, record, index) {
      return /*#__PURE__*/_react["default"].createElement(_antd.Space, {
        style: {
          marginBottom: 16
        }
      }, editingRow === index ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "L\u01B0u"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: "primary",
        icon: /*#__PURE__*/_react["default"].createElement(_icons.SaveOutlined, null),
        onClick: function onClick() {
          return handleSaveRow(record.key);
        }
      })), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "L\xE0m tr\u1ED1ng"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        onClick: handleClearRow,
        icon: /*#__PURE__*/_react["default"].createElement(_icons.ClearOutlined, null)
      })), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "H\u1EE7y"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        onClick: handleCancelEdit,
        icon: /*#__PURE__*/_react["default"].createElement(_icons.CloseOutlined, null)
      }))) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "S\u1EEDa"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.EditOutlined, null),
        onClick: function onClick() {
          return handleEditRow(record, index);
        }
      })), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: record.hidden ? "Tính điểm" : "Không tính điểm"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        type: record.hidden ? "primary" : "dashed",
        icon: record.hidden ? /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.EyeInvisibleOutlined, null),
        onClick: function onClick() {
          return handleToggleRow(record.key);
        }
      })), /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
        title: "X\xF3a"
      }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        danger: true,
        icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, null),
        onClick: function onClick() {
          return handleDeleteRow(record.key);
        }
      }))));
    }
  }];
  var handleImportSuccess = function handleImportSuccess(importedData) {
    var _importedData;
    setData(importedData);
    setCounter(((_importedData = importedData[importedData.length - 1]) === null || _importedData === void 0 ? void 0 : _importedData.key) + 1);
    setEditingRow(null);
  };
  return /*#__PURE__*/_react["default"].createElement(_antd.Card, {
    loading: loading
  }, /*#__PURE__*/_react["default"].createElement(_antd.Space, {
    style: {
      marginBottom: 16
    }
  }, /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    onClick: handleAddRow
  }, "Th\xEAm m\xF4n h\u1ECDc"), /*#__PURE__*/_react["default"].createElement(_ImportButton.ImportButton, {
    onImportSuccess: handleImportSuccess
  }), /*#__PURE__*/_react["default"].createElement(_ExportButton.ExportButton, null), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    danger: true,
    icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, null),
    onClick: function onClick() {
      modal.confirm({
        content: "Bạn có muốn xóa tất cả?",
        okType: "danger",
        onOk: function onOk() {
          return setData([]);
        },
        closable: true,
        maskClosable: true
      });
    }
  }, "X\xF3a t\u1EA5t c\u1EA3")), /*#__PURE__*/_react["default"].createElement(_antd.Form, {
    form: form
    // onKeyPress={(e) => {
    //   if (e.key === "Enter") {
    //     handleSaveRow(editingRow);
    //   }
    // }}
  }, /*#__PURE__*/_react["default"].createElement(_antd.Table, {
    columns: columns,
    dataSource: data,
    pagination: false,
    bordered: true,
    scroll: {
      x: 800
    }
  })), /*#__PURE__*/_react["default"].createElement(_antd.Space, {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    ref: bottomAddBtnRef
  }), /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    type: "primary",
    icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    onClick: handleAddRow
  }, "Th\xEAm m\xF4n h\u1ECDc")));
};