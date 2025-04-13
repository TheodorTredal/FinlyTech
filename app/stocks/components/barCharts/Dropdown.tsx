import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";

interface BarChartDropDownProps {
  setState: (value: string[]) => void;
}

export const BarChartDropDown: React.FC<BarChartDropDownProps> = ({ setState }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Kall setState hver gang selected endrer seg
  useEffect(() => {
    setState(selected);
  }, [selected]);

  const menuItems = [
    { label: "Income ", value: "income" },
    { label: "Net income ", value: "net_income" },
    { label: "Expenses ", value: "expenses" },
    { label: "Ebitda ", value: "ebitda" },
    { label: "Cash flow", value: "cash_flow" },
    { label: "Gross profit", value: "gross_profit" },
    { label: "Gross profit margin", value: "gross_profit_margin" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-6 px-3 text-sm bg-shadow-lg" variant="ghost">
          -
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>Velg grafer</DropdownMenuItem>
          <DropdownMenuSeparator />
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onSelect={(event) => {
                event.preventDefault(); // Hindrer at menyen lukkes
                handleSelect(item.value);
              }}
              className="flex items-center gap-2"
            >
              <Checkbox checked={selected.includes(item.value)} />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
