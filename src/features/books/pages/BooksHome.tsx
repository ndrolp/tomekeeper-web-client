//@ts-check
import { ArrowDownAz, Barcode, BookPlus, Grid3x3, List } from "lucide-react";
import { BooksGrid } from "../components/BooksGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { DataSource } from "@/common/data/Datasource";
import { BookForm } from "../components/BookForm";
import { useState } from "react";
import { BooksList } from "../components/BooksList";

type ViewTypes = "grid" | "list";

export const BooksHome = () => {
  const [viewType, setViewType] = useState<ViewTypes>("grid");

  const query = useQuery({
    queryKey: ["books"],
    queryFn: DataSource.Books.getBooks,
  });

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="mb-4 flex w-full gap-2 flex-wrap lg:flex-nowrap items-center justify-between">
          <div className="flex items-center gap-4 md:w-full">
            <p className="text-xl font-bold">Your Library</p>
            <div className="flex gap-2">
              <BookForm>
                <Button variant="outline">
                  <BookPlus />
                </Button>
              </BookForm>
              <Button variant="outline">
                <Barcode />
              </Button>
            </div>
          </div>
          <div className="flex-row align-end w-fit flex flex-wrap lg:flex-nowrap items-center gap-2 ">
            <ToggleGroup
              value={viewType}
              type="single"
              variant="outline"
              onValueChange={(value) => {
                if (value) setViewType(value as ViewTypes);
              }}
              className=""
            >
              <ToggleGroupItem value="grid" aria-label="Toggle bold">
                <Grid3x3 className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="Toggle list">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <ArrowDownAz className="text-gray-600" />
            <Select value="title">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
                <SelectItem value="series">Series</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            className="w-full "
            placeholder="Filter by title, author, or ISBN..."
          />
        </div>
        {viewType === "grid" ? (
          <BooksGrid books={query.data} />
        ) : (
          <BooksList books={query.data} />
        )}
      </div>
      <aside className="ml-4 hidden w-full border-l bg-background px-4 sticky md:block md:w-[340px]">
        <p className="text-lg font-bold">Filters</p>
        <div></div>
      </aside>
    </div>
  );
};
