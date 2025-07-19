import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton' // <- Import Skeleton
import { BookCover } from './BookCover'
import { useNavigate } from 'react-router'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, EllipsisVertical, Pencil, Trash } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { DropdownMenuGroup } from '@/components/ui/dropdown-menu'
import type { Book } from '../types/Book'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DataSource } from '@/common/data/Datasource'
import { BooksQueries, BooksQueryKeys } from '../queries/BooksQueries'

export const BookCard = ({
    book,
    skeleton = false,
    tabIndex,
}: {
    book: Book
    skeleton?: boolean
    tabIndex?: number
}) => {
    const navigate = useNavigate()
    const viewBook = useCallback(() => {
        navigate('/books/view/' + book?.id)
    }, [book])
    const queryClient = useQueryClient()

    const { mutate: deleteBook } = useMutation({
        mutationFn: DataSource.Books.deleteBook,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [BooksQueryKeys.Books] })
        },
    })

    if (skeleton) {
        return (
            <Card className="p-0 gap-0 overflow-hidden">
                <CardHeader className="p-0 m-0 mb-0 gap-0">
                    <Skeleton className="h-[200px] w-full" />
                </CardHeader>
                <CardContent className="p-2 border-t flex flex-col gap-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/3 mt-2" />
                </CardContent>
                <CardFooter className="p-0 px-2 pb-2">
                    <div className="flex w-full justify-between mt-2 items-center pr-1">
                        <Skeleton className="h-5 w-20 rounded-md" />
                        <Skeleton className="h-3 w-10 rounded" />
                    </div>
                </CardFooter>
            </Card>
        )
    }

    return (
        <Card
            onKeyDown={(e) => {
                if (e.key === 'Enter') viewBook()
            }}
            tabIndex={tabIndex}
            role="button"
            className="p-0 gap-0 overflow-hidden cursor-pointer transition-transform transform outline-primary"
        >
            <CardHeader onClick={viewBook} className="p-0 m-0 mb-0 gap-0">
                <BookCover coverUrl={book.externalCoverUrl} />
            </CardHeader>
            <CardContent className="p-2 border-t flex flex-col h-full">
                <p className="text-lg">{book.title}</p>
                <p className="text-gray-500 text-sm">{book.author}</p>
                <p className="text-xs text-gray-500 mt-2">
                    {book?.seriesOrder ? `#${book.seriesOrder}` : ' '}{' '}
                    {book.series}
                </p>
            </CardContent>
            <CardFooter className="p-0 px-2 pb-2">
                <div className="flex w-full justify-between mt-2 items-center pr-1">
                    <Badge variant="outline" className="text-gray-500">
                        No Leido
                    </Badge>
                    <p className="text-xs text-gray-500">{book.language}</p>
                </div>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="z-99 w-56 border bg-background rounded-lg outline-none"
                            align="start"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild className="flex">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-start text-start"
                                        onClick={() => {
                                            deleteBook(book.id as number)
                                        }}
                                    >
                                        <Trash />
                                        Delete
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild className="flex">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-start text-start"
                                    >
                                        <Pencil />
                                        Edit
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild className="flex">
                                    <Button
                                        variant="ghost"
                                        className="w-full flex justify-start items-start text-start"
                                    >
                                        <BookOpen />
                                        Read
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardFooter>
        </Card>
    )
}
