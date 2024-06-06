const books = [
  {
    title: "Den gamla mannen och havet",
    author: "Ernest Hemingway",
    nbrPages: 127,
    type: "Roman",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Brott och straff",
    author: "Fjodor Dostojevskij",
    nbrPages: 671,
    type: "Roman",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Sapiens: En kort historik över mänskligheten",
    author: "Yuval Noah Harari",
    nbrPages: 498,
    type: "Facklitteratur",
    isBorrowable: true,
    categoryId: 2,
  },
  {
    title: "Harry Potter och de vises sten",
    author: "J.K. Rowling",
    nbrPages: 309,
    type: "Fantasy",
    isBorrowable: true,
    categoryId: 3,
  },
  {
    title: "Lean Startup",
    author: "Eric Ries",
    nbrPages: 336,
    type: "Företagande",
    isBorrowable: true,
    categoryId: 4,
  },
  {
    title: "Meditationer",
    author: "Marcus Aurelius",
    nbrPages: 254,
    type: "Filosofi",
    isBorrowable: true,
    categoryId: 5,
  },
];

export function getBooks() {
  return books;
}
