"use client"; // если используешь Next.js App Router
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { PostsContextType, Post } from "@/type/type-post-context";
import { useUserContext } from "./user-context";

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const { userName } = useUserContext();

  const getPosts = useCallback(async () => {
    try {
      if (userName) {
        const res = await fetch("/api/posts/post-user", {
          headers: {
            "x-user-id": userName?.id,
          },
        });
        const response = await res.json();
        setPosts(response);
      }
    } catch (error) {
      console.error("Ошибка при получении поста:", error);
    }
  }, [userName]);

  const getAllPosts = useCallback( async () => {
    try {
      const res = await fetch("/api/posts/all-posts");
      const response = await res.json();
      console.log(response)
      setAllPosts(response);
    } catch (error) {
      console.error("Ошибка при получении поста:", error);
    }
  }, [])
 
  useEffect(() => {
    getAllPosts();
    getPosts();
  }, [getPosts, getAllPosts]);
  return (
    <PostsContext.Provider value={{ posts, setPosts, allPosts, getPosts, getAllPosts }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePostsContext() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error(
      "usePostsContext must be used inside PostsContext.Provider"
    );
  }
  return context;
}
