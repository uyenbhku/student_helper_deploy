import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

function AboutPage() {
    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={16}>
                <Col span={24}>
                    <Card
                        title="Giới Thiệu"
                        bordered={false}
                        style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Typography>
                            <Title level={2}>Student Helper</Title>
                            <Paragraph>
                                Dự án này được phát triển với mục đích giúp tôi thực hành và nâng cao kỹ năng trong việc sử dụng React kết hợp với Flask cho server-side rendering. Bên cạnh đó, ứng dụng cũng nhằm hỗ trợ các bạn sinh viên của Đại học Công nghệ Thông tin (UIT) trong việc kiểm tra và đánh giá điều kiện tốt nghiệp (tính theo tín chỉ) một cách nhanh chóng và dễ dàng.
                            </Paragraph>
                            <Title level={3}>Các Tính Năng Chính:</Title>
                            <ul>
                                <li>Giao diện thân thiện, thiết kế đáp ứng, phù hợp với mọi thiết bị.</li>
                                <li>Nhập điểm và kiểm tra điều kiện tốt nghiệp trực tiếp với độ bảo mật cao. Dữ liệu người dùng được bảo vệ tuyệt đối, không thu thập thông tin cá nhân.</li>
                            </ul>
                            <Title level={3}>Hướng Dẫn Sử Dụng:</Title>
                            <Paragraph>
                                Để bắt đầu, hãy truy cập vào trang <Link reloadDocument to="/">Home</Link> để nhập điểm số và điều kiện tốt nghiệp của bạn. Sau đó, hệ thống sẽ tự động tính toán và hiển thị kết quả.
                            </Paragraph>
                            <Paragraph>
                                Bất kỳ góp ý hay gợi ý phát triển nào, xin hãy đề xuất với tôi qua trang <Link reloadDocument to="/contact">Contact</Link>.
                            </Paragraph>
                        </Typography>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default AboutPage;
