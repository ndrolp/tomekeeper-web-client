import { getBooksDataSource } from '@/features/books/data/BooksDatasource'
import { getExtrasDataSource } from '@/features/extras/data/ExtrasDatasource'
import { getSeriesDataSource } from '@/features/series/data/SeriesDataSource'

export const DataSource = {
    Books: getBooksDataSource(),
    Extras: getExtrasDataSource(),
    Series: getSeriesDataSource(),
}
