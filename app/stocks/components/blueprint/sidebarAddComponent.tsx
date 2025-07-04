import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
  import { Button } from "@/components/ui/button";
  
  export const BluePrintSidebar = () => {
    return (
      <Sheet>
        <SheetTrigger>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          >
            Add +
          </Button>
        </SheetTrigger>
  
        <SheetContent className="bg-gray-900 border-gray-700 text-white">
          <SheetHeader>
            <SheetTitle>Legg til komponent</SheetTitle>
          </SheetHeader>
  
          <div className="mt-6 space-y-4">
            <div
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 cursor-move hover:bg-gray-700 transition"
              draggable
            >
              📈 Aksjegraf
            </div>
  
            <div
              className="rounded-lg border border-gray-700 bg-gray-800 p-4 cursor-move hover:bg-gray-700 transition"
              draggable
            >
              📊 Nøkkeltall
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  