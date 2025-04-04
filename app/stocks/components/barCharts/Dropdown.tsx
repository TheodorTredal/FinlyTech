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

export function BarChartDropDown() {
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
          <DropdownMenuItem>
            Income
          </DropdownMenuItem>
          <DropdownMenuItem>
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
