import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import { Outlet } from "react-router";

export const BaseLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main style={{ width: "100%" }}>
        <div className="border-b flex p-3 gap-2 items-center">
          <SidebarTrigger />
          <h1>Tomekeeper</h1>
        </div>
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
