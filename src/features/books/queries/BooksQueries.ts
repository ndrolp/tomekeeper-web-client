import { DataSource } from "@/common/data/Datasource";
import { queryOptions } from "@tanstack/react-query";
import type { GetBooksSortOptions } from "../data/BooksDatasource";

export const BooksQueryKeys = {
  Books: "books",
  BookDetails: "book-details",
};

export class BooksQueries {
  static booksListQueryOptions({
    query,
    sortMethod,
  }: {
    query: string;
    sortMethod: GetBooksSortOptions;
  }) {
    return queryOptions({
      queryKey: [BooksQueryKeys.Books, { query, sortMethod }],
      queryFn: async () =>
        await DataSource.Books.getBooks({ query: query, sort: sortMethod }),
    });
  }

  static bookDetailQueryOptions({ id }: { id: string }) {
    return queryOptions({
      queryKey: [BooksQueryKeys.BookDetails, id],
      queryFn: async () => await DataSource.Books.getBookDetails(id),
      enabled: !!id,
    });
  }
}
