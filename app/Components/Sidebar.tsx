"use client";
import { useState } from "react";
import { Calendar, Home, Inbox, Search, Settings, Factory, Landmark } from "lucide-react";
import { SettingsBox } from "./SettingsBox";

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

// Menu items.
const items = [
  { title: "Home", url: "http://localhost:3000/Dashboard", icon: Home },
  { title: "Search", url: "#", icon: Search },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Sector", url: "#", icon: Factory },
  { title: "Portfolio", url: "#", icon: Landmark },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "NVIDIA STOCK TMP", url: "http://localhost:3000/stocks", icon: Calendar },
];

export function AppSidebar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Welcome "user"</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
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
