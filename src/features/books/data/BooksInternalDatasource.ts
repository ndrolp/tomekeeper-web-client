import { NOT_IMPLEMENTED_ERROR } from "@/common/types/errors";
import type { Book } from "../types/Book";
import type { BooksDataSource } from "./BooksDatasource";

export class BooksInternalDataSource implements BooksDataSource {
  static async getBooks(): Promise<Book[]> {
    throw new Error("Not implemented");
  }

  static async registerBook(book: Book): Promise<Book> {
    console.log(book);
    throw NOT_IMPLEMENTED_ERROR;
  }
}
