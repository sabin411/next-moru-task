import React, { useState } from 'react';

// pckages
import { Col, Row, Empty } from 'antd';

// components
import UserCard from '@/components/UserCard';

// types
import { UserCardDataProps } from '@/components/UserCard/types';

// globals
import { BASE_URL } from '@/globals/apiConstants';
import showNotification from '@/utils/notification';

export default function ServerSide({ users }: any) {
  const [data, setData] = useState<UserCardDataProps[]>(users);
  const { contextHolder, notify } = showNotification();

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

  // ! [NOTE]: Just in this case we are checking data on state, but in case of actual API call we can check data on response
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
      <h1>SSR (Server Side Rendering in action)</h1>
      <p
        style={{
          marginBottom: '2rem',
        }}
      >
        You should use getServerSideProps only if you need to render a page
        whose data must be fetched at request time. This could be due to the
        nature of the data or properties of the request (such as authorization
        headers or geo location). Pages using getServerSideProps will be server
        side rendered at request time and only be cached if cache-control
        headers are configured.
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
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(BASE_URL);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { users: data } };
}
