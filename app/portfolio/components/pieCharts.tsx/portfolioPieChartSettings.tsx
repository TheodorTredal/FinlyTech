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

export const PieChartSettings = () => {
    const [value, setValue] = useState<string>("sektor");


    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Settings className="w-5 h-5"/>
                </Button>
            </SheetTrigger>


            <SheetContent className="bg-gray900 border-gray-700">
                <SheetHeader>
                    <SheetTitle className="text-white">
                        Pie Chart Instillinger
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                    <RadioGroup
                        value={value}
                        onValueChange={setValue}
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

                </div>

            </SheetContent>

        </Sheet>
    )
}