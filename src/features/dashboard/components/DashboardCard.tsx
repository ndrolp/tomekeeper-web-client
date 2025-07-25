import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface DashboardProps {
    title: string
    icon: React.JSX.Element
    value: string | number
}

export const DashboardCard = ({ title, icon, value }: DashboardProps) => {
    return (
        <Card className="bg-background p-5 px-8">
            <CardHeader className="p-0">
                <div className="flex w-full items-center content-between justify-between">
                    <p className="text-md m-0 text-lg">{title}</p>
                    {icon}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <p className="text-4xl font-bold p-0 m-0">{value}</p>
            </CardContent>
        </Card>
    )
}

export default DashboardCard
