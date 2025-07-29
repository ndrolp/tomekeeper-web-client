import { api } from '@/common/libs/api'
import type { OpenLibraryDataSource } from './OpenLibraryDataSource'
import type { SearchBookData } from '../types/OpenLibraryTypes'

export class OpenLibraryAPIDataSource implements OpenLibraryDataSource {
    static async searchBooksByTitle({
        title,
        lang = 'en',
    }: {
        title: string
        lang?: string
    }): Promise<SearchBookData> {
        const data = await api.get(
            `/openlibrary/searchbook?title=${title}&lang=${lang}`
        )
        return data.data
    }

    static async getKeyDetails(key: string): Promise<void> {
        const data = await api.get(`/openlibrary/keydetails?key=${key}`)
        return data.data
    }
}
