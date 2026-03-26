"use client";

import { createContext, useContext, useState } from "react";
import UpdateProfileModal from "../ui/UpdateProfileModal";

type UpdateProfileContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const UpdateProfileContext = createContext<UpdateProfileContextType | null>(
  null,
);

export function UpdateProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <UpdateProfileContext.Provider value={{ open, openModal, closeModal }}>
      {children}
      <UpdateProfileModal />
    </UpdateProfileContext.Provider>
  );
}

export function useUpdateProfile() {
  const context = useContext(UpdateProfileContext);
  if (!context)
    throw new Error(
      "useUpdateProfile must be used inside UpdateProfileProvider",
    );
  return context;
}
