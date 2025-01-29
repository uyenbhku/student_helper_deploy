import React from "react";
import { Card, Col, Row, Typography, Form, Input, Button, App} from "antd";

const { Title, Paragraph } = Typography;

function ContactPage() {
    const { message, } = App.useApp();

    const [form] = Form.useForm();

    const onFinish = (values) => {
        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),  // Send form values as JSON
        })
        .then(response => response.json())
        .then(data => {
            message.open({
                type: data.status,
                content: data.message
            });          
            // You can show a success message or handle the response as needed
            form.resetFields();
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        });    
    };

    return (
        <div style={{ padding: "20px" }}>
            <Row gutter={16}>
                <Col span={24}>
                    <Card
                        title="Liên Hệ"
                        bordered={false}
                        style={{ boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Typography>
                            <Title level={2}>Chúng tôi luôn sẵn sàng lắng nghe bạn</Title>
                            <Paragraph>
                                Nếu bạn có bất kỳ câu hỏi nào, gợi ý phát triển hoặc cần hỗ trợ, vui lòng điền vào mẫu dưới đây. Chúng tôi sẽ phản hồi bạn sớm nhất có thể.
                            </Paragraph>
                        </Typography>
                        
                        <div style={{
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            padding: '20px',
                        }}>
                            <div style={{ width: '100%', maxWidth: 500 }}>
                                <Form
                                    name="contactForm"
                                    form={form}
                                    onFinish={onFinish}
                                    layout="vertical"
                                    initialValues={{ remember: true }}
                                    style={{ width: '100%' }}
                                >
                                    <Form.Item
                                        label="Tên"
                                        name="name"
                                        rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
                                    >
                                        <Input placeholder="Vui lòng nhập tên của bạn (hoặc bí danh)"/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                                    >
                                        <Input placeholder="Vui lòng để lại email của bạn nếu muốn nhận phản hồi"/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Nội Dung"
                                        name="content"
                                        rules={[{ required: true, message: "Vui lòng nhập nội dung!" }]}
                                    >
                                        <Input.TextArea placeholder="Vui lòng nhập góp ý hoặc câu hỏi của bạn" rows={4} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                                            Gửi
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default ContactPage;
