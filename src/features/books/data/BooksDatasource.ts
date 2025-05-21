import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import type { Book } from "../types/Book";
import { BooksApiDataSource } from "./BooksApiDatasource";
import { BooksInternalDataSource } from "./BooksInternalDatasource";

export abstract class BooksDataSource {
  static async getBooks(): Promise<Book[]> {
    throw NOT_IMPLEMENTED_ERROR;
  }

  static async registerBook(book: Book): Promise<Book> {
    console.log(book);
    throw NOT_IMPLEMENTED_ERROR;
  }
}

export function getBooksDataSource(): typeof BooksDataSource {
  const DATASOURCE_TO_USE = "API";
  const dataSource: typeof BooksDataSource =
    DATASOURCE_TO_USE === "API" ? BooksApiDataSource : BooksInternalDataSource;
  return dataSource;
}
