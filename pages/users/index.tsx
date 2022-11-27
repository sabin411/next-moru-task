import React, { useEffect, useState } from 'react';

// pckages
import axios from 'axios';
import { Col, Row, Empty } from 'antd';

// components
import UserCard from '@/components/UserCard';

// types
import { UserCardDataProps } from '@/components/UserCard/types';

// globals
import { Spinner } from '@/globals/commons';
import showNotification from '@/utils/notification';
import { BASE_URL, apiConstants } from '@/globals/apiConstants';

const Users = () => {
  const { Delete_User, Edit_User } = apiConstants;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<UserCardDataProps[]>([]);
  const { contextHolder, notify } = showNotification();

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(BASE_URL).then(res => {
        setData(res.data);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  // takes userid and edits the user
  const handleEdit = (userData: UserCardDataProps) => {
    // ! [NOTE]: In case of actual api call, we can use axios.put(Edit_User(id), data)
    // try {
    //   axios.put(Edit_User(userData.id), {
    //     userData
    //   }).then((res) => {
    //     console.log(res);
    //   });
    // }
    // catch (err) {
    //   console.log(err);
    // }

    // ! [NOTE]: In case of dummy data, we can use this
    const newData = data.map(item => {
      if (item.id === userData.id) {
        return userData;
      }
      return item;
    });
    setData([...newData]);
    notify({
      message: 'User Edited',
      desp: 'User has been edited successfully',
    });
  };

  // takes userid and deletes the user
  const handleDelete = (id: number) => {
    // ! [NOTE]: In case of actual API write below code to delete the user
    // try {
    //   axios.delete(Delete_User(id)).then((res) => {
    //     console.log(res);
    //   });
    // }
    // catch (err) {
    //   console.log(err);
    // }

    // ! [NOTE]: In case of dummy API write below code to delete the user
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return (
      <div className='center-child'>
        <Empty />
      </div>
    );
  }

  return (
    <section className='customContainer'>
      {contextHolder}
      <h1>Users</h1>
      <p
        style={{
          marginBottom: '1rem',
        }}
      >
        This is our client side rendering.
      </p>
      <div>
        <Row
          gutter={[
            { xs: 10, sm: 16, md: 24, lg: 32 },
            { xs: 10, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {data.map((item: any) => (
            <Col key={item.id} lg={6} md={8} sm={12} xs={24}>
              <UserCard
                data={{ ...item, onEdit: handleEdit, onDelete: handleDelete }}
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default Users;
