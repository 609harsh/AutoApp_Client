import React, { useEffect, useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Card, Flex, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { useSignupMutation } from '../../../shared/apis/authApi';

const { Title, Paragraph } = Typography;

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormSubmittable, setIsFormSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const { message } = App.useApp();
  const [signupMutation, { isLoading }] = useSignupMutation();

  function handleSignup(values: any) {
    signupMutation({
      ...values
    })
      .unwrap()
      .then(() => {
        message.success('Please check your mail');
        navigate('../login');
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
          <Title className="scroll-m-20 !text-3xl !font-semibold tracking-tight">
            Join Innojet
          </Title>
          <Paragraph className="font-normal text-mutedForeground">
            Already have an account? <Link to="../login">Sign in</Link>
          </Paragraph>
        </Flex>
        <Flex vertical>
          <Form layout="vertical" form={form} onFinish={handleSignup}>
            <Form.Item
              name="name"
              label="Name"
              className="font-medium"
              rules={[
                { required: true, message: 'Please enter your name' },
                {
                  min: 2,
                  message: 'Name must contain atleast 2 characters'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
            </Form.Item>
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
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
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
                htmlType="submit"
                type="primary"
                size="large"
                className="mt-1 w-full"
                loading={isLoading}
                disabled={!isFormSubmittable}
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default SignupPage;
