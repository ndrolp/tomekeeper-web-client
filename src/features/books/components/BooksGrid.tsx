import { type Book } from "@/features/books/types/Book";
import { BookCard } from "./BookCard";

export const BooksGrid = ({
  books = [],
  loading = false,
}: {
  books?: Book[];
  loading?: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-4 w-full">
      {!loading ? (
        <>
          {books.map((book, index) => {
            return <BookCard key={index} book={book} />;
          })}
        </>
      ) : (
        <>
          {Array.from({ length: 12 }).map((_, i) => (
            <BookCard
              book={{ title: "skeleton" }}
              key={`skeleton-${i}`}
              skeleton
            />
          ))}
        </>
      )}
    </div>
  );
};
