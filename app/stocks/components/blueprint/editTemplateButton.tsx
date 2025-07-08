import { useState } from "react"
import { Button } from "@/components/ui/button";

export const EditTemplateButton = ({edit ,setEdit}: {edit: boolean; setEdit: (edit: boolean) => void}) => {

    const handleEditButton = () => {
        setEdit(!edit);
    }

    return (
        <Button onClick={() => handleEditButton()} className="bg-amber-400">Edit</Button>
    )

}