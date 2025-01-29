import React from "react"
import { Button } from "antd"
import { ExportOutlined, } from "@ant-design/icons";

export const ExportButton = () => {

    const handleExport = () => {
        const dataSource = JSON.parse(localStorage.getItem("userGPA"));
        // Define CSV headers
        const headers = [
          "STT",
          "Mã môn",
          "Tên môn",
          "Loại môn",
          "Số tín chỉ",
          "Điểm trung bình",
        ];
    
        // Transform data into CSV format
        const csvData = dataSource.map((item, index) => {
          const courseType = item.course_type?.value || item.course_type || "";
          
          return [
            item.key,
            item.course_code || "",
            item.course_name_vn || "",
            courseType,
            item.total_credits || "",
            item.gpa || "",
          ].join(",");
        });
    
        // Combine headers and data
        const csvContent = [headers.join(","), ...csvData].join("\n");
    
        // Create Blob and download link
        const blob = new Blob(["\ufeff", csvContent], { // Adding BOM for Excel UTF-8 support
          type: "text/csv;charset=utf-8",
        });
        
        // Create download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `gpa_data_${new Date().toISOString().slice(0, 10)}.csv`;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(link.href);
      };

    return <Button icon={<ExportOutlined />} onClick={handleExport}>
      Xuất CSV
    </Button>
}