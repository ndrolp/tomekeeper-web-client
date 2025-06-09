import type { Book } from "../types/Book";
import { BookCover } from "./BookCover";

export const BookListItem = ({ book }: { book: Book }) => {
  return (
    <div className="border flex p-2 rounded-lg gap-3 items-center">
      <div className="w-15">
        <BookCover placeholderImageSize={20} roundedType="rounded-lg" />
      </div>
      <div className="h-full ">
        <p className="mb-1">{book.title}</p>
        <p className="opacity-50">{book.author ?? <br />}</p>
        <p className="opacity-30 text-xs">
          {book.seriesOrder ? `#${book.seriesOrder}` : " "}{" "}
          {book.series ?? <br />}
        </p>
      </div>
      <div></div>
    </div>
  );
};
