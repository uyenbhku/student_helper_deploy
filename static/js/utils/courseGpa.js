"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dontUseForGPA = exports.dontUse = exports.countCourses = exports.calculateCumulativeGPA = void 0;
var _constants = require("./constants");
var dontUseForGPA = exports.dontUseForGPA = function dontUseForGPA(course) {
  var _course$gpa;
  return ["M", "I", "BL"].includes(course === null || course === void 0 || (_course$gpa = course.gpa) === null || _course$gpa === void 0 ? void 0 : _course$gpa.toString().toUpperCase()) || (course === null || course === void 0 ? void 0 : course.total_credits) === 0;
};
var dontUse = exports.dontUse = function dontUse(course) {
  return course.hidden || !course.course_type;
};

// Calculate CGPA Helper Function
var calculateCumulativeGPA = exports.calculateCumulativeGPA = function calculateCumulativeGPA(courses) {
  var totalGPACredits = 0.0;
  var weightedGPA = 0.0;
  courses.forEach(function (course) {
    if (dontUse(course) || dontUseForGPA(course)) return;
    totalGPACredits += parseInt(course.total_credits);
    weightedGPA += parseFloat(course.gpa) * parseInt(course.total_credits);
  });
  return totalGPACredits > 0 ? (weightedGPA / totalGPACredits).toFixed(2) : 0;
};
var countCourses = exports.countCourses = function countCourses(courses) {
  var totalCredits = 0;
  var totalGPACredits = 0;
  var coursesWithGPA = 0;
  var creditPerType = {
    no_name: 0
  };
  courses.forEach(function (course) {
    if (!course.course_name_vn) {
      creditPerType.no_name++;
    }
    if (dontUse(course)) return;
    var courseCredits = parseInt(course.total_credits);
    totalCredits += courseCredits; // Always add to total

    var courseType = (0, _constants.getBaseType)(course.course_type);
    creditPerType[courseType] = (creditPerType[courseType] || 0) + courseCredits;
    if (!dontUseForGPA(course)) {
      totalGPACredits += courseCredits;
      coursesWithGPA += 1;
    }
  });
  return {
    totalCredits: totalCredits,
    totalCourses: courses.length,
    totalGPACredits: totalGPACredits,
    coursesWithGPA: coursesWithGPA,
    creditPerType: creditPerType
  };
};