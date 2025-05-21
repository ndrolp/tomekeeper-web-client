import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image } from "lucide-react";
import type { Book } from "../types/Book";

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <Card className="p-0 gap-0 overflow-hidden cursor-pointer">
      <CardHeader className="p-0 m-0 mb-0 gap-0">
        <AspectRatio className="bg-muted rounded-t-lg" ratio={2 / 3}>
          <div className="h-full w-full grid place-items-center">
            <Image size={64} className="text-gray-400 opacity-30" />
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-2 border-t flex-column h-full">
        <p className="text-lg">{book.title}</p>
        <p className="text-gray-500 text-sm">{book.author}</p>
        <p className="text-xs text-gray-500 mt-2">{book.series}</p>
      </CardContent>
      <CardFooter className="p-0 px-2 pb-2">
        <div className="flex w-full justify-between mt-2 items-center pr-1">
          <Badge variant="outline" className="text-gray-500">
            No Leido
          </Badge>
          <p className="text-xs text-gray-500">{book.language}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
