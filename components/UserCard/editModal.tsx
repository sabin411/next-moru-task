import React, { useCallback, useState } from 'react';

// packages
import { Modal as AntDModal } from 'antd';

export default function EditModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const Modal = useCallback(
    ({ children }: { children: JSX.Element }) => {
      return (
        <>
          <AntDModal
            title='Edit User'
            open={modalOpen}
            onOk={() => {
              setModalOpen(false);
            }}
            onCancel={() => setModalOpen(false)}
            footer={[]}
          >
            {children}
          </AntDModal>
        </>
      );
    },
    [modalOpen],
  );

  return {
    Modal,
    setModalOpen,
  };
}
