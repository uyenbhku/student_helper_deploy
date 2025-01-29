import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Select,
  Form,
  Card,
  Tooltip,
  Badge,
  App,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  ClearOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  COURSE_TYPE_OBJECT,
  COURSE_TYPE_OPTIONS,
} from "../../../utils/constants";
import { ExportButton } from "./ExportButton";
import { ImportButton } from "./ImportButton";
import { debounce } from "lodash";
import { FastPasteButton } from "./FastPasteButton";

export const GpaTable = () => {
  const coursesData = window.__APP_DATA__;
  const [form] = Form.useForm();
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(false);

  const { message, modal } = App.useApp();

  // Load saved data from localStorage on component mount
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("userGPA");
    if (savedData) {
      const data = JSON.parse(savedData);
      setCounter(data[data.length - 1]?.key + 1);
      return data;
    }

    return [
      {
        key: counter - 1, // 0
        course_code: "",
        course_name_vn: "",
        course_type: null,
        total_credits: "",
        gpa: "",
      },
    ];
  });

  // Save data to localStorage whenever it changes
  const debouncedSaveToLocalStorage = useCallback(
    debounce((dataToSave) => {
      localStorage.setItem("userGPA", JSON.stringify(dataToSave));
    }, 900),
    []
  );

  useEffect(() => {
    // Save debounced changes to localStorage
    debouncedSaveToLocalStorage(data);
    return () => debouncedSaveToLocalStorage.cancel();
  }, [data]);

  const [editingRow, setEditingRow] = useState(null);

  const bottomAddBtnRef = useRef(null);

  const scrollToBottom = () => {
    bottomAddBtnRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleAddRow = () => {
    scrollToBottom();
    if (!data || data.length === 0) {
      const newData = [
        {
          key: counter - 1, // 0
          course_code: null,
          course_name_vn: null,
          course_type: null,
          total_credits: null,
          gpa: null,
        },
      ];
      setData(newData);
      setEditingRow(0);
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
      return;
    }

    const lastRow = data[data.length - 1];
    const isRowComplete = Object.entries(lastRow).every(([key, value]) => {
      if (key === "key" || key === "note") return true;
      return value !== null && value !== "";
    });

    if (!isRowComplete) {
      setEditingRow(data.length - 1);
      message.warning("Xin hãy nhập dữ liệu ở dòng cuối trước khi tiếp tục");
      return;
    }

    form.validateFields().then(() => {
      const newData = [
        ...data,
        {
          key: counter,
          course_code: null,
          course_name_vn: null,
          course_type: null,
          total_credits: null,
          gpa: null,
        },
      ];
      setData(newData);
      setCounter((val) => val + 1);
      setEditingRow(data.length);
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
    });
  };
  // Start editing a row
  const handleEditRow = (record, rowIndex) => {
    // Scroll to the end of the table
    setEditingRow(rowIndex);
    form.setFieldsValue({
      ...record,
      course_type: record.course_type
        ? COURSE_TYPE_OPTIONS.find(
            (opt) =>
              opt.value === record.course_type?.value ||
              opt.value === record.course_type
          )
        : null,
    });
  };

  const handleCancelEdit = () => {
    if (form.isFieldsTouched()) {
    }
    setEditingRow(null);
    form.resetFields();
  };

  // Stop editing a row
  const handleSaveRow = (rowKey) => {
    form.validateFields().then((values) => {
      const newData = data.map((row) =>
        row.key === rowKey
          ? {
              ...row,
              ...values,
              course_type: values.course_type
                ? typeof values.course_type === "object"
                  ? values.course_type.value
                  : values.course_type
                : null,
            }
          : row
      );
      setData(newData);
      setEditingRow(null);
      form.resetFields();
      localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
    });
  };

  const handleToggleRow = (rowKey) => {
    const newData = data.map((row) =>
      row.key === rowKey
        ? {
            ...row,
            hidden: !row.hidden, // Toggle the hidden property
          }
        : row
    );
    setData(newData);
  };

  const handleSelectChange = (value, columnKey) => {
    if (columnKey === "course_name_vn" || columnKey === "course_code") {
      const selectedCourse = coursesData.find(
        (course) => course[columnKey] === value
      );
      if (selectedCourse) {
        form.setFieldsValue({
          course_code: selectedCourse.course_code,
          course_name_vn: selectedCourse.course_name_vn,
          course_type: COURSE_TYPE_OPTIONS.find(
            (opt) => opt.value === selectedCourse.course_type
          ),
          total_credits: selectedCourse.total_credits,
        });
      }
    }
  };

  const handleClearRow = () => {
    if (editingRow !== null) {
      form.resetFields();
    }
  };

  // Delete a specific row
  const handleDeleteRow = (rowKey) => {
    modal.confirm({
      content: `Bạn có muốn xóa môn này không?`,
      okType: "danger",
      onOk: () => {
        const newData = data.filter((course) => course.key !== rowKey);
        setData(newData);
        localStorage.setItem("userGPA", JSON.stringify(newData)); // Immediate save
        if (editingRow === rowKey - 1) {
          setEditingRow(null);
        }
      },
      closable: true,
      maskClosable: true,
    });
  };

  const validateUniqueValue = (field, value, rowKey) => {
    const duplicate = data.some(
      (row) => row[field] === value && rowKey !== row.key
    );
    return duplicate
      ? Promise.reject(
          new Error(`Giá trị "${value}" đã được chọn trong hàng khác`)
        )
      : Promise.resolve();
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "STT",
      key: "id",
      width: 60,
      align: "center",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã môn",
      key: "course_code",
      dataIndex: "course_code",
      align: "center",
      width: 100,
      ...getColumnSearchProps("course_code"),
      render: (value, record, index) =>
        editingRow === index ? (
          <Form.Item
            name={`course_code`}
            rules={[
              { required: true, message: "Vui lòng chọn mã môn học" },
              {
                validator: (_, value) =>
                  validateUniqueValue("course_code", value, record.key),
              },
            ]}
          >
            <Select
              placeholder="Chọn mã môn học"
              onChange={(value) => handleSelectChange(value, "course_code")}
              showSearch
              options={coursesData.map((course) => ({
                value: course.course_code,
                label: course.course_code,
              }))}
            />
          </Form.Item>
        ) : record.duplicated ? (
          <Tooltip title={"Môn học bị lặp"}>
            <Badge dot>{value}</Badge>
          </Tooltip>
        ) : (
          value || ""
        ),
    },
    {
      title: "Tên môn",
      key: "course_name_vn",
      dataIndex: "course_name_vn",
      align: "center",
      ...getColumnSearchProps("course_name_vn"),
      width: 300,
      render: (value, record, index) =>
        editingRow === index ? (
          <Form.Item
            name={`course_name_vn`}
            rules={[
              { required: true, message: "Vui lòng chọn môn học" },
              {
                validator: (_, value) =>
                  validateUniqueValue("course_name_vn", value, record.key),
              },
            ]}
          >
            <Select
              placeholder="Chọn môn học"
              showSearch
              onChange={(value) => handleSelectChange(value, "course_name_vn")}
              options={coursesData.map((course) => ({
                value: course.course_name_vn,
                label: course.course_name_vn,
              }))}
            />
          </Form.Item>
        ) : (
          value || ""
        ),
    },
    {
      title: "Loại môn",
      key: "course_type",
      align: "center",
      dataIndex: "course_type",
      width: 150,
      filters: COURSE_TYPE_OPTIONS,
      filterSearch: true,
      onFilter: (value, record) => record.course_type.startsWith(value),
      render: (value, record, index) =>
        editingRow === index ? (
          <Form.Item
            name="course_type"
            rules={[{ required: true, message: "Vui lòng chọn loại môn" }]}
          >
            <Select
              showSearch
              options={COURSE_TYPE_OPTIONS}
              placeholder="Chọn loại môn"
            />
          </Form.Item>
        ) : value?.value || value ? (
          COURSE_TYPE_OBJECT[value?.value || value] +
            ` (${value?.value || value})` || (
            <Tooltip title="Vui Lòng chọn loại môn">
              <Badge dot>Chưa chọn</Badge>
            </Tooltip>
          )
        ) : (
          <Tooltip title="Vui lòng chọn loại môn">
            <Badge dot>Chưa chọn</Badge>
          </Tooltip>
        ),
    },
    {
      title: "Số tín chỉ",
      key: "total_credits",
      dataIndex: "total_credits",
      width: 100,
      align: "center",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) =>
        parseFloat(a.total_credits) - parseFloat(b.total_credits),
      render: (value, record, index) =>
        editingRow === index ? (
          <Form.Item
            name={`total_credits`}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tín chỉ",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Số tín chỉ phải là số",
              },
            ]}
          >
            <Input placeholder="Nhập số tín chỉ =" />
          </Form.Item>
        ) : (
          value || ""
        ),
    },
    {
      title: "Điểm trung bình",
      key: "gpa",
      align: "center",
      showSorterTooltip: { target: "full-header" },
      sorter: (a, b) => parseFloat(a.gpa) - parseFloat(b.gpa),
      width: 150,
      dataIndex: "gpa",
      render: (value, record, index) =>
        editingRow === index ? (
          <Form.Item
            name={`gpa`}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập điểm",
              },
              {
                pattern: /^(10(\.0+)?|[0-9](\.[0-9])?|[Mm](iễn)?|[Bb](ảo)?( )?[Ll](ưu)?|I)$/,
                message: "Điểm từ 0-10, hoặc M (miễn), I, BL (bảo lưu)",
              },
            ]}
          >
            <Input placeholder="Nhập điểm" />
          </Form.Item>
        ) : value ? (
          ["M", "I", "BL"].includes(value.toString().toUpperCase()) ? (
            <Tooltip
              title={
                value === "M"
                  ? "Không tính điểm tích lũy"
                  : value === "I"
                  ? "Nếu đã học lại, vui lòng ghi điểm. Sau 2 học kỳ chưa học lại, điểm sẽ là 0"
                  : "Vui lòng nhập điểm đã bảo lưu"
              }
            >
              <Badge dot color={value === "M" ? "blue" : "redred"}>
                {value}
              </Badge>
            </Tooltip>
          ) : (
            value
          )
        ) : (
          ""
        ),
    },
    {
      title: "",
      key: "actions",
      width: 100,
      fixed: "right",
      align: "center",
      minWidth: 40,
      render: (text, record, index) => {
        return (
          <Space style={{ marginBottom: 16 }}>
            {editingRow === index ? (
              <Space style={{ marginBottom: 16, display: "flex", flexDirection: controlDirection }} align="center">
                <Tooltip title="Lưu">
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleSaveRow(record.key)}
                  />
                </Tooltip>
                <Tooltip title="Làm trống">
                  <Button onClick={handleClearRow} icon={<ClearOutlined />} />
                </Tooltip>
                <Tooltip title="Hủy">
                  <Button onClick={handleCancelEdit} icon={<CloseOutlined />} />
                </Tooltip>
              </Space>
            ) : (
              <Space style={{ marginBottom: 16, display: "flex", flexDirection: controlDirection }} align="start">
                <Tooltip title="Sửa">
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEditRow(record, index)}
                  />
                </Tooltip>
                <Tooltip
                  title={record.hidden ? "Tính điểm" : "Không tính điểm"}
                >
                  <Button
                    type={record.hidden ? "primary" : "dashed"}
                    icon={
                      record.hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />
                    }
                    onClick={() => handleToggleRow(record.key)}
                  />
                </Tooltip>
                <Tooltip title="Xóa">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteRow(record.key)}
                  />
                </Tooltip>
              </Space>
            )}
          </Space>
        );
      },
    },
  ];

  const handleImportSuccess = (importedData) => {
    setData(importedData);
    setCounter(importedData[importedData.length - 1]?.key + 1);
    setEditingRow(null);
  };


  const [controlDirection, setControlDirection] = useState("row");
  const checkWindowSize = () => {
    if (window.innerWidth > 850) {
      setControlDirection("row");
    } else {
      setControlDirection("column");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowSize);
    checkWindowSize();
    return () => window.removeEventListener("resize", checkWindowSize);
  }, [checkWindowSize]);

  return (
    <Card loading={loading}>
      <Space style={{ marginBottom: 16, display: "flex", flexDirection: controlDirection }} align="start">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRow}>
          Thêm môn học
        </Button>
        <FastPasteButton onImportSuccess={handleImportSuccess} />
        <ImportButton onImportSuccess={handleImportSuccess} />
        <ExportButton />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => {
            modal.confirm({
              content: "Bạn có muốn xóa tất cả?",
              okType: "danger",
              onOk: () => setData([]),
              closable: true,
              maskClosable: true,
            });
          }}
        >
          Xóa tất cả
        </Button>
      </Space>
      <Form
        form={form}
        // onKeyPress={(e) => {
        //   if (e.key === "Enter") {
        //     handleSaveRow(editingRow);
        //   }
        // }}
      >
        <Table
          columns={columns}
          tableLayout={"auto"}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{ x: 800 }}
        />
      </Form>
      <Space style={{ marginTop: 16 }}>
        <Button ref={bottomAddBtnRef} type="primary" icon={<PlusOutlined />} onClick={handleAddRow}>
          Thêm môn học
        </Button>
      </Space>
    </Card>
  );
};
