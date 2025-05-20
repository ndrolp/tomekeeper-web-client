import { Card, CardContent, CardHeader } from "@/components/ui/card";
import placeholder from "@/assets/images/placeholder.svg";

export const BookCard = () => {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="p-0 m-0 mb-0 gap-0">
        <img
          className="rounded-t-lg"
          style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover" }}
          src={placeholder}
        />
      </CardHeader>
      <CardContent className="p-2 border-t">
        <p className="text-lg">El imperio final</p>
        <p className="text-gray-500 text-sm">Brandon Sanderson</p>
        <p className="text-xs text-gray-500">Mistborn</p>
      </CardContent>
    </Card>
  );
};
