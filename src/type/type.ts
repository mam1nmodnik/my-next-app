
type like = {
  postId: number;
  userId: number
  isLiked: boolean;
}

export type Post = {
  id: number
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
    avatar: string
  }
}

export type User = {
  name?: string | null;
  email: string;
  login: string;
  avatar: string | null;
  bio: string;
};

