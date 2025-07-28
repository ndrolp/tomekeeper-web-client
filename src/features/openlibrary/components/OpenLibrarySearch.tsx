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
import { DialogDescription } from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from 'use-debounce'

interface OpeLibrarySearchProps {
    child: React.JSX.Element
}

export const OpenLibrarySearch = ({ child }: OpeLibrarySearchProps) => {
    const [title, setTitle] = useState('')
    const [debouncedQuery] = useDebounce(title, 300)

    const {
        refetch: refetchSearch,
        data: searchData,
        isFetching: fetchingSearch,
    } = useQuery({
        queryKey: ['open_api_search', debouncedQuery],
        queryFn: async () =>
            await DataSource.OpenLibrary.searchBooksByTitle({
                title: debouncedQuery,
            }),
        enabled: false,
    })


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>{child}</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Open APi</DialogTitle>
                    {searchData && !fetchingSearch ? (
                        <div className='flex flex-col gap-2'>
                            {searchData?.docs?.map((item) => {
                                const text = `${item.title}${item.author_name ? ` - ${item.author_name.join(" ")}` : ""}`
                                return (
                                    <Button variant="outline" className='w-full justify-start'>
                                        <span className='text-left'>
                                            {text.slice(0, 60)}{text.length > 60 ? "..." : ""}
                                        </span>
                                    </Button>
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
                        <Button onClick={() => refetchSearch()}>Search</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
