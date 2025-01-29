import React, { useEffect, useCallback, useState } from "react";
import { Button, Input, Space, Select, Form, Card } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { COURSE_TYPE_OPTIONS } from "../../../utils/constants";
import { debounce } from "lodash";

export const GraduationRequirements = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const debouncedCalculate = useCallback(
    debounce(() => {
      const savedData = localStorage.getItem("gradReqs");
      if (savedData) {
        form.setFieldsValue(JSON.parse(savedData));
      }
      setLoading(false);
    }, 500),
    [form]
  );

  useEffect(() => {
    setLoading(true);
    debouncedCalculate();
    return () => debouncedCalculate.cancel();
  }, [debouncedCalculate]);

  const handleFieldsChange = (_, allFields) => {
    const updatedValues = form.getFieldsValue();
    localStorage.setItem("gradReqs", JSON.stringify(updatedValues));
  };

  const [formItemDirection, setFormItemDirection] = useState("row");
  const checkWindowSize = () => {
    if (window.innerWidth > 900) {
      setFormItemDirection("row");
    } else {
      setFormItemDirection("column");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  return (
    <Card loading={loading}>
      <Form
        form={form}
        onFieldsChange={handleFieldsChange}
        layout="vertical"
        style={{ maxWidth: "100%", margin: "20px" }}
        initialValues={{ requirements: [{}] }}
      >
        <Form.List name="requirements">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <div
                  key={`${field.key}`}
                  style={{
                    marginBottom: "20px",
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-end",
                    flexDirection: formItemDirection,
                  }}
                >
                  <Form.Item
                    label="Tên điều kiện"
                    {...formItemLayout}
                    name={[field.name, "name"]}
                    rules={[
                      { required: true, message: "Vui lòng chọn điều kiện" },
                      {
                        validator: (_, value) => {
                          const currentValues =
                            form.getFieldValue("requirements") || [];
                          const duplicate = currentValues.some(
                            (item, idx) => idx !== index && item.name === value
                          );
                          if (duplicate) {
                            return Promise.reject(
                              new Error(
                                "Loại điều kiện đã được chọn, vui lòng chọn loại khác"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                    style={{ flex: 5, marginBottom: 0, width: "100%" }}
                  >
                    <Select
                      placeholder="Chọn điều kiện"
                      options={COURSE_TYPE_OPTIONS}
                    />
                  </Form.Item>

                  <Form.Item
                    {...formItemLayout}
                    label="Tổng số tín chỉ tối thiểu"
                    name={[field.name, "value"]}
                    rules={[
                      { required: true, message: "Vui lòng nhập giá trị" },
                      { pattern: /^[0-9]+$/, message: "Số tín chỉ phải là số" },
                    ]}
                    style={{ flex: 3, marginBottom: 0, width: "100%" }}
                  >
                    <Input placeholder="Ví dụ: 158" />
                  </Form.Item>

                  <Form.Item
                    label="Ghi chú"
                    {...formItemLayout}
                    name={[field.name, "note"]}
                    style={{ flex: 2, marginBottom: 0, width: "100%" }}
                  >
                    <Input placeholder="Thêm ghi chú nếu cần" />
                  </Form.Item>

                  {fields.length > 1 && (
                    <Button
                      danger
                      onClick={() => remove(field.name)}
                      icon={<DeleteOutlined />}
                    >
                      Xóa
                    </Button>
                  )}
                </div>
              ))}
              <Space>
                <Button
                  type="dashed"
                  onClick={() => {
                    form
                      .validateFields() // Validate all fields in the form
                      .then(() => {
                        add(); // Add a new item if validation passes
                      })
                      .catch(() => {
                        // Handle validation errors if needed
                        console.log(
                          "Validation failed. Please fill all required fields before adding."
                        );
                      });
                  }}
                  icon={<PlusOutlined />}
                >
                  Thêm điều kiện
                </Button>
              </Space>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};
