import {
  Library,
  BookCopy,
  Quote,
  LibraryBig,
  type LucideProps,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
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
    icon: Library,
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
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tomekeeper</SidebarGroupLabel>
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
