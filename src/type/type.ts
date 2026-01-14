
export type Post = {
  id: number;
  idUser?: number;
  title?: string;
  content?: string;
  date: Date;
  createdAt: Date;
  userId: number;
  user: {
    id: string;
    login: string;
    name: string
  }
};

export type User = {
  id: string;
  name?: string | null;
  email: string;
  login: string;
  image: string | null;
};

