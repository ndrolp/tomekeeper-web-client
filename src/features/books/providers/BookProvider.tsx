import type { GetBooksSortOptions } from '../data/BooksDatasource'
import { useState, createContext } from 'react'

export type ViewTypes = 'grid' | 'list'

export type BookProviderProps = {
    children: React.ReactNode
}

type OrderAndView = { viewType: ViewTypes; sortOrder: GetBooksSortOptions }

export type BookProviderState = {
    orderingAndView: OrderAndView
    setSortOrder: (order: GetBooksSortOptions) => void
    setViewType: (viewType: ViewTypes) => void
}

const initialState: BookProviderState = {
    orderingAndView: { sortOrder: 'title', viewType: 'list' },
    setSortOrder: () => {},
    setViewType: () => {},
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookProviderContext =
    createContext<BookProviderState>(initialState)

export function BookProvider({ children }: BookProviderProps) {
    const [orderingAndView, setOrderingAndView] = useState<OrderAndView>(
        () =>
            ({
                sortOrder: localStorage.getItem('sortOrder') || 'title',
                viewType: localStorage.getItem('viewType') || 'grid',
            }) as OrderAndView
    )

    function setSortOrder(order: GetBooksSortOptions) {
        setOrderingAndView({ ...orderingAndView, sortOrder: order })
    }

    function setViewType(viewType: ViewTypes) {
        setOrderingAndView({ ...orderingAndView, viewType: viewType })
    }

    return (
        <BookProviderContext.Provider
            value={{ orderingAndView, setSortOrder, setViewType }}
        >
            {children}
        </BookProviderContext.Provider>
    )
}
