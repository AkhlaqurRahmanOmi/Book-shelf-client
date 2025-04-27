export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  genre?: string;
  publishedYear?: number;
  rating?: number;
  isRead: boolean;
  dateAdded: string | Date;
  updatedAt: string | Date;
  userId: string;
}
