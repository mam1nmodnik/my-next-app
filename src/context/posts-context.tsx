"use client"; // если используешь Next.js App Router

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

type Post = {
  key: number;
  title: string;
  content: string;
  nameUser: string;
  date: string;
};
type NameUser = {
  idUser: string;
  nameUser: string;
  emailUser: string;
  telUser: string;
};
type PostsContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  userName: NameUser;
  getUserLocalStorage: () => NameUser;
  loader: boolean
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setNameUser] = useState<NameUser>({
    idUser: "",
    nameUser: "",
    emailUser: "",
    telUser: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
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
  const getUserLocalStorage = useCallback((): NameUser => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) {
        return { idUser: "", nameUser: "Гость", emailUser: "", telUser: "" };
      }
      const user: NameUser = JSON.parse(raw);
      console.log(user);
      return user;
    } catch (e) {
      console.error("Ошибка парсинга user:", e);
      return { idUser: "", nameUser: "Гость", emailUser: "", telUser: "" };
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const user = getUserLocalStorage();
      setNameUser(user);
      const posts = getPostsLockalStorage();
      setPosts(posts);
      setLoader((el => !el));
    }, 2000);
  }, [getPostsLockalStorage, getUserLocalStorage]);

  return (
    <PostsContext.Provider
      value={{ posts, setPosts, userName, getUserLocalStorage, loader }}
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
