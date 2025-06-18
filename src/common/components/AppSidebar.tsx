import {
  Library,
  BookCopy,
  Quote,
  LibraryBig,
  type LucideProps,
  Home,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { DataSource } from "../data/Datasource";
import { Badge } from "@/components/ui/badge";

const items: {
  title: string;
  url: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  countPos?: "books";
}[] = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Books",
    url: "/books",
    icon: BookCopy,
    countPos: "books",
  },
  {
    title: "Series",
    url: "/books",
    icon: LibraryBig,
  },
  {
    title: "Quotes",
    url: "/books",
    icon: Quote,
  },
];

export function AppSidebar() {
  const navigate = useNavigate();

  const countsQuery = useQuery({
    queryKey: ["extras/counts"],
    queryFn: DataSource.Extras.getCounts,
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Library className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Tomekeeper</span>
                  <span className="text-xs text-muted-foreground">
                    Personal Library
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="py-3">
                    <a
                      href={item.url}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.url);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                      {item.countPos && countsQuery.data ? (
                        <Badge
                          variant="outline"
                          className="ml-auto text-xs opacity-60"
                        >
                          {countsQuery.data[item.countPos]}
                        </Badge>
                      ) : (
                        ""
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
