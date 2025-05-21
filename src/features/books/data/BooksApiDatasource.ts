import { api } from "@/common/libs/api";
import type { BooksDataSource } from "./BooksDatasource";
import type { Book } from "../types/Book";

export class BooksApiDataSource implements BooksDataSource {
  static async getBooks(): Promise<Book[]> {
    const data = await api.get<Book[]>("/books/");
    return data.data;
  }
}
