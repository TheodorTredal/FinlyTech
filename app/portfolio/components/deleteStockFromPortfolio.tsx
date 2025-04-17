import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { portfolioFolderInterface } from "../interfaces/stockPortfolioInterface";



export const DeleteStockAlert = ({ setPortfolio, folderName, ticker }: {setPortfolio: (prev: any) => void; folderName: string; ticker: string;}) => {
    
  
  const handleDelete = () => {
    setPortfolio((prev: portfolioFolderInterface[]) =>
      prev.map((folder: portfolioFolderInterface) =>
        folder.name === folderName
          ? {
              ...folder,
              stocks: folder.stocks.filter((stock) => stock.ticker !== ticker),
            }
          : folder
      )
    );
  };
  
  
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
              This action cannot be undone. This will permanently delete your stock from Portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-emerald-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="text-red-600 bg-black border-2 border-gray-500 hover:bg-red-900">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }