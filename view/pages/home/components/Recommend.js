import React, { useState, useEffect, useCallback } from "react";
import { Card, Table, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { useCourseStatistics } from "../../../utils/courseStats";

import { debounce } from "lodash";

const { Title, Paragraph } = Typography;

export const Recommend = () => {
  const [queryParams, setQueryParams] = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState(() => {
    return JSON.parse(localStorage.getItem("userGPA")) || [];
  });

  const [requirements, setRequirements] = useState(() => {
    return JSON.parse(localStorage.getItem("gradReqs"))?.requirements || [];
  });

  useEffect(() => {
    const queryTab = queryParams.get("tab");
    if (queryTab === "4") {
      const newCourseList = JSON.parse(localStorage.getItem("userGPA")) || [];
      const newRequirements =
        JSON.parse(localStorage.getItem("gradReqs"))?.requirements || [];

      // Only update state if the data has changed
      if (JSON.stringify(courseList) !== JSON.stringify(newCourseList)) {
        setCourseList(newCourseList);
      }
      if (JSON.stringify(requirements) !== JSON.stringify(newRequirements)) {
        setRequirements(newRequirements);
      }
    }
  }, [queryParams, courseList, requirements]);

  const [recommendation, setRecommendation] = useState();
  const { calculateMaxCGPA } = useCourseStatistics();

  const debouncedCalculate = useCallback(
    debounce(() => {
      setRecommendation(calculateMaxCGPA(courseList, requirements));
      setLoading(false);
    }, 2000),
    [courseList, requirements, calculateMaxCGPA]
  );

  useEffect(() => {
    setLoading(true);
    debouncedCalculate();
    return () => debouncedCalculate.cancel();
  }, [debouncedCalculate]);

  // Columns for used and unused courses
  const columns = [
    { title: "Tên môn", dataIndex: "course_name_vn", key: "course_name" },
    { title: "Số tín chỉ", dataIndex: "total_credits", key: "total_credits" },
    { title: "GPA", dataIndex: "gpa", key: "gpa" },
    { title: "Loại môn", dataIndex: "course_type", key: "course_type" },
  ];
  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card
          loading={loading}
          style={{
            flex: 1,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#e6f7ff",
          }}
        >
          <Title level={4} style={{ marginBottom: "8px", color: "#1890ff" }}>
            Điểm tích lũy hiện tại
          </Title>
          <Paragraph
            style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
          >
            {recommendation?.oldCGPA}
          </Paragraph>
        </Card>

        <Card
          loading={loading}
          style={{
            flex: 1,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backgroundColor: "#f6ffed",
          }}
        >
          <Title level={4} style={{ marginBottom: "8px", color: "#52c41a" }}>
            Điểm tích lũy tối ưu
          </Title>
          <Paragraph
            style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
          >
            {recommendation?.newCGPA}
          </Paragraph>
        </Card>
      </div>
      {/* Gợi ý chọn môn */}
      <Card
        loading={loading}
        style={{
          marginBottom: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#f7f9fc",
        }}
        title={
          <Title level={4} style={{ margin: 0 }}>
            Gợi ý chọn môn
          </Title>
        }
      >
        <Paragraph style={{ marginBottom: "16px" }}>
          Dưới đây là các môn các bạn có thể xóa để đạt được tối ưu điểm tích
          lũy tốt nghiệp.
          <br />
          <strong>Lưu ý:</strong>
          <br /> - Để có thể tối ưu hơn, bạn có thể đến xem tab Kết quả, nếu số
          tín chỉ của một điều kiện dư, bạn có thể sắp xếp qua loại môn khác
          (nếu môn đó có thể thỏa mãn nhiều loại môn).
          <br /> - Đây chỉ là gợi ý ban đầu, bạn phải kiểm tra xem nếu việc xóa
          môn này có thỏa điều kiện môn học tiên quyết, môn học trước của bạn
          hay không.
          <br />
        </Paragraph>
        <Table
          dataSource={recommendation?.unusedCourses.map((course, index) => ({
            ...course,
            key: index,
          }))}
          columns={columns}
          pagination={{}}
        />
      </Card>
    </div>
  );
};
