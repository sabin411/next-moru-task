import React, { useState } from 'react';

// packages
import { Col, Row, Empty } from 'antd';

// components
import UserCard from '@/components/UserCard';

// types
import { UserCardDataProps } from '@/components/UserCard/types';

// globals
import { BASE_URL } from '@/globals/apiConstants';

// utils
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
      <h1
        style={{
          marginBottom: '1rem',
        }}
      >
        SSR (Static Site Generation in action)
      </h1>
      <p
        style={{
          marginBottom: '2rem',
        }}
      >
        When a page with getStaticProps is pre-rendered at build time, in
        addition to the page HTML file, Next.js generates a JSON file holding
        the result of running getStaticProps.
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
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(BASE_URL);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: { users: data },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
