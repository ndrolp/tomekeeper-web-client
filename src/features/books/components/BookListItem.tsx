import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Book } from "../types/Book";
import { BookCover } from "./BookCover";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router";
import { useCallback } from "react";

export const BookListItem = ({
  book,
  skeleton = false,
}: {
  book?: Book;
  skeleton?: boolean;
}) => {
  const navigate = useNavigate();
  const viewBook = useCallback(() => {
    navigate("/books/view/" + book?.id);
  }, [book]);

  if (skeleton) {
    return (
      <div className="border flex p-2 rounded-lg gap-3 items-center">
        <div className="w-15">
          <Skeleton className="h-20 w-15 rounded-lg" />
        </div>
        <div className="h-full flex flex-col justify-center flex-grow gap-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-36 opacity-50" />
          <Skeleton className="h-3 w-20 opacity-30" />
        </div>
        <div className="ml-auto flex flex-col self-start">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="border flex p-2 rounded-lg gap-3 items-center shadow transition-transform transform hover:scale-102 hover:shadow-2xl">
      <div onClick={viewBook} className="w-15 rounded-lg">
        <BookCover
          placeholderImageSize={20}
          roundedType="rounded-lg"
          coverUrl={book?.externalCoverUrl}
        />
      </div>
      <div className="h-full ">
        <Button
          onClick={viewBook}
          variant="link"
          className="border-none primary-foreground text-md p-0"
        >
          <p className="mb-1 text-foreground hover:text-primary focus:text-primary">
            {book?.title}
          </p>
        </Button>
        <p className="opacity-50">{book?.author ?? <br />}</p>
        <p className="opacity-30 text-xs">
          {book?.seriesOrder ? `#${book.seriesOrder}` : " "}{" "}
          {book?.series ?? <br />}
        </p>
      </div>
      <div className="ml-auto flex flex-col self-start">
        <Button
          variant="ghost"
          className="hover:text-destructive active:text-destructive"
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
