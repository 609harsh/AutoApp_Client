import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { loginForm, useLoginMutation } from '../../../shared/apis/authApi';

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [isFormSubmittable, setIsFormSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const values = Form.useWatch([], form);
  const [loginMutation, { isLoading }] = useLoginMutation();

  function handleLogin(values: loginForm) {
    loginMutation(values)
      .unwrap()
      .then((response) => {
        if ('emailSent' in response) {
          message.info(`Please check your email`);
        } else message.success(`Welcome ${response.username}`);
      })
      .catch((error) => {
        if (error) {
          if ('data' in error) {
            message.error(error.data.message || 'An error occurred');
          }
        }
      });
  }

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setIsFormSubmittable(true))
      .catch(() => setIsFormSubmittable(false));
  }, [form, values]);

  return (
    <Card className="mt-16 w-full max-w-sm border-border shadow-sm">
      <Flex vertical className="gap-2">
        <Flex vertical>
          <Title className="scroll-m-20 !text-3xl !font-semibold tracking-tight">Sign in</Title>
          <Paragraph className="font-normal text-mutedForeground">
            New to InnoJet? <Link to="../signup">Create an account</Link>
          </Paragraph>
        </Flex>
        <Flex vertical>
          <Form layout="vertical" form={form} onFinish={handleLogin}>
            <Flex vertical className="w-full gap-1">
              <Form.Item
                name="email"
                label="Email"
                className="font-medium"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  {
                    type: 'email',
                    message: 'Please enter a valid email'
                  }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter your email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                className="font-medium"
                rules={[
                  { required: true, message: 'Please enter your password' },
                  {
                    min: 6,
                    message: 'Password must contain atleast 6 characters'
                  }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="mt-1 w-full"
                  loading={isLoading}
                  disabled={!isFormSubmittable}
                >
                  Login
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default LoginPage;
