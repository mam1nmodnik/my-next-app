export type Post = {
  id?: string;
  idUser?: string;
  title?: string;
  content?: string;
  nameUser?: string;
  date: string;
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
};