import { api } from '@/common/libs/api'
import type { BooksDataSource } from './BooksDatasource'
import type { Book, BookCreationDTO, BookFilterDTO } from '../types/Book'

export class BooksApiDataSource implements BooksDataSource {
    static async getBooks({ query = '', sort = '' }): Promise<Book[]> {
        const data = await api.get<Book[]>(
            `/books/?query=${query}&sort=${sort}`
        )
        return data.data
    }

    static async registerBook(book: BookCreationDTO): Promise<Book> {
        const data = await api.post<Book>('/books/', book)
        return data.data
    }

    static async getBookDetails(id: string): Promise<Book> {
        const data = await api.get<Book>(`/books/${id}`)
        return data.data
    }

    static async getBooksFilters(): Promise<BookFilterDTO> {
        const data = await api.get<BookFilterDTO>('/books/extras/filters')
        return data.data
    }

    static async deleteBook(id: number) {
        const data = await api.delete(`/books/delete/${id}`)
        return data.data
    }
}
