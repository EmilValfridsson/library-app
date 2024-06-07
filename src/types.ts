export interface Articles {
  title: string;
  author?: string;
  nbrPages?: number;
  runTimeMinutes?: number;
  type: string;
  isBorrowable: boolean;
  categoryId: number;
}

export interface Dvd {
  title: string;
  runTimeMinutes: number;
  type: string;
  isBorrowable: boolean;
  categoryId: number;
}
