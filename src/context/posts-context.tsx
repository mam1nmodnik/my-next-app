"use client"; // если используешь Next.js App Router
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import {  PostsContextType, Post} from '@/type/type-post-context'


const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const getPostsLockalStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem("posts");
      if (!raw) return [];
      const post: Post[] = JSON.parse(raw);
      console.log(post);
      return post;
    } catch (e) {
      console.error("Ошибка парсинга posts:", e);
      return [];
    }
  }, []);
  
  useEffect(() => {
  
    const posts = getPostsLockalStorage();
      setPosts(posts);
    
  }, [getPostsLockalStorage, ]);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts }}
    >
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
