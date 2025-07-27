import { createBrowserRouter } from 'react-router'
import { BaseLayout } from './common/layout/BaseLayout'
import { BooksHome } from './features/books/pages/BooksHome'
import BookPage from './features/books/pages/BookPage'
import { ConfigPage } from './features/config/pages/ConfigPage'
import Dashboard from './features/dashboard/pages/Dashboard'
import { BooksForm } from './features/books/pages/BooksForm'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            {
                path: 'books',
                children: [
                    { index: true, element: <BooksHome /> },
                    {path:'create', element: <BooksForm />},
                    { path: 'view/:id', element: <BookPage /> },
                ],
            },
            {
                path: 'config',
                children: [{ index: true, element: <ConfigPage /> }],
            },
        ],
    },
])
