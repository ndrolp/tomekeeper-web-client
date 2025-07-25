import { useTranslation } from 'react-i18next'
import { DashboardCard } from '../components/DashboardCard'
import { Book, BookOpen, Library, User } from 'lucide-react'

export const Dashboard = () => {
    const { t } = useTranslation()
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">{t('dashboard_dashboard')}</h1>
            <p className="mb-4">{t('dashboard_welback')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard
                    title={t('dashboard_totalbooks')}
                    icon={<Book size={20} />}
                    value={1}
                />
                <DashboardCard
                    title={t('dashboard_uniquetitles')}
                    icon={<BookOpen size={20} />}
                    value={1}
                />
                <DashboardCard
                    title={t('common_series')}
                    icon={<Library size={20} />}
                    value={0}
                />
                <DashboardCard
                    title={t('common_author')}
                    icon={<User size={20} />}
                    value={1}
                />
            </div>
        </div>
    )
}

export default Dashboard
