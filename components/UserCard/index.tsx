import React from 'react';

// components
import Image from '@/components/Image';

// packages
import { Button, Card, Form, Input, InputNumber } from 'antd';
import {
  HeartFilled,
  EditOutlined,
  MailOutlined,
  DeleteFilled,
  PhoneOutlined,
  HeartOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

// components
import editModal from './editModal';

// types
import { UserCardDataProps, UserCardProps } from './types';

// styles
import styles from './styles.module.css';

// constants
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// validation rules
const validateMessages = {
  required: '${label} is required!',
  types: {
    name: '${label} is not a valid name!',
    email: '${label} is not a valid email!',
    phone: '${label} is not a valid phone number!',
    website: '${label} is not a valid website!',
  },
};

export default function UserCard({ data }: { data: UserCardProps }) {
  const { Meta } = Card;
  const { onDelete, onEdit } = data;
  const { Modal, setModalOpen } = editModal();
  const [isFavorite, setFavorite] = React.useState(data.liked);

  const onFinish = (values: { user: UserCardDataProps }) => {
    console.log(values.user);
    onEdit({ ...values.user, id: data.id });
    setModalOpen(false);
  };

  const handleHeartClick = () => {
    setFavorite(!isFavorite);
  };

  const handleEditBtnClick = () => {
    setModalOpen(true);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        marginInline: 'auto',
      }}
    >
      {/* card starts here */}
      <Card
        cover={
          <div
            style={{
              height: '200px',
            }}
            className={styles.userImageContainer}
          >
            <Image
              src='/images/dummy.jpg' // ! [NOTE]: USED DUMMY IMAGE BECAUSE
              alt='user image' // ! API DOESN'T PROVIDE ANY IMAGE
            />
            {/* <img
              alt={data.name}
              src={'/images/dummy.jpg'} // ! [NOTE]: USED DUMMY IMAGE BECAUSE
              className={styles.userImage} // ! API DOESN'T PROVIDE ANY IMAGE
            /> */}
          </div>
        }
        actions={[
          !isFavorite ? (
            <HeartOutlined
              style={{
                color: 'red',
              }}
              onClick={handleHeartClick}
              key='like'
            />
          ) : (
            <HeartFilled
              style={{
                color: 'red',
              }}
              onClick={handleHeartClick}
              key='like'
            />
          ),
          <EditOutlined onClick={handleEditBtnClick} key='edit' />,
          <DeleteFilled onClick={() => onDelete(data.id)} key='delete' />,
        ]}
      >
        <Meta
          title={data.name}
          description={[
            <div className={styles.descriptionText} key='email'>
              <span className={styles.descriptionIcon}>
                <MailOutlined />
              </span>
              <span className={styles.descriptionText}>{data.email}</span>
            </div>,
            <div className={styles.descriptionText} key='number'>
              <span className={styles.descriptionIcon}>
                <PhoneOutlined />
              </span>
              <span>{data.phone}</span>
            </div>,
            <div className={styles.descriptionText} key='website'>
              <span className={styles.descriptionIcon}>
                <GlobalOutlined />
              </span>
              <span className={styles.descriptionText}>{data.website}</span>
            </div>,
          ]}
        />
      </Card>
      {/* card ends here */}

      {/* Edit Modal starts here */}
      <Modal>
        <div
          style={{
            width: '100%',
            maxWidth: '500px',
            marginInline: 'auto',
            marginTop: '24px',
          }}
        >
          <Form
            {...layout}
            name='nest-messages'
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={['user', 'name']}
              label='Name'
              rules={[{ required: true }]}
              initialValue={data.name}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label='Email'
              rules={[{ type: 'email', required: true }]}
              initialValue={data.email}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'phone']}
              label='Phone Number'
              rules={[{ required: true }]}
              initialValue={data.phone}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'website']}
              label='Website'
              rules={[{ type: 'url', required: true }]}
              initialValue={data.website}
            >
              <Input />
            </Form.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                htmlType='button'
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                htmlType='submit'
                style={{
                  marginLeft: '16px',
                }}
                type='primary'
              >
                OK
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      {/* Edit Modal ends here */}
    </div>
  );
}
