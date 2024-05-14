import { User } from './user.type';

export interface Blog {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date | null;

  user: User;
}

export interface IFormBlog {
  title: string;
  description: string;
  thumbnail: File[];
  content: string;
  userId?: number;
  category: string;
}
