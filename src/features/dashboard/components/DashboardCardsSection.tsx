import { useTranslation } from 'react-i18next'
import { DashboardCard } from '../components/DashboardCard'
import { Book, BookOpen, Library, User } from 'lucide-react'

export const DashboardCardsSection = () => {
    const { t } = useTranslation()
    return (
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
    )
}
