"use client"
 
import * as React from "react"
import { SettingsBox } from "./SettingsBox"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
 
 
export function UsernameDropdown() {

  const [showSettingsBox, setShowSettingsBox] = React.useState(false);

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex">
        <Button variant="outline">USERNAME</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-auto">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem onSelect={() => setShowSettingsBox(true)}>
          Settings

        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>

    {showSettingsBox && <SettingsBox onClose={() => setShowSettingsBox(false)} />}
    </>
  )
}