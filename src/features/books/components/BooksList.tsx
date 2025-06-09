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
    <div className="flex flex-col gap-2">
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
