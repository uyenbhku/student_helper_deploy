import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { GpaTable } from "./components/GpaTable";
import { Result } from "./components/Result";
import { GraduationRequirements } from "./components/GraduationRequirements";
import { Recommend } from "./components/Recommend";

const MemoGpaTable = React.memo(GpaTable);
const MemoResult = React.memo(Result);
const MemoGraduationRequirements = React.memo(GraduationRequirements);
const MemoRecommend = React.memo(Recommend);


export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the 'tab' search param from the URL (if any)
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "1"; // Default to '1' if no 'tab' param is found

  const [activeTab, setActiveTab] = useState(initialTab);

  // Update the query parameter in the URL when the tab changes
  const onTabChange = (key) => {
    setActiveTab(key);
    navigate(`?tab=${key}`, { replace: true });
  };

  useEffect(() => {
    // Ensure that the initial tab value is in sync with the URL
    const queryTab = queryParams.get("tab");
    if (queryTab && queryTab !== activeTab) {
      setActiveTab(queryTab);
    }
  }, [location.search, activeTab]);

  return (
    <div style={{ padding: "20px" }}>
      <Tabs
        defaultActiveKey={activeTab}
        onChange={onTabChange}
        type="card"
        items={[
          {
            label: "Bảng điểm",
            key: "1",
            children: <MemoGpaTable />,
          },
          {
            label: "Điều kiện tốt nghiệp",
            key: "2",
            children: <MemoGraduationRequirements />,
          },
          {
            label: "Kết quả",
            key: "3",
            children: <MemoResult />,
          },
          {
            label: "Gợi ý",
            key: "4",
            children: <MemoRecommend />,
          },
        ]}
      ></Tabs>
    </div>
  );
}