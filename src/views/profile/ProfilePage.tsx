"use client";
import { useUserContext } from "@/_providers/infra/user-provider";
import MyPostContainer from "@/entities/post/container/MyPostContainer";
import UserBlockProfile from "@/entities/user/profile/UserBlockProfile";
import {
  PostCardActions,
  PostCardDeleteMenu,
} from "@/features/post/PostCardActions";
import {
  UpdateProfileProvider,
  useUpdateProfile,
} from "@/features/updateProfile/model/UpdateProfileContext";

export default function ProfilePage() {
  return (
    <UpdateProfileProvider>
      <UserBlock />
    </UpdateProfileProvider>
  );
}
function UserBlock() {
  const { openModal } = useUpdateProfile();
  const { dataUser } = useUserContext();
  return (
    <UserBlockProfile
      data={dataUser}
      openModal={openModal}
      postContainer={
        <MyPostContainer
          renderActions={(post) => <PostCardActions post={post} />}
          renderMenu={(post) => <PostCardDeleteMenu postId={post.id} />}
        />
      }
    />
  );
}
