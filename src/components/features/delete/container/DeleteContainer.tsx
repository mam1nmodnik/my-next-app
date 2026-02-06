import { useDeletePost } from "@/hooks/useDeletePost";
import DeleteButton from "../ui/DeleteButton";

export default function DeleteContainer({ postId }: { postId: number }) {
    const { deletePost } = useDeletePost(postId);
    return (
        <DeleteButton onClick={() => deletePost()} />
    )
}