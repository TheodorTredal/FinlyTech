import { Button } from "@/components/ui/button"


interface SidebarAddComponentButtonProps {
    setIsOpen: (open: boolean) => void;
    isOpen: boolean;
}

export const SidebarAddComponentButton = ({setIsOpen, isOpen}: SidebarAddComponentButtonProps) => {
    return (
        <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              Add +
            </Button>
        </div>
    )
}