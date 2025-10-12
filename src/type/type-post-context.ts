export type Post = {
  key: number;
  title: string;
  content: string;
  nameUser: string;
  date: string;
};
export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
};

export type PostsContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};