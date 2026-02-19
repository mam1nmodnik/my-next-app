
type like = {
  postId: number;
  userId: number
  isLiked: boolean;
}

export type Post = {
  id: number
  content?: string
  createdAt: Date
  userId: number
  likesCount: number
  isLiked: boolean
  likes: like[]
  user: {
    id: number
    login: string
    name: string
    avatar: string
  }
}

export type User = {
  id: number;
  name: string;
  email: string;
  login: string;
  avatar?: string | null;
  avatarPublicId?: string | null;
  bio: string;
  _count: {
    followers: number;
    following: number;
  }
};

