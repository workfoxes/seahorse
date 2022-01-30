import React from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import { Form, Input, Button, Checkbox, Row, Col, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export class AuthLayout extends React.Component<any, any> {
  state = {
    redirect: "",
  };
  onFinish = (values: any) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  public render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <BrowserRouter basename="/view">
        <Row justify="space-around" align="middle" style={{ height: "100vh" }}>
          <Col span={6}>
            <Form
              className={`height-50`}
              name="login form"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Space size={"large"}>
                  <Button
                    type="primary"
                    icon={<LoginOutlined />}
                    htmlType="submit"
                  >
                    Login
                  </Button>
                  <Button
                    type="primary"
                    icon={<GoogleOutlined />}
                    onClick={() => console.log("google login")}
                  >
                    {" "}
                    Google{" "}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </BrowserRouter>
    );
  }
}