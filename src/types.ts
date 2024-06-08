export interface Article {
  id: string;
  title: string;
  author?: string;
  nbrpages?: number;
  runtimeminutes?: number;
  type: string;
  isborrowable: boolean;
  category: Category;
  categoryId: string;
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
