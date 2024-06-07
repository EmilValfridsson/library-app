import { Articles } from "../types";

const articles: Articles[] = [
  {
    title: "Becoming",
    runTimeMinutes: 1140,
    type: "Audiobook",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Harry Potter och Fenixorden",
    runTimeMinutes: 1530,
    type: "Audiobook",
    isBorrowable: true,
    categoryId: 2,
  },
  {
    title: "Den gamla mannen och havet",
    author: "Ernest Hemingway",
    nbrPages: 127,
    type: "Book",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Brott och straff",
    author: "Fjodor Dostojevskij",
    nbrPages: 671,
    type: "Book",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "Encyclopedia Britannica",
    author: "Diverse",
    nbrPages: 32640,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: 1,
  },
  {
    title: "Nationalencyklopedin",
    author: "Diverse",
    nbrPages: 19000,
    type: "Uppslagsbok",
    isBorrowable: false,
    categoryId: 2,
  },
  {
    title: "The Shawshank Redemption",
    runTimeMinutes: 142,
    type: "DVD",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "The Matrix",
    runTimeMinutes: 136,
    type: "DVD",
    isBorrowable: true,
    categoryId: 3,
  },
];

export function getArticles() {
  return articles;
}
