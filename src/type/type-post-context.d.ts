export type Post = {
  id?: number;
  idUser?: number;
  title?: string;
  content?: string;
  date: Date;
  createdAt: Date;
  userId: number;
  user: {
    name: string
  }
};
export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
  avatar: string | null;
};

export type PostsContextType = {
  allPosts: Post[];
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  getPosts: () => void;
  getAllPosts: () => void;
};