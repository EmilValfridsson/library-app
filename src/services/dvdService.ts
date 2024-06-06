const dvd = [
  {
    title: "The Godfather",
    runTimeMinutes: 175,
    type: "Drama",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "The Dark Knight",
    runTimeMinutes: 152,
    type: "Action",
    isBorrowable: true,
    categoryId: 2,
  },
  {
    title: "Inception",
    runTimeMinutes: 148,
    type: "Science Fiction",
    isBorrowable: true,
    categoryId: 3,
  },
  {
    title: "Frozen",
    runTimeMinutes: 102,
    type: "Animation",
    isBorrowable: false,
    categoryId: 4,
  },
  {
    title: "The Shawshank Redemption",
    runTimeMinutes: 142,
    type: "Drama",
    isBorrowable: true,
    categoryId: 1,
  },
  {
    title: "The Matrix",
    runTimeMinutes: 136,
    type: "Science Fiction",
    isBorrowable: true,
    categoryId: 3,
  },
];

export function getDvds() {
  return dvd;
}
