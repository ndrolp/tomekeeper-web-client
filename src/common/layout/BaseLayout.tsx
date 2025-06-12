import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Outlet } from "react-router";
import { ThemeToggle } from "../components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export const BaseLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full  relative flex flex-col ">
        <div className="border-b flex p-3 items-center justify-between w-full top-0 sticky  z-30 bg-background/90 backdrop-blur-md">
          <div className="gap-2 flex items-center">
            <SidebarTrigger />
            <h1>Tomekeeper</h1>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                window.location.reload();
              }}
              variant="outline"
            >
              <RefreshCw />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div className="p-4 px-0">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
