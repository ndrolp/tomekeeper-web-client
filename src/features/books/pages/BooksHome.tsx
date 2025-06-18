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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BookForm } from "../components/BookForm";
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
import { useEffect, useState } from "react";
import { BooksQueries, BooksQueryKeys } from "../queries/BooksQueries";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ViewTypes = "grid" | "list";
const ALLOWED_SORT_TYPES: GetBooksSortOptions[] = ["title", "series", "author"];

export const BooksHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  const query = useQuery(
    BooksQueries.booksListQueryOptions({
      query: debouncedQuery,
      sortMethod: sort,
    }),
  );

  const filters = useQuery(BooksQueries.bookFiltersQueryOptions());

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
    <div className="flex w-full relative bg-background">
      <div className="w-full ">
        <div className="mb-3 flex w-full gap-2 flex-wrap lg:flex-nowrap items-center justify-between  py-4 md:py-3 top-0 sticky z-50 bg-background/90 backdrop-blur-2xl px-4 border-b shadow-2xl md:shadow-none">
          <div className="flex items-center gap-4 w-full mb-1 md:mb-0 pb-3 md:border-none md:pb-0">
            <p className="text-xl font-bold">Your Library</p>
            <div className="flex gap-2 ml-auto md:ml-0">
              <BookForm>
                <Button variant="outline">
                  <BookPlus />
                </Button>
              </BookForm>
              <Button
                onClick={() => {
                  queryClient.refetchQueries({
                    queryKey: [BooksQueryKeys.Books],
                  });
                }}
                variant="outline"
              >
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
            <BooksGrid
              books={query.data}
              loading={query.isFetching || query.isPending}
            />
          ) : (
            <BooksList
              books={query.data}
              loading={query.isPending || query.isFetching}
            />
          )}
          {query.data?.length === 0 && !query.isPending ? (
            <div className="m-auto p-20 grid place-items-center text-5xl opacity-10">
              <p className="mt-0 text-center uppercase font-bold">
                There's Nothing to see here
              </p>
            </div>
          ) : null}
        </div>
      </div>
      <aside className=" hidden w-full border-l bg-background px-0 md:block md:w-[340px] relative top-0 z-50">
        <div className="top-0 sticky  z-50 bg-background">
          <p className="text-lg font-bold  border-b p-4 pb-4">Filters</p>
          <div className="p-4 space-y-4">
            <p className="text-lg mb-2 text-start font-bold">Genres</p>
            <div className="space-y-2">
              {filters.data?.genres.map((genre, index) => (
                <div className="flex gap-2">
                  <Checkbox id={`genre-${genre}`} key={index}></Checkbox>
                  <Label>{genre}</Label>
                </div>
              ))}
            </div>
            <p className="text-lg mb-2 text-start font-bold">Author</p>
            <div className="space-y-2">
              {filters.data?.authors.map((author, index) => (
                <div className="flex gap-2">
                  <Checkbox id={`genre-${author}`} key={index}></Checkbox>
                  <Label>{author}</Label>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
};
