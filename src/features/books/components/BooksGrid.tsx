import { BookCard } from "./BookCard";

export const BooksGrid = () => {
  return (
    <div className="grid grid-cols-6 gap-4 w-full">
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
