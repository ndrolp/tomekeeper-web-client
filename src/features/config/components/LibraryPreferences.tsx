import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import {
    BookProviderContext,
    type ViewTypes,
} from '@/features/books/providers/BookProvider'
import { Select, SelectValue } from '@radix-ui/react-select'
import { Library, Save } from 'lucide-react'
import { useContext, useState } from 'react'

export default function LibraryPreferences() {
    const BooksContext = useContext(BookProviderContext)

    const [viewType, setViewType] = useState(
        () => BooksContext.orderingAndView.viewType ?? 'grid'
    )

    return (
        <div>
            <Card className="bg-transparent">
                <CardHeader>
                    <div className="flex w-full">
                        <div className="w-full">
                            <h2 className="text-2xl flex gap-2 items-center">
                                <Library />
                                Library Preferences
                            </h2>
                            <span>
                                Configure how your library is organized and
                                displayed
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full gap-4">
                        <div className="w-full gap-2 flex flex-col">
                            <span>Default Book View</span>
                            <Select
                                value={viewType}
                                onValueChange={(value) => {
                                    setViewType(value as ViewTypes)
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="list">List</SelectItem>
                                    <SelectItem value="grid">Grid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full gap-2 flex flex-col">
                            <span>Default Sort Order</span>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">
                                        System
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="items-end">
                    <Button
                        variant="secondary"
                        className="ml-auto"
                        onClick={() => {
                            BooksContext.setViewType(viewType)
                        }}
                    >
                        Save Library Preferences
                        <Save />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
