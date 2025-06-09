import { getBooksDataSource } from "@/features/books/data/BooksDatasource";
import { getExtrasDataSource } from "@/features/extras/data/ExtrasDatasource";

export const DataSource = {
  Books: getBooksDataSource(),
  Extras: getExtrasDataSource(),
};
