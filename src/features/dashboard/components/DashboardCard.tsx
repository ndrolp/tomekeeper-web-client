import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useNavigate } from 'react-router'

interface DashboardProps {
    title: string
    icon: React.JSX.Element
    value: string | number
    to?: string | undefined
}

export const DashboardCard = ({ title, icon, value, to }: DashboardProps) => {
    const navigate = useNavigate()
    return (
        <Card
            onClick={() => {
                if (to) navigate(to)
            }}
            className={`bg-background p-1 px-4 ${to ? "cursor-pointer hover:bg-accent" : ""}`}>
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
