import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '../components/AppSidebar'
import { Outlet, useNavigate } from 'react-router'
import { ThemeToggle } from '../components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import i18n from '@/translation/i18n'
import { useCallback, useState } from 'react'

export const BaseLayout = () => {
    const [language, setLanguage] = useState(i18n.language)
    const navigate = useNavigate()

    const changeLanguage = useCallback(() => {
        i18n.changeLanguage(language === 'en' ? 'es' : 'en')
        setLanguage(language === 'en' ? 'es' : 'en')
    }, [language])

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full  relative flex flex-col ">
                <div className="border-b flex p-3 items-center justify-between w-full top-0 sticky  z-30 bg-background/90 backdrop-blur-md">
                    <div className="gap-2 flex items-center">
                        <SidebarTrigger />
                        <Button onClick={()=> navigate("/")} variant="ghost" className='text-xl font-bold'>Tomekeeper</Button>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={changeLanguage} variant="outline">
                            {i18n.language === 'en' ? 'en' : 'es'}
                        </Button>
                        <Button
                            onClick={() => {
                                window.location.reload()
                            }}
                            variant="outline"
                        >
                            <RefreshCw />
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
                <div className="p-4 px-0 h-full">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    )
}
