import React, { useState, useEffect, useCallback } from "react";
import { Card, Progress, Typography, Row, Col, Statistic } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { COURSE_TYPE_OBJECT, getBaseType } from "../../../utils/constants";
import { useCourseStatistics } from "../../../utils/courseStats";
import { debounce } from "lodash";

export const Result = () => {
  const [loading, setLoading] = useState(true);

  const [courseList, setCourseList] = useState(() => {
    return JSON.parse(localStorage.getItem("userGPA")) || [];
  });

  const [requirements, setRequirements] = useState(() => {
    return JSON.parse(localStorage.getItem("gradReqs"))?.requirements || [];
  });

  const { countCourses, calculateCumulativeGPA, dontUse } =
    useCourseStatistics();

  const getCreditComparison = () => {
    const reqMap = requirements
      .filter((req) => req !== null)
      .reduce((acc, req) => {
        acc[req.name] = parseInt(req.value);
        return acc;
      }, {});

    const comparison = {};
    const missingCredits = {};

    Object.entries(reqMap).forEach(([reqType, reqCredits]) => {
      const baseType = getBaseType(reqType);
      const actualCredits = gpaStats?.creditPerType[baseType] || 0;

      comparison[reqType] = {
        required: reqCredits,
        actual: actualCredits,
        met: actualCredits >= reqCredits,
        percentage: Math.round((actualCredits / reqCredits) * 100),
      };

      if (actualCredits < reqCredits) {
        missingCredits[reqType] = reqCredits - actualCredits;
      }
    });

    return { comparison, missingCredits };
  };

  const getGpaStats = () => {
    const CGPA = calculateCumulativeGPA(courseList);
    const { totalCredits, totalCourses, creditPerType } = countCourses(courseList);

    return {
      cumulativeGPA: CGPA || "N/A",
      totalCredits,
      totalCourses,
      creditPerType,
    };
  };

  const [gpaStats, setGpaStats] = useState();
  const [creditComparison, setCreditComparison] = useState();
  const [queryParams] = useSearchParams();

  useEffect(() => {
    const queryTab = queryParams.get("tab");
    if (queryTab === "3") {
      setCourseList(() => JSON.parse(localStorage.getItem("userGPA")) || []);
      setRequirements(() => JSON.parse(localStorage.getItem("gradReqs"))?.requirements || []);
    }
  }, [queryParams]);

  const debouncedCalculateGpa = useCallback(
    debounce(() => {
      setGpaStats(getGpaStats());
    }, 500),
    [courseList, requirements]
  );

  useEffect(() => {
    setLoading(true);
    debouncedCalculateGpa();
    return () => debouncedCalculateGpa.cancel();
  }, [debouncedCalculateGpa]);

  const debouncedCalculateComp = useCallback(
    debounce(() => {
      setCreditComparison(getCreditComparison());
      setLoading(false);
    }, 500),
    [gpaStats]
  );

  useEffect(() => {
    setLoading(true);
    debouncedCalculateComp();
    return () => debouncedCalculateComp.cancel();
  }, [debouncedCalculateComp]);

  return (
    <div style={{ padding: "24px" }}>
      <Card
        loading={loading}
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Tổng quan</span>
            {/* <Button
              type="text"
              icon={showAnalysis ? <UpOutlined /> : <DownOutlined />}
              onClick={toggleAnalysis}
            /> */}
          </div>
        }
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Statistic
              title="Điểm trung bình tích lũy (CGPA)"
              value={gpaStats?.cumulativeGPA}
              precision={2}
              valueStyle={{ color: getColorByScore(gpaStats?.cumulativeGPA) }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Tổng số tín"
              value={gpaStats?.totalCredits}
              suffix="tín"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Tổng môn"
              value={gpaStats?.totalCourses}
              suffix="môn"
            />
          </Col>
        </Row>

        {/* Hidden Analysis Section
        {showAnalysis && (
          <Row gutter={[16, 16]} style={{marginTop: 15}}>
          <Col span={8}>
            <Statistic
              title="Điểm trung bình tích lũy (CGPA) cột 4.0"
              value={gpaStats?.cumulativeGPA}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={<>
                {"Tổng số tín theo chuẩn "}
                <Link target="_blank" rel="noopener noreferrer" to="https://student.uit.edu.vn/sites/daa/files/202406/01-hd-dhcntt_huong_dan_ects.pdf">
                  ECTS
                </Link>
                </>}
              value={gpaStats?.totalCredits}
              suffix="tín"
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Tổng môn"
              value={gpaStats?.totalCourses}
              suffix="môn"
            />
          </Col>
        </Row>
        )} */}
      </Card>

      {/* Credits Summary */}
      <Card
        loading={loading}
        title="Số tín mỗi loại"
        style={{ marginBottom: "24px" }}
      >
        <Row gutter={[16, 16]}>
          {gpaStats?.creditPerType?.no_name ? (
            <Col span={8} key={"no_name"}>
              <Card
                style={{
                  backgroundColor: "#f4cccc", // Red background
                }}
              >
                <Statistic
                  title={`Tín chỉ Cần được chỉnh sửa`}
                  value={gpaStats?.creditPerType.no_name}
                  suffix="tín chỉ"
                />
              </Card>
            </Col>
          ) : null}
          {gpaStats?.creditPerType &&
            Object.entries(gpaStats?.creditPerType).map(
              ([type, credits]) =>
                type !== "no_name" && (
                  <Col span={8} key={type}>
                    <Card>
                      <Statistic
                        title={`Tín chỉ ${COURSE_TYPE_OBJECT[type]}`}
                        value={credits}
                        suffix="tín chỉ"
                      />
                    </Card>
                  </Col>
                )
            )}
        </Row>
      </Card>

      {/* Requirements Progress */}
      <Card
        loading={loading}
        title="Tiến trình"
        style={{ marginBottom: "24px" }}
      >
        {creditComparison?.comparison &&
          Object.entries(creditComparison?.comparison).map(([type, data]) => (
            <div key={type} style={{ marginBottom: "16px" }}>
              <Row
                align="middle"
                justify="space-between"
                style={{ marginBottom: "8px" }}
              >
                <Col>
                  <Typography.Text strong>
                    {COURSE_TYPE_OBJECT[type]}
                  </Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type={data.met ? "success" : "danger"}>
                    {data.actual} / {data.required} tín chỉ
                    {data.met ? (
                      <CheckCircleFilled style={{ marginLeft: "8px" }} />
                    ) : (
                      <CloseCircleFilled style={{ marginLeft: "8px" }} />
                    )}
                  </Typography.Text>
                </Col>
              </Row>
              <Progress
                percent={data.percentage}
                status={data.met ? "success" : "active"}
                showInfo={true}
              />
              {!data.met && (
                <Typography.Text
                  type="danger"
                  style={{ display: "block", marginTop: "4px" }}
                >
                  Còn thiếu {creditComparison?.missingCredits[type]} tín chỉ
                </Typography.Text>
              )}
            </div>
          ))}
      </Card>
    </div>
  );
};

const getColorByScore = (score) => {
  if (!score || score < 0 || score > 10) return "#000000"; // Default black for invalid scores
  if (score < 5) return "#ff4d4f"; // Red for failing/poor scores (0-4.9)
  if (score < 6.5) return "#faad14"; // Yellow/Warning for below average (5-6.4)
  if (score < 8) return "#1890ff"; // Blue for good scores (6.5-7.9)
  if (score < 9) return "#52c41a"; // Green for very good scores (8-8.9)
  return "#13c2c2"; // Cyan for excellent scores (9-10)
};
