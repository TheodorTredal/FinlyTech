import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"

interface PieChartSettingsProps {
    value: string;
    onChange: (value: string) => void;
    showPercent: boolean;
    setShowPercent: (v: boolean) => void;
}


export const PieChartSettings = ({
  value,
  onChange,
  showPercent,
  setShowPercent,
}: PieChartSettingsProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </SheetTrigger>

      <SheetContent className="bg-gray-900 border-gray-700">
        <SheetHeader>
          <SheetTitle className="text-white">
            Pie Chart Innstillinger
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <RadioGroup
            value={value}
            onValueChange={onChange}
            className="space-y-3"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="aksjer" id="aksjer" />
              <Label htmlFor="aksjer">Vis aksjer</Label>
            </div>

            <div className="flex items-center space-x-3">
              <RadioGroupItem value="sektor" id="sektor" />
              <Label htmlFor="sektor">Vis sektor</Label>
            </div>

            <div className="flex items-center space-x-3">
              <RadioGroupItem value="industri" id="industri" />
              <Label htmlFor="industri">Vis industri</Label>
            </div>
          </RadioGroup>

        <div className="flex items-center space-x-3 pt-4">
            <Checkbox
                id="showPercent"
                checked={showPercent}
                onCheckedChange={(checked: boolean) => setShowPercent(Boolean(checked))}
                />

            <Label htmlFor="showPercent">Vis prosent</Label>

        </div>
                </div>

      </SheetContent>
    </Sheet>
  )
}
