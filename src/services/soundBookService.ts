const soundBooks = [
  {
    title: "Becoming",
    runTimeMinutes: 1140,
    type: "Biografi",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Harry Potter och Fenixorden",
    runTimeMinutes: 1530,
    type: "Fantasy",
    isBorrowable: true,
    categoryId: 2,
  },
  {
    title: "Sapiens: En kort historik över mänskligheten",
    runTimeMinutes: 1020,
    type: "Facklitteratur",
    isBorrowable: true,
    categoryId: 3,
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    runTimeMinutes: 420,
    type: "Självhjälp",
    isBorrowable: false,
    categoryId: 4,
  },
  {
    title: "Pride and Prejudice",
    runTimeMinutes: 705,
    type: "Roman",
    isBorrowable: true,
    categoryId: 5,
  },
  {
    title: "Educated",
    runTimeMinutes: 675,
    type: "Biografi",
    isBorrowable: true,
    categoryId: 1,
  },
];

export function getSoundBooks() {
  return soundBooks;
}
