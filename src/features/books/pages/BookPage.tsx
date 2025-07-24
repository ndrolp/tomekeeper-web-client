import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Hash, User, Calendar, BookOpen, Edit, ArrowLeft } from 'lucide-react'
import { BookCover } from '../components/BookCover'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { BooksQueries } from '../queries/BooksQueries'
import { useTranslation } from 'react-i18next'

export default function BookPage() {
    const { id = '' } = useParams()
    const query = useQuery(BooksQueries.bookDetailQueryOptions({ id }))
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div className="z-0">
            <div className="w-full px-4 flex content-between md:items-center">
                <div className="flex items-center flex-1 gap-4">
                    <Button
                        className="h-10 w-10"
                        variant="outline"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft />
                    </Button>
                    <div className="flex-1">
                        <p className="text-3xl font-bold">
                            {query.data?.title}
                        </p>
                        <p className="text-fore">{query.data?.author}</p>
                    </div>
                </div>
                <div>
                    <Button variant="outline">
                        <Edit />
                        <span className="hidden md:block">
                            {t('library.editbook')}
                        </span>
                    </Button>
                </div>
            </div>
            <div className="flex p-4 gap-4 w-full flex-wrap md:flex-nowrap">
                <div className="flex-4/4  md:flex-1/6 space-y-4">
                    <Card className="bg-transparent">
                        <CardContent>
                            <BookCover
                                roundedType="rounded-lg"
                                coverUrl={query.data?.externalCoverUrl}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                            <div className="w-full">
                                <Badge variant="outline">Not readed</Badge>
                            </div>
                            <div className="flex w-full gap-4">
                                <Button className="flex-1" variant="outline">
                                    Start Reading
                                </Button>
                                <Button className="flex-1" variant="outline">
                                    Mark as read
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex-4/4 md:flex-5/6 space-y-4">
                    <Card className="bg-transparent ">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {t('library.description')}
                            </CardTitle>
                            <CardContent className="p-0 mt-3 ">
                                <div
                                    className="text-foreground/70"
                                    dangerouslySetInnerHTML={{
                                        __html: query.data?.description ?? '',
                                    }}
                                ></div>
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="bg-transparent p-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-xl">
                                Book Information
                            </CardTitle>
                        </CardHeader>
                        {/** TODO: Move to a separate file**/}
                        <CardContent className="p-0 mt-0 grid md:grid-cols-2 md:grid-rows-2 gap-4">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span className="font-bold">Author:</span>
                                <span className="font-normal opacity-85">
                                    Brandon Sanderson
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Hash size={16} />
                                <span className="font-bold">ISBN:</span>
                                <span className="font-normal opacity-85"></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span className="font-bold">Published:</span>
                                <span className="font-normal opacity-85">
                                    10/12/2024
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <BookOpen size={16} />
                                <span className="font-bold">Pages:</span>
                                <span className="font-normal opacity-85"></span>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t flex flex-col items-start gap-2 p-0">
                            <p className="text-xl font-bold">Genre</p>
                            <div className="flex gap-2 flex-wrap w-full">
                                {query.data?.genre
                                    ?.split(', ')
                                    .map((element, index) => (
                                        <Badge variant="outline" key={index}>
                                            {element}
                                        </Badge>
                                    ))}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
