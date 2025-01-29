import React, { useState, useCallback } from "react";
import { Upload, Button, App, Modal } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  getBaseType,
  HEADER_MAP,
  REQUIRED_FIELDS,
} from "../../../utils/constants";
import { useContentParser } from "../../../utils/contentParser";

const { Dragger } = Upload;

const ACCEPTED_FILE_TYPES = {
  "text/csv": ".csv",
  "text/tab-separated-values": ".tsv",
};

export const ImportButton = ({ onImportSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const coursesData = window.__APP_DATA__;
  const { notification } = App.useApp();

  const { findCourseData, validateRequiredFields, parseDelimitedContent } =
    useContentParser(coursesData);

  const processFileContent = useCallback(
    (content, fileType) => {
      try {
        const delimiter = fileType === "text/tab-separated-values" ? "\t" : ",";
        const { lines, fieldIndices } = parseDelimitedContent(
          content,
          delimiter
        );
        const seenCourses = new Set();

        const importedData = lines.slice(1).map((line, index) => {
          const values = line.split(delimiter).map((v) => v.trim());
          const fields = Object.entries(fieldIndices).reduce(
            (acc, [field, idx]) => ({
              ...acc,
              [field]: values[idx],
            }),
            {}
          );

          validateRequiredFields(fields);

          if (seenCourses.has(fields.course_code)) {
            notification.warning({
              message: "Phát hiện môn học bị lặp",
              description: `Môn học ${fields.course_code} ở STT ${
                index + 1
              } bị lặp`,
              duration: 5,
            });
            return {
              key: index,
              course_code: fields.course_code,
              duplicated: true,
              gpa: fields.gpa,
              course_name_vn: null,
              course_type: null,
              total_credits: null,
            };
          }

          const courseData = findCourseData(fields.course_code);
          if (!courseData) {
            throw new Error(
              `Không tìm thấy thông tin môn học: ${fields.course_code}`
            );
          }

          seenCourses.add(fields.course_code);

          return {
            key: index,
            course_code: fields.course_code,
            course_name_vn: courseData.course_name_vn,
            course_type:
              getBaseType(fields.course_type) || courseData.course_type,
            total_credits: parseInt(
              fields?.total_credits || courseData?.total_credits || 0
            ),
            gpa: fields.gpa,
          };
        });

        localStorage.setItem("userGPA", JSON.stringify(importedData));
        onImportSuccess?.(importedData);

        notification.success({
          message: "Thành công",
          description: `Đã nhập ${importedData.length} môn học thành công!`,
          duration: 2,
        });
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error processing file:", error);
        notification.error({
          message: "Lỗi",
          description:
            error.message ||
            "Lỗi khi xử lý file. Vui lòng kiểm tra định dạng file.",
          duration: 2,
        });
      }
    },
    [findCourseData, notification, onImportSuccess, validateRequiredFields]
  );

  const handleImport = useCallback(
    async (file) => {
      try {
        setLoading(true);
        const reader = new FileReader();

        reader.onload = (e) => {
          processFileContent(e.target.result, file.type);
          setLoading(false);
        };

        reader.onerror = () => {
          notification.error({
            message: "Lỗi",
            description: "Lỗi khi đọc file",
            duration: 2,
          });
          setLoading(false);
        };

        reader.readAsText(file, "UTF-8");
      } catch (error) {
        console.error("Import error:", error);
        notification.error({
          message: "Lỗi",
          description: "Lỗi khi nhập file",
          duration: 2,
        });
        setLoading(false);
      }

      return false;
    },
    [notification, processFileContent]
  );

  const uploadProps = {
    accept: Object.values(ACCEPTED_FILE_TYPES).join(","),
    showUploadList: false,
    customRequest: ({ file }) => handleImport(file),
    beforeUpload: (file) => {
      const isValidType =
        Object.keys(ACCEPTED_FILE_TYPES).includes(file.type) ||
        Object.values(ACCEPTED_FILE_TYPES).some((ext) =>
          file.name.endsWith(ext)
        );

      if (!isValidType) {
        notification.error({
          message: "Chỉ hỗ trợ tệp CSV hoặc TSV!",
          duration: 2,
        });
        return false;
      }
      return true;
    },
  };

  return (
    <>
      <Button icon={<UploadOutlined />} onClick={() => setIsModalOpen(true)}>
        Nhập bằng CSV/TSV
      </Button>

      <Modal
        title="Nhập điểm từ file CSV/TSV"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-medium">Yêu cầu bắt buộc:</h4>
            <ul className="list-disc pl-5" style={{ padding: "0 25px" }}>
              <li>Mã môn (VD: IT001)</li>
              <li>GPA (VD: 8.5)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium">Thông tin tùy chọn:</h4>
            <ul className="list-disc pl-5" style={{ padding: "0 25px" }}>
              <li>Loại môn: là tên viết tắt của loại môn (VD: ĐC)</li>
              <li>Số tín chỉ (VD: 3)</li>
            </ul>
          </div>

          <p>Có thể lấy template bằng cách sử dụng tính năng xuất CSV.</p>

          <div>
            <h4 className="font-medium">Lưu ý quan trọng:</h4>
            <ul className="list-disc pl-5" style={{ padding: "0 25px" }}>
              <li>Kiểm tra STT khi có thông báo môn học trùng lặp</li>
              <li>
                Dữ liệu nhập tay sẽ bị mất - hãy xuất CSV nếu muốn giữ lại
              </li>
              <li>
                Thông tin được cập nhật từ{" "}
                <Link
                  to="https://daa.uit.edu.vn/danh-muc-mon-hoc-dai-hoc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Danh mục môn học
                </Link>
              </li>
              <li>
                Kiểm tra và điều chỉnh số tín/loại môn theo Chương trình đào tạo
                của Khóa bạn.
              </li>
            </ul>
          </div>
          <br />
          <br />

          <Dragger {...uploadProps} loading={loading}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấp hoặc kéo file vào khu vực này để tải lên
            </p>
            <p className="ant-upload-hint">Hỗ trợ file CSV và TSV</p>
          </Dragger>
        </div>
      </Modal>
    </>
  );
};
