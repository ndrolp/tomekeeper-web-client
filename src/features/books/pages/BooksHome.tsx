import { ArrowDownAz, BookPlus, Grid3x3, List } from "lucide-react";
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
import useAxios from "@/common/hooks/useAxios";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const BooksHome = () => {
  const axios = useAxios();

  useEffect(() => {
    if (axios)
      axios.get("/books").then((res) => {
        console.table(res.data);
      });
  }, [axios]);

  return (
    <div className="flex w-full">
      <div className="w-full">
        <div className="flex w-full mb-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <p className="text-xl font-bold">Your Library</p>
            <Button variant="outline">
              <BookPlus />
            </Button>
          </div>
          <div className="flex align-end items-center gap-2">
            <Input
              className="w-full"
              placeholder="Filter by title, author, or ISBN..."
            />
            <ToggleGroup
              value={"grid"}
              type="single"
              variant="outline"
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
        </div>
        <BooksGrid />
      </div>
      <aside className="w-full border-l ml-4 bg-background md:w-[340px] px-4">
        <p className="font-bold text-lg">Filters</p>
        <div></div>
      </aside>
    </div>
  );
};
