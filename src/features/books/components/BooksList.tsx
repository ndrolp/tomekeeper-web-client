import { type Book } from "@/features/books/types/Book";
import { BookListItem } from "./BookListItem";

export const BooksList = ({ books = [] }: { books?: Book[] }) => {
  return (
    <div className="flex flex-col gap-2">
      {books.map((book, index) => {
        return <BookListItem key={index} book={book} />;
      })}
    </div>
  );
};
