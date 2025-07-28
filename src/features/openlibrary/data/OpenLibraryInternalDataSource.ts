import { NOT_IMPLEMENTED_ERROR } from '@/common/types/errors'
import type { OpenLibraryAPIDataSource } from './OpenLibraryAPIDataSource'

export class OpenLibraryInternalDataSource implements OpenLibraryAPIDataSource {
    static async searchBooksByTitle({
        title,
        lang,
    }: {
        title: string
        lang?: string
    }): Promise<object> {
        void title
        void lang
        throw NOT_IMPLEMENTED_ERROR
    }

    static async getKeyDetails(key: string): Promise<void> {
        void key
        throw NOT_IMPLEMENTED_ERROR
    }
}
