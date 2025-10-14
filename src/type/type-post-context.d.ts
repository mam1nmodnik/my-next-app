export type Post = {
  id?: number;
  idUser?: string;
  title?: string;
  content?: string;
  nameUser?: string;
  date: Date;
  createdAt: Date;
};
export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
};

export type PostsContextType = {
  allPosts: Post[];
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  getPosts: () => void;
  getAllPosts: () => void;
};