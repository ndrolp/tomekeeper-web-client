import { type Book } from "@/features/books/types/Book";
import { BookCard } from "./BookCard";

export const BooksGrid = ({ books = [] }: { books?: Book[] }) => {
  return (
    <div className="grid grid-cols-6 gap-4 w-full">
      {books.map((book, index) => {
        return <BookCard key={index} book={book} />;
      })}
    </div>
  );
};
