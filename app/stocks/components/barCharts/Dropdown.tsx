/**
 * Hente ut API'ene revenue og expenses, når man klikker på revenue eller expenses så skal
 * barchart reflektere det man har klikket på.
 */



import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from "react"

interface BarChartDropDownProps {
    setState: (value: string) => void;
  }

export const BarChartDropDown: React.FC<BarChartDropDownProps> = ({ setState }) => {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-6 px-3 text-sm bg-shadow-lg" variant="ghost"> - </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Select time interval
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setState("income")}>
            Income
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setState("expenses")}>
            Expenses
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Net income
          </DropdownMenuItem>
          <DropdownMenuItem>
            Cash flow
          </DropdownMenuItem>
          <DropdownMenuItem>
            Ebidta
          </DropdownMenuItem>
          <DropdownMenuItem>
            Gross profit
          </DropdownMenuItem>
          <DropdownMenuItem>
            Gross profit margin
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
