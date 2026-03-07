"use client";
import {
  UpdateProfileProvider,
  useUpdateProfile,
} from "@/features/updateProfile/model/UpdateProfileContext";
import UpdateProfileModal from "@/features/updateProfile/ui/UpdateProfileModal";
import UserBlockProfile from "@/entities/user/UserBlockProfile";
import {
  PostCardActions,
  PostCardDeleteMenu,
} from "@/widgets/post/PostCardActions";

function ProfileContent() {
  const { openModal } = useUpdateProfile();

  return (
    <>
      <UserBlockProfile
        onEditProfile={openModal}
        renderPostActions={(post) => <PostCardActions post={post} />}
        renderPostMenu={(post) => <PostCardDeleteMenu postId={post.id} />}
      />
      <UpdateProfileModal />
    </>
  );
}

export default function Profile() {
  return (
    <UpdateProfileProvider>
      <ProfileContent />
    </UpdateProfileProvider>
  );
}
