import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Image } from "lucide-react";

export const BookCard = () => {
  return (
    <Card className="p-0 gap-0 overflow-hidden cursor-pointer">
      <CardHeader className="p-0 m-0 mb-0 gap-0">
        <AspectRatio className="bg-muted rounded-t-lg" ratio={2 / 3}>
          <div className="h-full w-full grid place-items-center">
            <Image size={64} className="text-gray-400 opacity-30" />
          </div>
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-2 border-t">
        <p className="text-lg">El imperio final</p>
        <p className="text-gray-500 text-sm">Brandon Sanderson</p>
        <p className="text-xs text-gray-500">Mistborn</p>
        <div className="flex w-full justify-between mt-2">
          <Badge variant="outline" className="text-gray-500">
            No Leido
          </Badge>
          <p className="text-xs text-gray-500">Español</p>
        </div>
      </CardContent>
    </Card>
  );
};
