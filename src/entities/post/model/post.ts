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

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
