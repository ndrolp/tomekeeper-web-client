import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './router.tsx'
import { ThemeProvider } from './common/providers/ThemeProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BookProvider } from './features/books/providers/BookProvider.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <div className="frappe">
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <BookProvider>
                    <RouterProvider router={router} />
                </BookProvider>
            </QueryClientProvider>
        </ThemeProvider>
    </div>
)
