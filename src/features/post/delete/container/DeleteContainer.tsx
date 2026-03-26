import { usePathname } from "next/navigation";
import { useDeletePost } from "../model/useDeletePost";
import DeleteButton from "../ui/DeleteButton";

export default function DeleteContainer({ postId }: { postId: number }) {
  const { deletePost } = useDeletePost(postId);
  const pathname = usePathname();

  return (
    pathname === "/profile" ? <DeleteButton onClick={() => deletePost()} /> : null
  );
}
