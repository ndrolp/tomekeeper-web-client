import { useTranslation } from 'react-i18next'
import { DashboardCardsSection } from '../components/DashboardCardsSection'

export const Dashboard = () => {
    const { t } = useTranslation()
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">{t('dashboard_dashboard')}</h1>
            <p className="mb-4">{t('dashboard_welback')}</p>
            <DashboardCardsSection />
        </div>
    )
}

export default Dashboard
