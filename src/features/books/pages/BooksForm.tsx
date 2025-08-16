import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Book, Library, RotateCcw } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { useNavigate } from 'react-router'
import { OpenLibrarySearch } from '@/features/openlibrary/components/OpenLibrarySearch'
import { useState } from 'react'
import type { WorkData } from '@/features/openlibrary/types/OpenLibraryTypes'
import { useBookFormHandler } from '../libs/useBookFormHandler'

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
    const bookForm = useBookFormHandler()


    function searchOpenLibraryCallback(data: WorkData, authors: string = "") {
        console.log({ data })
        setSearchLibraryOpen(false)
        bookForm.setFieldValue("book.description", data?.description ?? "")
        bookForm.setFieldValue("book.title", data?.title ?? "")
        bookForm.setFieldValue("book.genre", data?.subjects?.join(", ") || "")
        bookForm.setFieldValue("book.author", authors)
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
                        toggle={setSearchLibraryOpen}
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
            <form className="space-y-4 space-x-2">
                <Card className="p-x-0 p-y-1 bg-background space-y-1">
                    <CardTitle className="px-5 border-b pb-3">
                        <h2>Author & Title</h2>
                    </CardTitle>
                    <CardContent className="space-y-2 flex  flex-wrap">
                        <div className="flex flex-col w-full md:flex-1 p-1 flex-wrap gap-3">
                            <bookForm.AppField
                                name="book.title"
                                children={
                                    (field) => <field.TextField label='Book Title' placeholder='Book Title' />
                                }
                            />
                            <bookForm.AppField
                                name="book.author"
                                children={
                                    (field) => <field.TextField label='Book Authors (", " separated)' placeholder='Book Authors' />
                                }
                            />
                        </div>
                        <div className="flex flex-col w-full md:flex-1 p-1 gap-3">
                            <bookForm.AppField
                                name="book.genre"
                                children={
                                    (field) => <field.TextField label='Book Genre (", " separated)' placeholder='Book Genre' />
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card className="p-1 bg-background gap-2 px-2">
                    <CardTitle className="px-5 py-2 border-b pb-3">
                        <h2>Description</h2>
                    </CardTitle>
                    <CardContent className="space-y-2 flex-col gap-2 p-2">
                        <bookForm.AppField
                            name='book.description'
                            children={
                                field => <field.TextAreaField label='Description' placeholder='Description' className='h-50' />
                            }
                        />
                    </CardContent>
                </Card>
                <Submit />
            </form>
        </div>
    )
}
