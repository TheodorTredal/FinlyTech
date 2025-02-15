"use client"

import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"


import { UsernameDropdown } from "./UserDropdown"




export function NavigationBar() {
  return (
    <NavigationMenu className="relative flex ml-auto border border-gray-400 rounded-lg p-2 max-w-full h-[45px]">
      <NavigationMenuList className="flex w-full">
        {/* Skyver elementet helt til høyre */}
        <NavigationMenuItem className="fixed right-1 top-1">
          <UsernameDropdown />
        </NavigationMenuItem>
        
      </NavigationMenuList>
    </NavigationMenu>
);
}