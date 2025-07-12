import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
} from '@/components/ui/select'
import { Select, SelectValue } from '@radix-ui/react-select'
import { Library, Save } from 'lucide-react'

export const ConfigPage = () => {
    return (
        <div className="px-4">
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
                    <Button variant="secondary" className="ml-auto">
                        Save Library Preferences
                        <Save />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
