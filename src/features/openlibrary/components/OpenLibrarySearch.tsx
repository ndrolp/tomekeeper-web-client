import { DataSource } from '@/common/data/Datasource'
import { Button } from '@/components/ui/button'
import {
    DialogTitle,
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Book, User } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'
import type { SearchBookData, WorkData } from '../types/OpenLibraryTypes'

interface OpeLibrarySearchProps {
    child: React.JSX.Element
    callback: (element: WorkData, author: string) => void
    open: boolean
    toggle: (value: boolean) => void
}

export const OpenLibrarySearch = ({
    child,
    open = false,
    callback,
    toggle,
}: OpeLibrarySearchProps) => {
    const [title, setTitle] = useState('')
    const [debouncedQuery] = useDebounce(title, 300)
    const [searchData, setSearchData] = useState<SearchBookData | null>(null)
    const [fetching, setFetching] = useState(false)
    const [fetchingBookData, setFetchingBookData] = useState(false)

    const searchBooks = useCallback(async () => {
        setFetching(true)
        const data = await DataSource.OpenLibrary.searchBooksByTitle({
            title: debouncedQuery,
        })
        setSearchData(data)
        setFetching(false)
    }, [debouncedQuery])

    async function searchBookData(key: string, author: string = "") {
        setFetchingBookData(true)
        const data = await DataSource.OpenLibrary.getKeyDetails(
            key.replace('/works', '')
        )
        if (callback) callback(data, author)
        setSearchData(null)
        setTitle('')
        setFetchingBookData(false)
    }

    return (
        <Dialog open={open} >
            <DialogTrigger asChild>{child}</DialogTrigger>
            <DialogContent className="[&>button]:hidden">
                <DialogTitle>Search book on openlibrary</DialogTitle>
                {searchData ? (
                    <div className="grid md:grid-cols-2 p-2 md:p-0 gap-2 max-h-80 overflow-auto">
                        {searchData?.docs?.map((item, index) => {
                            return (
                                <div
                                    role="button"
                                    className="border flex p-1 rounded-lg gap-1 flex-col hover:bg-accent cursor-pointer"
                                    tabIndex={index}
                                    key={index}
                                    onClick={() => {
                                        searchBookData(item.key, item.author_name.join(", "))
                                    }}
                                >
                                    <div className="flex gap-2">
                                        {item.key.startsWith('/work') ? (
                                            <Book />
                                        ) : (
                                            ''
                                        )}
                                        <p>{item.title}</p>
                                    </div>
                                    <div>
                                        <div className="flex gap-2">
                                            <User />
                                            <p>
                                                {item.author_name?.join(', ') ||
                                                    ''}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) || null}
                    </div>
                ) : (
                    <>
                        <Label className="mb-2">Book Title</Label>
                        <Input
                            placeholder="Book Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </>
                )}
                <DialogFooter>
                    <div className="w-full flex items-center">
                        {fetching || fetchingBookData ? (
                            <span className="mr-auto text-primary">
                                Loading
                            </span>
                        ) : null}
                        {searchData ? (
                            <Button
                                className="ml-auto"
                                onClick={() => {
                                    setSearchData(null)
                                }}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="ml-auto"
                                    variant="outline"
                                    disabled={fetching}
                                    onClick={() => {
                                        setTitle('')
                                        toggle(false)
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="ml-1"
                                    variant="outline"
                                    disabled={fetching}
                                    onClick={() => searchBooks()}
                                >
                                    Search
                                </Button>
                            </>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
