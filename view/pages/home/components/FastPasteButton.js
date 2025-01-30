import React, { useState, useCallback } from "react";
import { Button, App, Modal, Form, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getBaseType } from "../../../utils/constants";
import { useContentParser } from "../../../utils/contentParser";

const { TextArea } = Input;

const MODAL_TEXTS = {
  title: "Dán nội dung bảng điểm",
  okText: "Nhập",
  cancelText: "Hủy",
  placeholder: "Dán nội dung vào đây...",
  format: "mã môn,điểm trung bình[,loại môn,số tín chỉ]",
  example: (
    <>
      IT001,8.5,ĐC,3
      <br />
      IT002,7.5,ĐC,3
    </>
  ),
};

export const FastPasteButton = ({ onImportSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const coursesData = window.__APP_DATA__;
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const {
    findCourseData,
    detectDelimiter,
    validateRequiredFields,
    parseDelimitedContent,
    parseStructuredContent,
  } = useContentParser(coursesData);

  //   const handleProcessContent = useCallback(
  //     async (values) => {
  //       try {
  //         setLoading(true);
  //         console.log(values)
  //         const content = values.pastedContent;
  //         const delimiter = detectDelimiter(content);
  //         const { lines, fieldIndices } = parseDelimitedContent(
  //           content,
  //           delimiter
  //         );

  //         const seenCourses = new Set();
  //         const importedData = [];

  //         for (let i = 1; i < lines.length; i++) {
  //           try {
  //             const line = lines[i];
  //             if (!line.trim()) continue;

  //             const values = line.split(delimiter).map((v) => v.trim());
  //             const fields = Object.entries(fieldIndices).reduce(
  //               (acc, [field, idx]) => ({ ...acc, [field]: values[idx] }),
  //               {}
  //             );

  //             validateRequiredFields(fields);

  //             if (seenCourses.has(fields.course_code)) {
  //               notification.warning({
  //                 message: "Phát hiện môn học bị lặp",
  //                 description: `Môn học ${fields.course_code} ở dòng ${
  //                   i + 1
  //                 } bị lặp`,
  //                 duration: 5,
  //               });
  //               continue;
  //             }

  //             const courseData = findCourseData(fields.course_code);
  //             if (!courseData) continue;

  //             seenCourses.add(fields.course_code);
  //             importedData.push({
  //               key: i - 1,
  //               course_code: fields.course_code,
  //               course_name_vn: courseData.course_name_vn,
  //               course_type:
  //                 getBaseType(fields.course_type) || courseData.course_type,
  //               total_credits: parseInt(
  //                 fields?.total_credits || courseData?.total_credits || 0
  //               ),
  //               gpa: fields.gpa,
  //             });
  //           } catch (error) {
  //             console.error(`Error processing line ${i + 1}:`, error);
  //           }
  //         }

  //         if (importedData.length === 0) {
  //           throw new Error("Không có dữ liệu hợp lệ để nhập");
  //         }

  //         localStorage.setItem("userGPA", JSON.stringify(importedData));
  //         onImportSuccess?.(importedData);

  //         notification.success({
  //           message: "Thành công",
  //           description: `Đã nhập ${importedData.length} môn học thành công!`,
  //           duration: 2,
  //         });

  //         handleClose();
  //       } catch (error) {
  //         console.error("Error processing content:", error);
  //         notification.error({
  //           message: "Lỗi",
  //           description:
  //             error.message ||
  //             "Lỗi khi xử lý nội dung. Vui lòng kiểm tra định dạng.",
  //           duration: 2,
  //         });
  //       } finally {
  //         setLoading(false);
  //       }
  //     },
  //     [
  //       detectDelimiter,
  //       findCourseData,
  //       notification,
  //       onImportSuccess,
  //       parseDelimitedContent,
  //       validateRequiredFields,
  //     ]
  //   );

  const handleProcessContent = useCallback(
    async (values) => {
      try {
        setLoading(true);
        const content = values.pastedContent;

        let importedData = [];
        let delimiter = detectDelimiter(content);

        if (delimiter === "\t" && content.includes("Học kỳ")) {
          // **Process Content 1** UIT KQHT
          const lines = content.split("\n").map((line) => line.trim());

          let inSemesterBlock = false;

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (/Học kỳ\s+\d+\s+-\s+Năm học/.test(line)) {
              inSemesterBlock = true;
              continue;
            }

            if (!inSemesterBlock || !line.match(/^\d+\t/)) continue;
            console.log(line)
            const values = line.split("\t").map((v) => v.trim());

            if (values.length < 6) continue;

            const course_code = values[1]; // Mã HP
            const total_credits = values[3]; // Tín chỉ
            let gpa = values[8];
            if (values[8].match(/^[M|m](iễn)?$/)) {
                gpa = "M";
            }
            else if (values[8].match(/^[Bb](ảo)?( )?[Ll](ưu)?$/)) {
                gpa = "BL";
            }
            else if (values[8].match(/^I$/)) {
                gpa = "I";
            }
            
            const courseData = findCourseData(course_code);
            if (!courseData) continue;

            importedData.push({
              key: i - 1,
              course_code: course_code,
              course_name_vn: courseData.course_name_vn,
              course_type: courseData.course_type,
              total_credits: parseInt(
                total_credits || courseData?.total_credits || 0
              ),
              gpa: gpa,
            });
          }
        } else {
          // **Process Content 2** Excel paste
          const { lines, fieldIndices } = parseDelimitedContent(
            content,
            delimiter
          );
          const seenCourses = new Set();

          for (let i = 1; i < lines.length; i++) {
            try {
              const line = lines[i];
              if (!line.trim()) continue;

              const values = line.split(delimiter).map((v) => v.trim());
              const fields = Object.entries(fieldIndices).reduce(
                (acc, [field, idx]) => ({ ...acc, [field]: values[idx] }),
                {}
              );

              validateRequiredFields(fields);

              if (seenCourses.has(fields.course_code)) {
                notification.warning({
                  message: "Phát hiện môn học bị lặp",
                  description: `Môn học ${fields.course_code} ở dòng ${
                    i + 1
                  } bị lặp`,
                  duration: 5,
                });
                continue;
              }

              const courseData = findCourseData(fields.course_code);
              if (!courseData) continue;

              seenCourses.add(fields.course_code);
              importedData.push({
                key: i - 1,
                course_code: fields.course_code,
                course_name_vn: courseData.course_name_vn,
                course_type:
                  getBaseType(fields.course_type) || courseData.course_type,
                total_credits: parseInt(
                  fields?.total_credits || courseData?.total_credits || 0
                ),
                gpa: fields.gpa,
              });
            } catch (error) {
              console.error(`Error processing line ${i + 1}:`, error);
            }
          }
        }

        if (importedData.length === 0) {
          throw new Error("Không có dữ liệu hợp lệ để nhập");
        }

        localStorage.setItem("userGPA", JSON.stringify(importedData));
        onImportSuccess?.(importedData);

        notification.success({
          message: "Thành công",
          description: `Đã nhập ${importedData.length} môn học thành công!`,
          duration: 2,
        });

        handleClose();
      } catch (error) {
        console.error("Error processing content:", error);
        notification.error({
          message: "Lỗi",
          description:
            error.message ||
            "Lỗi khi xử lý nội dung. Vui lòng kiểm tra định dạng.",
          duration: 2,
        });
      } finally {
        setLoading(false);
      }
    },
    [
      detectDelimiter,
      findCourseData,
      notification,
      onImportSuccess,
      parseDelimitedContent,
      parseStructuredContent, // Added the new function
      validateRequiredFields,
    ]
  );

  const handleClose = useCallback(() => {
    setIsModalOpen(false);
    form.resetFields();
  }, [form]);

  return (
    <>
      <Button
        icon={<CopyOutlined />}
        onClick={() => setIsModalOpen(true)}
        className="ml-2"
      >
        Dán nhanh
      </Button>

      <Modal
        title={MODAL_TEXTS.title}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleClose}
        confirmLoading={loading}
        okText={MODAL_TEXTS.okText}
        cancelText={MODAL_TEXTS.cancelText}
      >
        <Form
          form={form}
          onFinish={handleProcessContent}
          layout="vertical"
          requiredMark={false}
        >
          <div className="space-y-4">
            <p>
              Dán nội dung từ file CSV/TSV hoặc bảng điểm trên DAA của bạn vào đây. Định dạng yêu cầu:
            </p>

            <div className="bg-gray-50 p-3 rounded">
              <code>
                {MODAL_TEXTS.format}
                <br />
                {MODAL_TEXTS.example}
              </code>
            </div>

            <Form.Item
              name="pastedContent"
              rules={[
                {
                  required: true,
                  message: "Vui lòng dán nội dung vào đây",
                },
                {
                  validator: async (_, value) => {
                    if (!value?.trim()) {
                      return Promise.reject("Nội dung không được để trống");
                    }
                    if (!value.includes("\n")) {
                      return Promise.reject(
                        "Nội dung phải có ít nhất hai dòng (tiêu đề và dữ liệu)"
                      );
                    }
                  },
                },
              ]}
            >
              <TextArea
                placeholder={MODAL_TEXTS.placeholder}
                rows={10}
                className="font-mono"
              />
            </Form.Item>

            <div className="text-sm text-gray-500">
              <ul className="list-disc pl-5" style={{ padding: "0 25px" }}>
                <li>
                  Hỗ trợ cả định dạng CSV (phân cách bằng dấu phẩy) và TSV (phân
                  cách bằng tab)
                </li>
                <li>Hỗ trợ dán từ Excel (theo template xuất CSV) hoặc từ trang Kết quả học tập ở UIT (copy từ header (mã HP,...) xuống hết bảng).</li>
                <li>Định dạng sẽ được tự động nhận diện dựa trên nội dung</li>
              </ul>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};
