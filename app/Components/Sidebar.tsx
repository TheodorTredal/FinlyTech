"use client";
import { useEffect, useState } from "react";
import { 
  Calendar, 
  Home, 
  Inbox, 
  Search, 
  Settings,
  Layers, 
  ChartNoAxesCombined,
  SlidersHorizontal,
 } from "lucide-react";
import { SettingsBox } from "./SettingsBox";
import Link from "next/link";


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

import { getCurrentUser } from "../portfolio/components/API/userMetaAPI";


// Menu items.
const items = [
  { title: "Home", url: "http://localhost:3000/Dashboard", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Screener", url: "http://localhost:3000/screener", icon: SlidersHorizontal },
  { title: "Portfolio", url: "http://localhost:3000/portfolio", icon: Layers },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Stocks", url: "http://localhost:3000/stocks", icon: ChartNoAxesCombined },
];

export function AppSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userName, setUsername] = useState<string>("");


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUsername(user.username);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);


  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Welcome {userName || "..."}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {/* Settings-knappen */}
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setIsSettingsOpen(true)}>
                    <Settings />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* SettingsBox vises hvis isSettingsOpen er true */}
      {isSettingsOpen && <SettingsBox onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
}
