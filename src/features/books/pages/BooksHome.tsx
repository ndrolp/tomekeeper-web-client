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
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { DataSource } from "@/common/data/Datasource";
import { BookForm } from "../components/BookForm";
import { useEffect, useState } from "react";
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
import type { GetBooksSortOptions } from "../data/BooksDatasource";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router";

type ViewTypes = "grid" | "list";
const ALLOWED_SORT_TYPES: GetBooksSortOptions[] = ["title", "series", "author"];

export const BooksHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewType, setViewType] = useState<ViewTypes>("list");
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("query") ?? "",
  );
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [sort, setSort] = useState<GetBooksSortOptions>(
    ALLOWED_SORT_TYPES.includes(
      (searchParams.get("sort") as GetBooksSortOptions) ?? "title",
    )
      ? ((searchParams.get("sort") as GetBooksSortOptions) ?? "title")
      : "title",
  );

  const query = useQuery({
    queryKey: ["books", { deb: debouncedQuery, sort }],
    queryFn: async () =>
      await DataSource.Books.getBooks({
        query: debouncedQuery,
        sort: sort,
      }),
  });

  useEffect(() => {
    const initialParams = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) searchParams.set("query", debouncedQuery);
    if (sort !== searchParams.get("sort") && sort !== "title") {
      searchParams.set("sort", sort);
    }

    const areParamsEqual = initialParams.toString() === searchParams.toString();

    if (!areParamsEqual && (sort || debouncedQuery))
      setSearchParams(searchParams);
  }, [debouncedQuery, sort]);

  useEffect(() => {
    if (sort !== searchParams.get("sort"))
      setSort((searchParams.get("sort") as GetBooksSortOptions) ?? "title");

    if (debouncedQuery !== searchParams.get("query")) {
      setSearchQuery(searchParams.get("query") ?? "");
    }
  }, [searchParams]);

  return (
    <div className="flex w-full relative">
      <div className="w-full ">
        <div className="mb-3 flex w-full gap-2 flex-wrap lg:flex-nowrap items-center justify-between  py-4 md:py-1 top-0 sticky z-10 bg-background/94 backdrop-blur-2xl px-4">
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
          <div className="flex-row align-end md:w-fit flex flex-wrap lg:flex-nowrap items-center gap-2 w-full">
            <ToggleGroup
              value={viewType}
              type="single"
              variant="outline"
              onValueChange={(value) => {
                if (value) setViewType(value as ViewTypes);
              }}
              className=""
            >
              <ToggleGroupItem value="list" aria-label="Toggle list">
                <List className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="grid" aria-label="Toggle bold">
                <Grid3x3 className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
            <div className="flex items-center flex-1 gap-2">
              <ArrowDownAz className="opacity-40" />
              <Select
                value={sort}
                onValueChange={(value) => {
                  setSort(value as GetBooksSortOptions);
                }}
              >
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
              <DrawerTrigger
                className={`md:hidden ${buttonVariants({ variant: "outline" })}`}
              >
                <Funnel size={17} />
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
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            type="search"
            className="w-full mt-1 md:mt-0 "
            placeholder="Filter by title, author, or ISBN..."
          />
        </div>
        <div className="z-0 px-4">
          {viewType === "grid" ? (
            <BooksGrid books={query.data} loading={query.isPending} />
          ) : (
            <BooksList books={query.data} loading={query.isPending} />
          )}
        </div>
      </div>
      <aside className="ml-4 hidden w-full border-l bg-background px-4 md:block md:w-[340px] sticky top-0 right-0 ">
        <p className="text-lg font-bold">Filters</p>
        <div></div>
      </aside>
    </div>
  );
};
