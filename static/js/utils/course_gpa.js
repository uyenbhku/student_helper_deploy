"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotCountCredits = exports.dontUse = exports.countCourses = exports.calculateCumulativeGPA = void 0;
var isNotCountCredits = exports.isNotCountCredits = function isNotCountCredits(course) {
  return ["M", "I", "BL"].includes(course === null || course === void 0 ? void 0 : course.gpa.toString().toUpperCase()) || (course === null || course === void 0 ? void 0 : course.total_credits) === 0;
};
var dontUse = exports.dontUse = function dontUse(course) {
  return course.hidden || !course.course_type;
};

// Calculate CGPA Helper Function
var calculateCumulativeGPA = exports.calculateCumulativeGPA = function calculateCumulativeGPA(courses) {
  var totalGPACredits = 0.0;
  var weightedGPA = 0.0;
  courses.forEach(function (course) {
    if (isNotCountCredits(course)) return;
    totalGPACredits += course.total_credits;
    weightedGPA += parseFloat(course.gpa) * course.total_credits;
  });
  return totalGPACredits > 0 ? (weightedGPA / totalGPACredits).toFixed(2) : 0;
};
var countCourses = exports.countCourses = function countCourses(courses) {
  var totalCredits = 0;
  var courseWithGpa = 0;
  courses.forEach(function (course) {
    if (dontUse(course)) return;
    totalCredits += course.total_credits; // Always add to total

    if (!isNotCountCredits(course)) {
      courseWithGpa += course.total_credits;
    }
  });
  return {
    totalCredits: totalCredits,
    totalCourses: courses.length,
    coursesWithGPA: courseWithGpa
  };
};