import { useCallback } from "react";
import { getBaseType } from "./constants";

export const useCourseStatistics = () => {
  const dontUseForGPA = useCallback(
    (course) =>
      course?.gpa?.toString().match(/^[Mm](iễn)?|[Bb](ảo)?( )?[Ll](ưu)?|[Ii]$/) ||
      course?.total_credits === 0,
    []
  );

  const dontUse = useCallback((course) => course.hidden || !course.course_type, []);

  const calculateCumulativeGPA = useCallback((courses) => {
    let totalGPACredits = 0.0;
    let weightedGPA = 0.0;

    courses.forEach((course) => {
      if (dontUse(course) || dontUseForGPA(course)) return;
      totalGPACredits += parseInt(course.total_credits);
      weightedGPA += parseFloat(course.gpa) * parseInt(course.total_credits);
    });

    return totalGPACredits > 0 ? (weightedGPA / totalGPACredits).toFixed(2) : 0;
  }, [dontUse, dontUseForGPA]);

  const calculateMaxCGPA = useCallback((courseList, requirements) => {
    
       // Initialize remaining credits with proper type checking
       const remainingCredits = Object.keys(requirements).reduce((acc, key) => {
        const item = requirements[key];
        if (item && item.name) {
          acc[item.name] = item.value !== null ? parseInt(item.value, 10) : null;
        } else if (item === null) {
          acc[key] = null;
        }
        return acc;
      }, {});
    
      // Calculate course weight (GPA contribution)
      const calculateCourseWeight = (course) => {
        const gpa = parseFloat(course.gpa) || 0;
        return gpa; // Sort by GPA for maximum CGPA
      };
    
      // First, handle mandatory courses
      let usedCourses = courseList.filter((course) => {
        if (dontUseForGPA(course)) {
          const baseType = getBaseType(course.course_type);
          if (baseType in remainingCredits) {
            remainingCredits[baseType] -= parseInt(course.total_credits || 0);
          }
          return true;
        }
        return false;
      });
    
      // Sort remaining courses by GPA (higher first)
      const sortedOptionalCourses = courseList
        .filter((course) => !dontUseForGPA(course))
        .sort((a, b) => calculateCourseWeight(b) - calculateCourseWeight(a));
    
      // Process optional courses
      const unusedCourses = [];
    
      sortedOptionalCourses.forEach((course) => {
        const baseType = getBaseType(course.course_type);
    
        // Use the course if we still need credits of this type
        if (remainingCredits[baseType] && remainingCredits[baseType] > 0) {
          remainingCredits[baseType] -= parseInt(course.total_credits || 0);
          usedCourses.push(course);
        } else {
          unusedCourses.push(course);
        }
      });
    
      // Check if all requirements are met
      const requirementsMet = Object.values(remainingCredits).every(
        (credits) => credits === null || credits <= 0
      );
    
      // Calculate GPAs
      const oldCGPA = calculateCumulativeGPA(courseList);
      const newCGPA = requirementsMet ? calculateCumulativeGPA(usedCourses) : "N/A";
    
      return {
        unusedCourses: requirementsMet ? unusedCourses : [],
        usedCourses,
        remainingCredits,
        requirementsMet,
        oldCGPA,
        newCGPA,
      };

  }, [calculateCumulativeGPA, dontUseForGPA]);
  
  const countCourses = useCallback((courses) => {
    let totalCredits = 0;
    let totalGPACredits = 0;
    let coursesWithGPA = 0;
    let creditPerType = { no_name: 0 };

    courses.forEach((course) => {
      if (!course.course_name_vn) {
        creditPerType.no_name++;
      }
      if (dontUse(course)) return;

      const courseCredits = parseInt(course.total_credits);
      totalCredits += courseCredits;

      const courseType = getBaseType(course.course_type);
      creditPerType[courseType] = (creditPerType[courseType] || 0) + courseCredits;

      if (!dontUseForGPA(course)) {
        totalGPACredits += courseCredits;
        coursesWithGPA += 1;
      }
    });

    return {
      totalCredits,
      totalCourses: courses.length,
      totalGPACredits,
      coursesWithGPA,
      creditPerType,
    };
  }, [dontUse, dontUseForGPA]);

  return {
    dontUseForGPA,
    dontUse,
    countCourses,
    calculateCumulativeGPA,
    calculateMaxCGPA,
  };
};
