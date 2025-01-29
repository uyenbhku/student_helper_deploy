import React, { useCallback } from "react";

export const REQUIRED_FIELDS = ["course_code", "gpa"];
export const HEADER_MAP = {
  "mã môn": "course_code",
  "ma mon": "course_code",
  "mã hp": "course_code",
  "ma hp": "course_code",
  course_code: "course_code",
  "điểm trung bình": "gpa",
  "diem trung binh": "gpa",
  "diem hp": "gpa",
  "điểm hp": "gpa",
  "điểm học phần": "gpa",
  gpa: "gpa",
  "loai mon": "course_type",
  "loại môn": "course_type",
  course_type: "course_type",
  loai: "course_type",
  "so tin chi": "total_credits",
  "tin chi": "total_credits",
  "tín chỉ": "total_credits",
  "so tin": "total_credits",
  "số tín chỉ": "total_credits",
  "số tín": "total_credits",
  total_credits: "total_credits",
};

export const useContentParser = (coursesData) => {
  const findCourseData = useCallback(
    (courseCode) =>
      coursesData.find((course) => course.course_code === courseCode),
    [coursesData]
  );

  const detectDelimiter = useCallback((content) => {
    const firstLine = content.split("\n")[0];
    const tabCount = (firstLine.match(/\t/g) || []).length;
    const commaCount = (firstLine.match(/,/g) || []).length;
    return tabCount > commaCount ? "\t" : ",";
  }, []);

  const validateHeaders = useCallback((headers) => {
    const hasRequiredColumns = REQUIRED_FIELDS.every((required) =>
      headers.some((header) => HEADER_MAP[header.toLowerCase()] === required)
    );

    if (!hasRequiredColumns) {
      throw new Error(`Thiếu cột bắt buộc. Cần có: Mã môn và Điểm trung bình`);
    }

    return headers.filter((header) =>
      Object.keys(HEADER_MAP).includes(header.toLowerCase())
    );
  }, []);

  const validateRequiredFields = useCallback((fields) => {
    const missingFields = REQUIRED_FIELDS.filter((field) => !fields[field]);
    if (missingFields.length > 0) {
      throw new Error(`Thiếu thông tin bắt buộc: ${missingFields.join(", ")}`);
    }
  }, []);

  const parseDelimitedContent = useCallback(
    (content, delimiter) => {
      const lines = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.match(/^[\s,\t]*$/));

      if (lines.length < 2) {
        throw new Error(
          "Nội dung không hợp lệ. Cần có ít nhất tiêu đề và một dòng dữ liệu."
        );
      }

      const headers = lines[0]
        .toLowerCase()
        .split(delimiter)
        .map((h) => h.trim());
      validateHeaders(headers);

      const fieldIndices = headers.reduce((acc, header, index) => {
        const mappedField = HEADER_MAP[header];
        if (mappedField) acc[mappedField] = index;
        return acc;
      }, {});

      return { lines, fieldIndices };
    },
    [validateHeaders]
  );

  const parseStructuredContent = useCallback((content) => {
    
    return extractedData;
  }, []);

  return {
    findCourseData,
    detectDelimiter,
    validateRequiredFields,
    parseDelimitedContent,
    parseStructuredContent, // New function added here
  };
};
