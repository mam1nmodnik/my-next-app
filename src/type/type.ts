
type like = {
  postId: number;
  userId: number
  isLiked: boolean;
}

export type Post = {
  id: number
  title?: string
  content?: string
  date: Date
  createdAt: Date
  userId: number
  likesCount: number
  isLiked: boolean
  likes: like[]
  user: {
    id: string
    login: string
    name: string
  }
}

export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
  image: string | null;
};

