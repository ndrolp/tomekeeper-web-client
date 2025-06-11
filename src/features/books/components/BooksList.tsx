import { type Book } from "@/features/books/types/Book";
import { BookListItem } from "./BookListItem";

export const BooksList = ({
  books = [],
  loading = false,
}: {
  books?: Book[];
  loading: boolean;
}) => {
  return (
    <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
      {!loading ? (
        <>
          {books.map((book, index) => {
            return <BookListItem key={index} book={book} />;
          })}
        </>
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <BookListItem key={i} skeleton />
          ))}
        </>
      )}
    </div>
  );
};
