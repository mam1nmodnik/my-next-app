import { Modal } from "antd";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalUnregisteredType = {
  openModal: () => void;
};

const ModalUnregistered = createContext<ModalUnregisteredType | undefined>(
  undefined,
);
export function ModalUnregisteredContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalUnregistered.Provider value={{ openModal }}>
      <>
        {children}

        <Modal
          title="Похоже, что вы не зарегистрировались..."
          closable={{ "aria-label": "Custom Close Button" }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={<></>}
        />
      </>
    </ModalUnregistered.Provider>
  );
}
export function useModalUnregistered() {
  const context = useContext(ModalUnregistered);
  if (!context)
    throw new Error(
      "useModalUnregistered must be used inside ModalUnregisteredContextProvider",
    );
  return context;
}
