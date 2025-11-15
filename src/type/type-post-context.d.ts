export type Post = {
  id: number;
  idUser?: number;
  title?: string;
  content?: string;
  date: Date;
  createdAt: Date;
  userId: number;
};
export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
  image: string | null;
};

export type PostsContextType = {
  allPosts: Post[];
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  getPosts: () => void;
  getAllPosts: () => void;
};