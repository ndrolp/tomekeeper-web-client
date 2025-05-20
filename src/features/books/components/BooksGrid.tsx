import { BookCard } from "./BookCard";

export const BooksGrid = () => {
  return (
    <div className="grid grid-cols-7 gap-4 w-full">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
};
