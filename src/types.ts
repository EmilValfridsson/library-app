export interface Article {
  id: string;
  title: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
  type: string;
  isBorrowable: boolean;
  category: Category;
  categoryId: string;
  borrower: string | null;
  borrowDate: number | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  isAdmin: boolean;
}

export interface UserRegister {
  name: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface SortCriteria {
  key: string;
  order: "asc" | "desc";
}
export interface TextColumn {
  label: string;
  key: string;
}
