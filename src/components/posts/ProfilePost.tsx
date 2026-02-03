import UsersPosts from "./UsersPosts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMessageContext } from "@/context/message-context";
import { Post } from "@/type/type";
import MyLoader from "../IU/MyLoader";

export default function ProfilePost() {
  const queryClient = useQueryClient();
  const { openMessage } = useMessageContext();

  const { isLoading, data } = useQuery({
    queryKey: ["my-posts"],
    queryFn: async (): Promise<Array<Post>> => {
      const response = await fetch("/api/posts/my-posts");
      const result = await response.json();
      return result;
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/posts/delete-post/${id}`, {
        method: "DELETE",
      });
      const res = await response.json();
      openMessage(res);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-posts"] });
    },
  });

  async function deletePost(id: number) {
    deletePostMutation.mutate(id);
  }

  if (isLoading) {
    return (
      <div className="mt-5 mb-5 flex justify-center">
        <MyLoader size={32} />
      </div>
    );
  }

  return (
    data && (
      <UsersPosts
        queryKey={{ name: "my-posts" }}
        posts={data}
        deletePost={deletePost}
        suspens="Пока тут пусто...."
      />
    )
  );
}
