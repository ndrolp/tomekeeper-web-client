import { NOT_IMPLEMENTED_ERROR } from '@/common/types/errors'
import type { Book, BookFilterDTO } from '../types/Book'
import type { BooksDataSource } from './BooksDatasource'

export class BooksInternalDataSource implements BooksDataSource {
    static async getBooks(): Promise<Book[]> {
        throw new Error('Not implemented')
    }

    static async registerBook(book: Book): Promise<Book> {
        void book
        throw NOT_IMPLEMENTED_ERROR
    }

    static async getBookDetails(id: string): Promise<Book> {
        void id
        throw NOT_IMPLEMENTED_ERROR
    }

    static async getBooksFilters(): Promise<BookFilterDTO> {
        throw NOT_IMPLEMENTED_ERROR
    }

    static async deleteBook(id: number): Promise<void> {
        void id
        throw NOT_IMPLEMENTED_ERROR
    }
}
