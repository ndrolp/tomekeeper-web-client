import { BooksGrid } from "../components/BooksGrid";

export const BooksHome = () => {
  return (
    <div className="flex w-full">
      <BooksGrid />
      <aside className="w-full border-l ml-4 bg-background md:w-[340px]"></aside>
    </div>
  );
};
