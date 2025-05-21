import type { Book } from "../types/Book";
import { BooksApiDataSource } from "./BooksApiDatasource";
import { BooksInternalDataSource } from "./BooksInternalDatasource";

export abstract class BooksDataSource {
  static async getBooks(): Promise<Book[]> {
    throw new Error("Not implemented");
  }
}

export function getBooksDataSource(): typeof BooksDataSource {
  const DATASOURCE_TO_USE = "API";
  const dataSource: typeof BooksDataSource =
    DATASOURCE_TO_USE === "API" ? BooksApiDataSource : BooksInternalDataSource;
  return dataSource;
}
