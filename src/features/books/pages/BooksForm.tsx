import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@radix-ui/react-label'
import { ArrowLeft, Book, Library, RotateCcw } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import type { BookCreationDTO } from '../types/Book'
import { useNavigate } from 'react-router'
import { OpenLibrarySearch } from '@/features/openlibrary/components/OpenLibrarySearch'
import { useState } from 'react'
import type { WorkData } from '@/features/openlibrary/types/OpenLibraryTypes'

function Submit() {
    const status = useFormStatus()
    return (
        <Button type="submit" disabled={status.pending}>
            Submit
        </Button>
    )
}

export const BooksForm = () => {
    const navigate = useNavigate()
    const [searchLibraryOpen, setSearchLibraryOpen] = useState(false)
    async function submit(data: FormData) {
        const formData: BookCreationDTO = {
            title: data.get('bookTitle')?.toString() || '',
            author: data.get('author')?.toString() || '',
            description: data.get('description')?.toString() || '',
        }
        console.log(formData)
    }

    function searchOpenLibraryCallback(data: WorkData) {
        console.log({ data })
        setSearchLibraryOpen(false)
    }

    return (
        <div className="p-2 md:p-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
                <Button variant="outline" onClick={() => navigate('/books')}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-2xl font-bold">Register a book</h1>
                <div className="flex flex-row gap-2 ml-auto mr-2 w-full md:w-fit">
                    <OpenLibrarySearch
                        open={searchLibraryOpen}
                        callback={searchOpenLibraryCallback}
                        child={
                            <Button
                                onClick={() => {
                                    setSearchLibraryOpen(true)
                                }}
                                variant="outline"
                                className="flex-1 md:flex-initial"
                            >
                                <Library /> Use Open Library
                            </Button>
                        }
                    />
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-initial"
                    >
                        <Book />
                        Use Epub
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-initial"
                    >
                        <RotateCcw />
                        Reset
                    </Button>
                </div>
            </div>
            <form action={submit} className="space-y-4 space-x-2">
                <Card className="p-x-0 p-y-1 bg-background space-y-1">
                    <CardTitle className="px-5 border-b pb-3">
                        <h2>Author & Title</h2>
                    </CardTitle>
                    <CardContent className="space-y-2 flex  flex-wrap">
                        <div className="flex flex-col w-full md:flex-1 p-1 flex-wrap gap-1">
                            <Label>Book Name</Label>
                            <Input
                                id="bookTitle"
                                name="bookTitle"
                                placeholder="Book Name"
                                type="string"
                                className="w-full"
                            />
                            <Label>Author</Label>
                            <Input
                                id="author"
                                name="author"
                                type="string"
                                placeholder="Author"
                            />
                        </div>
                        <div className="flex flex-col w-full md:flex-1 p-1 gap-1">
                            <Label>Subjects (space separated)</Label>
                            <Input
                                id="author"
                                name="author"
                                type="string"
                                placeholder="Subjects"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-1 bg-background gap-2 px-2">
                    <CardTitle className="px-5 py-2 border-b pb-3">
                        <h2>Description</h2>
                    </CardTitle>
                    <CardContent className="space-y-2 flex-col gap-2 p-2">
                        <Textarea
                            id="bookDescription"
                            name="bookDescription"
                            className="h-50"
                        />
                    </CardContent>
                </Card>
                <Submit />
            </form>
        </div>
    )
}
