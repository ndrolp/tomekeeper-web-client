import type { Book } from "../types/Book";
import type { BooksDataSource } from "./BooksDatasource";

export class BooksInternalDataSource implements BooksDataSource {
  static async getBooks(): Promise<Book[]> {
    throw new Error("Not implemented");
  }
}
