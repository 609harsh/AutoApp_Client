import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Button, Card, Flex, Form, Input, Typography } from 'antd';
import { useLocation, useParams } from 'react-router-dom';

import { useHandleInvitationMutation } from '../../../shared/apis/authApi';

const { Title } = Typography;

const Invitations: React.FC = () => {
  const { invitationId } = useParams();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get("id");
  const [isFormSubmittable, setIsFormSubmittable] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const values = Form.useWatch([], form);
  const [handleInvitation, { isLoading }] = useHandleInvitationMutation();

  const handleRedirect = async (values: any) => {
    if (invitationId) {
      handleInvitation({
        company: values.companyName,
        phoneNumber: values.phoneNumber,
        userId: id,
        token: invitationId
      })
        .unwrap()
        .then((response) => {
          message.success(`Welcome ${response.username}`);
        })
        .catch((error) => {
          if (error) {
            if ('data' in error) {
              message.error(error?.data?.message || 'An error occurred');
            }
          }
        });
    }
  };

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
          <Title className="scroll-m-20 !text-3xl !font-semibold tracking-tight">Add Details</Title>
        </Flex>
        <Flex vertical>
          <Form layout="vertical" form={form} onFinish={handleRedirect}>
            <Form.Item
              name="companyName"
              label="Company Name"
              className="font-medium"
              rules={[
                { required: true, message: '' },
                {
                  min: 2,
                  message: 'Company Name must contain atleast 2 characters'
                }
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter company name" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              className="font-medium"
              rules={[
                { required: true, message: 'Please enter your phone number' },
                {
                  len: 10,
                  message: 'Phone number must contain 10 digits'
                },
                {
                  pattern: new RegExp('^[0-9]{10}$'),
                  message: 'Please enter a valid phone number'
                }
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Enter phone number" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                className="mt-1 w-full"
                disabled={!isFormSubmittable}
                loading={isLoading}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Invitations;
