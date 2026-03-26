import { requireApiData } from "@/shared/api/client";
import { Post } from "@/type/type";

type PostsParams = {
  type: "all" | "my" | "user";
  userId?: number;
};

export async function fetchPosts(params: PostsParams): Promise<Post[]> {
  let url = "";
  
  switch (params.type) {
    case "all":
      url = "/api/posts/all";
      break;

    case "my":
      url = "/api/posts/my";
      break;

    case "user":
      if (!params.userId) {
        throw new Error("userId is required");
      }
      url = `/api/posts/user/${params.userId}`;
      break;
  }

  const response = await fetch(url);
  return requireApiData<Post[]>(response, "Не удалось загрузить посты");
}
