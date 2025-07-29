import { NOT_IMPLEMENTED_ERROR } from '@/common/types/errors'
import { OpenLibraryAPIDataSource } from './OpenLibraryAPIDataSource'
import { OpenLibraryInternalDataSource } from './OpenLibraryInternalDataSource'
import type { SearchBookData, WorkData } from '../types/OpenLibraryTypes'

export abstract class OpenLibraryDataSource {
    static async searchBooksByTitle({
        title,
        lang = 'en',
    }: {
        title: string
        lang?: string
    }): Promise<SearchBookData> {
        void title
        void lang

        throw NOT_IMPLEMENTED_ERROR
    }

    static async getKeyDetails(key: string): Promise<WorkData> {
        void key
        throw NOT_IMPLEMENTED_ERROR
    }
}

export function getOpenLibraryDataSource(): typeof OpenLibraryDataSource {
    const DATASOURCE_TO_USE = 'API'

    const dataSource: typeof OpenLibraryDataSource =
        DATASOURCE_TO_USE === 'API'
            ? OpenLibraryAPIDataSource
            : OpenLibraryInternalDataSource

    return dataSource
}
