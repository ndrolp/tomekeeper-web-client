import { api } from "@/common/libs/api";
import type { BooksDataSource } from "./BooksDatasource";
import type { Book, BookCreationDTO } from "../types/Book";

export class BooksApiDataSource implements BooksDataSource {
  static async getBooks({ query = "", sort = "" }): Promise<Book[]> {
    const data = await api.get<Book[]>(`/books/?query=${query}&sort=${sort}`);
    return data.data;
  }

  static async registerBook(book: BookCreationDTO): Promise<Book> {
    const data = await api.post<Book>("/books/", book);
    return data.data;
  }

  static async getBookDetails(id: string): Promise<Book> {
    const data = await api.get<Book>(`/books/${id}`);
    return data.data;
  }
}
