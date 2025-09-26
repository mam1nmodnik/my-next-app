"use client"; // если используешь Next.js App Router

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Post = {
  key: number;
  title: string;
  content: string;
  // nameUser: string;
  date: string;
};
type NameUser = {
  nameUser: string;
}
type PostsContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [nameUser, setNAmeUser] = useState<NameUser>()
  function getPostsLockalStorage() {
    try {
      const raw = localStorage.getItem("posts");
      if (!raw) return [];
      const post: Post[] = JSON.parse(raw);
      return post;
    } catch (e) {
      console.error("Ошибка парсинга posts:", e);
      return [];
    }
  }
  useEffect(() => {
    const post = getPostsLockalStorage();
    setPosts(post);
  }, []);
  return (
    <PostsContext.Provider value={{ posts, setPosts,  }}>
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
