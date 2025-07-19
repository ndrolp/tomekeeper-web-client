import { NOT_IMPLEMENTED_ERROR } from '@/common/types/errors'
import type { Book, BookFilterDTO } from '../types/Book'
import { BooksApiDataSource } from './BooksApiDatasource'
import { BooksInternalDataSource } from './BooksInternalDatasource'

export type GetBooksSortOptions = 'title' | 'author' | 'series'

export interface GetBooksOptions {
    query?: string
    sort?: GetBooksSortOptions
}

export abstract class BooksDataSource {
    static async getBooks(options: GetBooksOptions): Promise<Book[]> {
        void options
        throw NOT_IMPLEMENTED_ERROR
    }

    static async registerBook(book: Book): Promise<Book> {
        void book
        throw NOT_IMPLEMENTED_ERROR
    }

    static async getBookDetails(id: number | string): Promise<Book> {
        void id
        throw NOT_IMPLEMENTED_ERROR
    }

    static async getBooksFilters(): Promise<BookFilterDTO> {
        throw NOT_IMPLEMENTED_ERROR
    }

    static async deleteBook(id: number) {
        void id
        throw NOT_IMPLEMENTED_ERROR
    }
}

export function getBooksDataSource(): typeof BooksDataSource {
    const DATASOURCE_TO_USE = 'API'
    const dataSource: typeof BooksDataSource =
        DATASOURCE_TO_USE === 'API'
            ? BooksApiDataSource
            : BooksInternalDataSource
    return dataSource
}
