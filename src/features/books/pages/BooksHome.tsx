//@ts-check
import {
  ArrowDownAz,
  Barcode,
  BookPlus,
  Funnel,
  Grid3x3,
  List,
} from "lucide-react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
          <div className="flex items-center gap-4 w-full mb-4 md:mb-0 pb-3 md:border-none md:pb-0">
            <p className="text-xl font-bold">Your Library</p>
            <div className="flex gap-2 ml-auto md:ml-0">
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
          <div className="flex-row align-end md:w-fit flex flex-wrap lg:flex-nowrap items-center gap-2 w-full ">
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
            <div className="flex items-center flex-1 gap-2">
              <ArrowDownAz className="text-gray-600" />
              <Select value="title">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="series">Series</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Drawer>
              <DrawerTrigger className="md:hidden">
                <Button variant="outline">
                  <Funnel />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="md:hidden">
                <DrawerHeader>
                  <DrawerTitle>Filters</DrawerTitle>
                  <DrawerDescription>
                    Apply filters to your search
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
          <Input
            className="w-full mt-1 md:mt-0 "
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
