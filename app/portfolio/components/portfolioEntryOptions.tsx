"use client";
import { Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface PortfolioEntryOptionsInterface {
    setShowOptions: (show: boolean) => void;
}


import { Button } from "@/components/ui/button"

const DeleteAlert = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Trash2 className="text-gray-400"></Trash2>


        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your Portfolio.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-emerald-600">Cancel</AlertDialogCancel>
          <AlertDialogAction className="text-red-600 bg-black border-2 border-gray-500 hover:bg-red-900">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export const PortfolioEntryOptions = ({ setShowOptions }: PortfolioEntryOptionsInterface) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-[#1e1e1e] w-1/2 h-1/2 rounded-lg shadow-lg p-4 text-black relative">
          <button
            className="absolute top-2 right-2 text-gray-400"
            onClick={() => setShowOptions(false)}
          >
            Lukk
          </button>
          {/* <Trash2 className="text-gray-400"></Trash2> */}
          <DeleteAlert></DeleteAlert>
            <Textarea className="text-white" placeholder="Thougts about the stock, why you bought it, etc.."></Textarea>
        </div>
      </div>
    )
}