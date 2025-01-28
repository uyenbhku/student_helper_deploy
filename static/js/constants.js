"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBaseType = exports.COURSE_TYPE_OPTIONS = exports.COURSE_TYPE_OBJECT = void 0;
// Predefined course type options
var COURSE_TYPE_OPTIONS = exports.COURSE_TYPE_OPTIONS = [{
  value: "CSN",
  label: "Cơ sở ngành"
}, {
  value: "CSNN",
  label: "Cơ sở nhóm ngành"
}, {
  value: "CN",
  label: "Chuyên ngành"
}, {
  value: "ĐC",
  label: "Đại cương"
}, {
  value: "CNTC",
  label: "Chuyên ngành tự chọn"
}, {
  value: "CĐTN",
  label: "Chuyên đề tốt nghiệp"
}, {
  value: "KLTN",
  label: "Khóa luận tốt nghiệp"
}, {
  value: "TN",
  label: "Tốt nghiệp"
}, {
  value: "ĐA",
  label: "Đồ án"
}, {
  value: "NN",
  label: "Nhật ngữ"
}, {
  value: "TT",
  label: "Thực tập"
}, {
  value: "TTTN",
  label: "Thực tập tốt nghiệp"
}, {
  value: "CNCS",
  label: "CNCS"
}, {
  value: "TC",
  label: "Thể chất"
}, {
  value: "QP",
  label: "GDQP"
}, {
  value: "BT",
  label: "BT"
}, {
  value: "CS",
  label: "Cơ sở chung"
}];
var COURSE_TYPE_OBJECT = exports.COURSE_TYPE_OBJECT = {
  CSN: "Cơ sở ngành",
  CSNN: "Cơ sở nhóm ngành",
  CN: "Chuyên ngành",
  ĐC: "Đại cương",
  CNTC: "Chuyên ngành tự chọn",
  CĐTN: "Chuyên đề tốt nghiệp",
  KLTN: "Khóa luận tốt nghiệp",
  TN: "Tốt nghiệp",
  ĐA: "Đồ án",
  NN: "Nhật ngữ",
  TT: "Thực tập",
  TTTN: "Thực tập tốt nghiệp",
  CNCS: "CNCS",
  TC: "Thể chất",
  QP: "GDQP",
  BT: "BT",
  CS: "CS"
};
var getBaseType = exports.getBaseType = function getBaseType(courseType) {
  // Define type mappings
  var typeMap = {
    CSN: "CSN",
    CSNN: "CSN",
    TN: "TN",
    KLTN: "TN",
    CĐTN: "TN"
  };
  return typeMap[courseType] || courseType;
};