"use client";
import { UpdateProfileProvider } from "@/features/updateProfile/model/ UpdateProfileContext";
import UpdateProfileModal from "@/features/updateProfile/ui/UpdateProfileModal";
import UserBlockProfile from "@/entities/user/UserBlockProfile";

export default function Profile() {
  return (
    <>
      <UpdateProfileProvider>
        <UserBlockProfile />
        <UpdateProfileModal />
      </UpdateProfileProvider>
    </>
  );
}
