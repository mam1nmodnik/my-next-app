import { Modal } from "antd";
import { useUpdateProfile } from "../model/UpdateProfileContext";
import UpdateProfileForm from "./UpdateProfileForm";

export default function UpdateProfileModal() {
  const { open, closeModal } = useUpdateProfile();
  return (
    <Modal
      open={open}
      onCancel={closeModal}
      footer={false}
      closable={false}
      title={
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-row gap-2 items-center">
            <h2 className="text-xl font-bold">Edit profile</h2>
          </div>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-gray-600/25 transition cursor-pointer"
          >
            ✕
          </button>
        </div>
      }
    >
      <UpdateProfileForm />
    </Modal>
  );
}
