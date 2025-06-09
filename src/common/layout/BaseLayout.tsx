import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Outlet } from "react-router";
import { ThemeToggle } from "../components/ThemeToggle";

export const BaseLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <div className="border-b flex p-3 items-center justify-between w-full">
          <div className="gap-2 flex">
            <SidebarTrigger />
            <h1>Tomekeeper</h1>
          </div>
          <ThemeToggle />
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
